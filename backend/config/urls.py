from django.contrib import admin
from django.urls import path
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection

from apps.portfolio.views import ProjectListView, ProjectDetailView, TechnologyListView
from apps.contact.views import ContactCreateView
from apps.analytics.views import AnalyticsEventCreateView

class HealthCheckView(APIView):
    def get(self, request):
        try:
            connection.ensure_connection()
            db_status = "connected"
        except Exception as e:
            db_status = f"disconnected: {str(e)}"

        return Response({
            "status": "healthy",
            "database": db_status,
        }, status=status.HTTP_200_OK)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/health/', HealthCheckView.as_view(), name='health-check'),
    path('api/projects/', ProjectListView.as_view(), name='project-list'),
    path('api/projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('api/technologies/', TechnologyListView.as_view(), name='technology-list'),
    path('api/contact/', ContactCreateView.as_view(), name='contact-create'),
    path('api/events/', AnalyticsEventCreateView.as_view(), name='event-create'),
]
