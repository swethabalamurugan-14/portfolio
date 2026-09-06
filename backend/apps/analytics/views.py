from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from .models import AnalyticsEvent
import json

class AnalyticsThrottle(AnonRateThrottle):
    rate = '60/min'

class AnalyticsEventCreateView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [AnalyticsThrottle]

    ALLOWED_EVENTS = {
        'page_view', 'section_view', 'project_view', 
        'case_study_open', 'github_click', 'live_demo_click', 
        'resume_download', 'technology_filter', 'contact_open', 
        'contact_submit', 'external_link_click'
    }

    def post(self, request, *args, **kwargs):
        try:
            event_name = request.data.get('event_name')
            if not event_name or event_name not in self.ALLOWED_EVENTS:
                return Response({'success': True}, status=status.HTTP_200_OK) # Fail silently

            project = request.data.get('project')
            path = request.data.get('path')
            metadata = request.data.get('metadata', {})

            # Protect against oversized metadata
            if len(json.dumps(metadata)) > 1024:
                metadata = {} # Clear it if it's too large

            AnalyticsEvent.objects.create(
                event_name=event_name,
                project=project[:100] if project else None,
                path=path[:255] if path else None,
                metadata=metadata
            )
        except Exception:
            # Never expose internal errors
            pass

        return Response({'success': True}, status=status.HTTP_200_OK)
