from django.contrib import admin
from django.urls import path
from django.template.response import TemplateResponse
from django.db.models import Count
from .models import AnalyticsEvent

@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'project', 'path', 'created_at')
    list_filter = ('event_name', 'project', 'created_at')
    search_fields = ('event_name', 'project', 'path')
    readonly_fields = ('event_name', 'project', 'path', 'metadata', 'created_at')
    ordering = ('-created_at',)
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('insights/', self.admin_site.admin_view(self.insights_view), name='analytics-insights'),
        ]
        return custom_urls + urls

    def insights_view(self, request):
        events = AnalyticsEvent.objects.all()
        
        # Aggregate statistics
        total_visitors = events.filter(event_name='page_view').count()
        project_views = events.filter(event_name='project_view').count()
        github_clicks = events.filter(event_name='github_click').count()
        resume_downloads = events.filter(event_name='resume_download').count()
        contact_submissions = events.filter(event_name='contact_submit').count()
        
        project_performance = events.filter(event_name='project_view').values('project').annotate(views=Count('id')).order_by('-views')[:10]
        
        context = dict(
            self.admin_site.each_context(request),
            total_visitors=total_visitors,
            project_views=project_views,
            github_clicks=github_clicks,
            resume_downloads=resume_downloads,
            contact_submissions=contact_submissions,
            project_performance=project_performance,
            title="Portfolio Insights"
        )
        return TemplateResponse(request, "admin/analytics_dashboard.html", context)
