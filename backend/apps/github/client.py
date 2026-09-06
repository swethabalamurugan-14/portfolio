import requests
import re
from urllib.parse import urlparse
from .exceptions import GitHubAPIException, GitHubRateLimitException, GitHubRepositoryNotFound, GitHubInvalidURLError

class GitHubClient:
    BASE_URL = "https://api.github.com"
    
    def __init__(self, timeout=10):
        self.timeout = timeout
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "SuvaiPortfolio/1.0"
        }
        
    def parse_repo_url(self, url):
        """Parse github owner and repo from a URL."""
        if not url:
            raise GitHubInvalidURLError("No URL provided")
        
        parsed = urlparse(url)
        if parsed.netloc not in ['github.com', 'www.github.com']:
            raise GitHubInvalidURLError("Not a valid GitHub URL")
            
        parts = [p for p in parsed.path.split('/') if p]
        if len(parts) < 2:
            raise GitHubInvalidURLError("Cannot extract owner and repository from URL")
            
        owner, repo = parts[0], parts[1]
        # Clean up `.git` if present
        if repo.endswith('.git'):
            repo = repo[:-4]
            
        # Basic validation
        if not re.match(r'^[a-zA-Z0-9_.-]+$', owner) or not re.match(r'^[a-zA-Z0-9_.-]+$', repo):
            raise GitHubInvalidURLError("Invalid characters in owner or repository name")
            
        return owner, repo

    def _make_request(self, method, endpoint, **kwargs):
        url = f"{self.BASE_URL}{endpoint}"
        try:
            response = requests.request(method, url, headers=self.headers, timeout=self.timeout, **kwargs)
            
            if response.status_code == 403 and "rate limit" in response.text.lower():
                raise GitHubRateLimitException("GitHub API rate limit exceeded")
            elif response.status_code == 404:
                raise GitHubRepositoryNotFound(f"Repository not found at {endpoint}")
            elif not response.ok:
                raise GitHubAPIException(f"GitHub API Error: {response.status_code} {response.reason}")
                
            return response.json()
        except requests.RequestException as e:
            raise GitHubAPIException(f"Network error while connecting to GitHub: {str(e)}")

    def get_repository(self, owner, repo):
        return self._make_request('GET', f"/repos/{owner}/{repo}")

    def get_repository_readme(self, owner, repo):
        return self._make_request('GET', f"/repos/{owner}/{repo}/readme")
        
    def get_repository_contents(self, owner, repo, path=""):
        return self._make_request('GET', f"/repos/{owner}/{repo}/contents/{path}")
