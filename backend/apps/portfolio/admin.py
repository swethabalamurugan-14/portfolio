from django.contrib import admin
from .models import Project, Technology

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_featured', 'status', 'github_sync_enabled', 'preview_source', 'created_at')
    list_filter = ('is_featured', 'status', 'github_sync_enabled', 'preview_source')
    search_fields = ('title', 'tagline', 'tech_stack', 'github_owner', 'github_repo')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('github_owner', 'github_repo', 'github_last_synced', 'github_data')
    actions = ['sync_github_data']

    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'status', 'is_featured', 'project_path', 'tagline', 'tech_stack', 'badge')
        }),
        ('URLs & GitHub', {
            'fields': ('demo_url', 'github_url', 'github_sync_enabled', 'github_owner', 'github_repo', 'github_last_synced', 'github_data')
        }),
        ('Preview Options', {
            'fields': ('preview_source', 'preview_image')
        }),
        ('Case Study', {
            'fields': ('case_study_problem', 'case_study_role', 'case_study_architecture', 'case_study_outcome', 'case_study_git_log')
        }),
    )

    def sync_github_data(self, request, queryset):
        from apps.github.services import GitHubSyncService
        
        service = GitHubSyncService()
        success_count = 0
        error_count = 0
        
        for project in queryset:
            success, msg = service.sync_project(project)
            if success:
                success_count += 1
            else:
                error_count += 1
                self.message_user(request, f"Error syncing '{project.title}': {msg}", level='error')
                
        if success_count > 0:
            self.message_user(request, f"Successfully synced {success_count} project(s) with GitHub.")
            
    sync_github_data.short_description = "Sync GitHub Data"


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'usage_meta')
    list_filter = ('category',)
    search_fields = ('name', 'description')
