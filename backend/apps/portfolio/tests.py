from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Project, Technology

class PortfolioAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = Project.objects.create(
            slug='test-project',
            title='Test Project',
            tagline='A test project',
            status='Completed'
        )
        self.technology = Technology.objects.create(
            name='Python',
            category='Languages',
            description='A programming language',
            usage_meta='1 project'
        )

    def test_get_projects_list(self):
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_project_detail(self):
        url = reverse('project-detail', kwargs={'slug': 'test-project'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Project')

    def test_get_technologies_list(self):
        url = reverse('technology-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
