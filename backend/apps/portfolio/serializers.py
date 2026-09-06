from rest_framework import serializers
from .models import Project, Technology

class ProjectSerializer(serializers.ModelSerializer):
    case_study = serializers.SerializerMethodField()
    github = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'slug',
            'title',
            'status',
            'is_featured',
            'project_path',
            'tagline',
            'tech_stack',
            'github_url',
            'demo_url',
            'badge',
            'case_study',
            'preview_image',
            'preview_source',
            'github',
        ]

    def get_github(self, obj):
        if not obj.github_sync_enabled:
            return None
        data = obj.github_data or {}
        return {
            'language': data.get('language'),
            'stars': data.get('stars', 0),
            'forks': data.get('forks', 0),
            'updated_at': data.get('updated_at'),
        }

    def get_case_study(self, obj):
        if not obj.case_study_problem:
            return None
        return {
            'title': obj.title,
            'problem': obj.case_study_problem,
            'role': obj.case_study_role,
            'architecture': obj.case_study_architecture,
            'outcome': obj.case_study_outcome,
            'gitLog': obj.case_study_git_log or [],
        }


class TechnologySerializer(serializers.ModelSerializer):
    mapped_projects = serializers.SerializerMethodField()

    class Meta:
        model = Technology
        fields = ['id', 'name', 'category', 'description', 'usage_meta', 'mapped_projects']

    def get_mapped_projects(self, obj):
        projects = Project.objects.filter(tech_stack__icontains=obj.name)
        return [p.slug for p in projects]
