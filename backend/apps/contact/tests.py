from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import ContactMessage

class ContactAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('contact-create')
        self.valid_payload = {
            'name': 'Test User',
            'email': 'test@example.com',
            'subject': 'Hello',
            'message': 'This is a test message.'
        }

    def test_create_contact_message(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.get().name, 'Test User')

    def test_duplicate_submission(self):
        self.client.post(self.url, self.valid_payload, format='json')
        # Submit the exact same message again
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_invalid_email(self):
        payload = self.valid_payload.copy()
        payload['email'] = 'invalid-email'
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_short_message(self):
        payload = self.valid_payload.copy()
        payload['message'] = 'Hi'
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
