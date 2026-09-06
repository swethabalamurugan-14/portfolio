import base64
import re
from django.utils import timezone
from .client import GitHubClient
from .exceptions import GitHubAPIException, GitHubRepositoryNotFound, GitHubInvalidURLError

class GitHubSyncService:
    def __init__(self):
        self.client = GitHubClient()

    def sync_project(self, project):
        """Synchronize a single project with its GitHub repository."""
        if not project.github_url:
            return False, "No GitHub URL provided."

        try:
            owner, repo = self.client.parse_repo_url(project.github_url)
            project.github_owner = owner
            project.github_repo = repo
            
            repo_data = self.client.get_repository(owner, repo)
            
            # Update cache
            project.github_data = {
                'stars': repo_data.get('stargazers_count', 0),
                'forks': repo_data.get('forks_count', 0),
                'language': repo_data.get('language'),
                'topics': repo_data.get('topics', []),
                'updated_at': repo_data.get('updated_at')
            }
            project.github_sync_enabled = True
            project.github_last_synced = timezone.now()

            # Resolve preview image
            self._resolve_preview_image(project, repo_data)
            
            project.save()
            return True, "Successfully synchronized."

        except GitHubInvalidURLError as e:
            return False, f"Invalid URL: {str(e)}"
        except GitHubRepositoryNotFound:
            return False, "Repository not found. It may be private or deleted."
        except GitHubAPIException as e:
            return False, f"GitHub API Error: {str(e)}"
        except Exception as e:
            return False, f"Unexpected error: {str(e)}"

    def _resolve_preview_image(self, project, repo_data):
        """
        Preview discovery priority:
        1. Manual
        2. docs/screenshots in repo
        3. README.md image
        4. GitHub social preview (if not default)
        5. Fallback
        """
        # 1. Manual override check (if preview_source is 'manual', keep it)
        if project.preview_source == 'manual' and project.preview_image:
            return

        owner, repo = project.github_owner, project.github_repo

        # 2. Check for docs/screenshots
        try:
            contents = self.client.get_repository_contents(owner, repo, "docs/screenshots")
            if isinstance(contents, list):
                for item in contents:
                    if item.get('name', '').lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                        project.preview_image = item.get('download_url')
                        project.preview_source = 'repository'
                        return
        except GitHubAPIException:
            pass  # Expected if directory doesn't exist

        # 3. Check README
        try:
            readme = self.client.get_repository_readme(owner, repo)
            content = base64.b64decode(readme.get('content', '')).decode('utf-8')
            
            # Find markdown images: ![alt](url)
            # Find first image that isn't a badge (no shield.io, badges, etc)
            images = re.findall(r'!\[.*?\]\((.*?)\)', content)
            for img_url in images:
                if not any(badge_domain in img_url.lower() for badge_domain in ['shields.io', 'badge', 'travis', 'circleci']):
                    # Handle relative URLs by prefixing raw.githubusercontent.com
                    if not img_url.startswith('http'):
                        default_branch = repo_data.get('default_branch', 'main')
                        img_url = img_url.lstrip('/')
                        img_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{default_branch}/{img_url}"
                    
                    project.preview_image = img_url
                    project.preview_source = 'readme'
                    return
        except GitHubAPIException:
            pass # Expected if no README

        # 4. Check GitHub social preview
        # If open_graph_image contains 'githubs-default-cards' or similar, it's the generic one
        # but the API doesn't expose open_graph_image easily via /repos/. 
        # Actually, GitHub API does not return social preview in /repos/{owner}/{repo} reliably
        # without special headers or scraping. So we skip to fallback unless we want to assume 
        # the standard github social card format.
        # Format: https://opengraph.githubassets.com/1/{owner}/{repo}
        # But this is often generic if not set. We'll use it if fallback is the only option, but
        # 'fallback' CSS art is preferred over a generic opengraph image per instructions.
        
        # 5. Fallback
        project.preview_image = None
        project.preview_source = 'fallback'
