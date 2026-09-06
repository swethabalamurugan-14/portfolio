from django.db import models

class AnalyticsEvent(models.Model):
    event_name = models.CharField(max_length=100)
    project = models.CharField(max_length=100, blank=True, null=True, help_text="Project slug if applicable")
    path = models.CharField(max_length=255, blank=True, null=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Event: {self.event_name} at {self.created_at.strftime('%Y-%m-%d %H:%M')}"
