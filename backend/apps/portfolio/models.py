from django.db import models

class Project(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    status = models.CharField(max_length=100, default='Completed')
    is_featured = models.BooleanField(default=False)
    project_path = models.CharField(max_length=200, help_text="Terminal style path e.g. ~/projects/pg-management-system")
    tagline = models.TextField()
    tech_stack = models.JSONField(default=list, help_text="List of technology names")
    github_url = models.URLField(blank=True, null=True)
    demo_url = models.URLField(blank=True, null=True)
    badge = models.CharField(max_length=100, blank=True, null=True)
    
    # GitHub Integration
    github_owner = models.CharField(max_length=100, blank=True, null=True)
    github_repo = models.CharField(max_length=100, blank=True, null=True)
    github_sync_enabled = models.BooleanField(default=False)
    github_last_synced = models.DateTimeField(blank=True, null=True)
    github_data = models.JSONField(default=dict, blank=True, help_text="Cached stats from GitHub")
    
    # Preview Resolution
    PREVIEW_SOURCE_CHOICES = [
        ('manual', 'Manual'),
        ('repository', 'Repository Screenshot'),
        ('readme', 'README Image'),
        ('github', 'GitHub Social Preview'),
        ('fallback', 'Design Fallback'),
    ]
    preview_image = models.URLField(max_length=500, blank=True, null=True)
    preview_source = models.CharField(max_length=20, choices=PREVIEW_SOURCE_CHOICES, default='fallback')
    
    # Case study fields
    case_study_problem = models.TextField(blank=True, null=True)
    case_study_role = models.TextField(blank=True, null=True)
    case_study_architecture = models.TextField(blank=True, null=True)
    case_study_outcome = models.TextField(blank=True, null=True)
    case_study_git_log = models.JSONField(default=list, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return self.title


class Technology(models.Model):
    CATEGORY_CHOICES = [
        ('Languages', 'Languages'),
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Database', 'Database'),
        ('Workflow', 'Workflow'),
    ]

    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    usage_meta = models.CharField(max_length=100, help_text="e.g. 2 projects, intern + projects")

    class Meta:
        verbose_name_plural = "Technologies"
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"
