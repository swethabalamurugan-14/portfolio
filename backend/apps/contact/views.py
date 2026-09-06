import logging
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from django.utils import timezone
from datetime import timedelta
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)

class ContactFormThrottle(AnonRateThrottle):
    rate = '5/hour'

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    throttle_classes = [ContactFormThrottle]

    def perform_create(self, serializer):
        ip_address = self.request.META.get('REMOTE_ADDR')
        user_agent = self.request.META.get('HTTP_USER_AGENT')
        serializer.save(ip_address=ip_address, user_agent=user_agent)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.warning(f"Contact form validation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Check for duplicate submission within the last 5 minutes
        ip_address = request.META.get('REMOTE_ADDR')
        recent_duplicate = ContactMessage.objects.filter(
            ip_address=ip_address,
            message=serializer.validated_data.get('message'),
            created_at__gte=timezone.now() - timedelta(minutes=5)
        ).exists()

        if recent_duplicate:
            logger.warning(f"Duplicate contact submission from IP: {ip_address}")
            return Response(
                {"message": "You recently submitted this exact message. Please wait before submitting again."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        try:
            self.perform_create(serializer)
            logger.info(f"New contact message received from {serializer.validated_data.get('email')}")
            return Response(
                {
                    "success": True,
                    "message": "Message received! Thank you for reaching out."
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            logger.error(f"Error saving contact message: {str(e)}", exc_info=True)
            return Response(
                {"message": "An internal error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
