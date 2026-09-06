from django.core.management.base import BaseCommand
from apps.portfolio.models import Project, Technology

class Command(BaseCommand):
    help = 'Seeds database with initial portfolio projects and technology stack'

    def handle(self, *args, **options):
        self.stdout.write('Seeding technologies...')
        techs_data = [
            ("Python", "Languages", "Used for application logic, backend development, and data-driven workflows.", "2 projects"),
            ("JavaScript", "Languages", "Used for interactive frontend behavior and web interfaces.", "2 projects"),
            ("React.js", "Frontend", "Used for component-based interfaces and responsive frontend experiences.", "2 projects"),
            ("HTML5", "Frontend", "Used to structure responsive web pages and interfaces.", "intern + projects"),
            ("CSS", "Frontend", "Used for responsive layouts, component styling, and polished interfaces.", "intern + projects"),
            ("Django", "Backend", "Used for backend business logic, authentication, APIs, and role-based workflows.", "1 project"),
            ("SQL", "Database", "Used for relational data modeling and database operations.", "2 projects"),
            ("MySQL", "Database", "Used for relational data in the PG and student management projects.", "2 projects"),
            ("MongoDB", "Database", "Used as the document database for the PixelMart marketplace.", "1 project"),
            ("Git", "Workflow", "Used for version control and managing project development.", "workflow"),
            ("GitHub", "Workflow", "Used to host repositories and share project work.", "workflow"),
            ("VS Code", "Workflow", "Used as the development environment across frontend and backend work.", "workflow"),
        ]

        for name, category, desc, usage in techs_data:
            Technology.objects.update_or_create(
                name=name,
                defaults={
                    'category': category,
                    'description': desc,
                    'usage_meta': usage,
                }
            )

        self.stdout.write('Seeding projects...')

        Project.objects.update_or_create(
            slug="pg-management-system",
            defaults={
                "title": "PG Management System",
                "status": "Self-initiated project",
                "is_featured": True,
                "project_path": "~/projects/pg-management-system",
                "tagline": "A full-stack PG Management System to manage rooms, tenants, and rent payments, with role-based dashboards for administrators and tenants.",
                "tech_stack": ["Python", "Django", "React.js", "MySQL", "SQL"],
                "github_url": "https://github.com/swethabalamurugan-14/pg-management-system",
                "case_study_problem": "PG and hostel owners were tracking rooms, tenants, and rent manually — no clear view of who owed what or which rooms were free at any given time.",
                "case_study_role": "Solo, self-initiated — designed and built the full stack end to end, from the database schema to the deployed UI.",
                "case_study_architecture": "Django backend handling business logic and auth, MySQL for relational tenant/room/payment data, and a React frontend consuming the API — with role-based dashboards splitting admin and tenant views so each side only sees what's relevant to them.",
                "case_study_outcome": "Admins get a single view of rooms, tenants, and rent status instead of a spreadsheet. Tenants get their own dashboard to check dues — turning a manual, error-prone process into a real, role-aware application.",
                "case_study_git_log": [
                    {"hash": "a1c9e2f", "message": "init: Django project + MySQL schema for rooms/tenants"},
                    {"hash": "3f7b1de", "message": "feat: role-based auth for admin/tenant dashboards"},
                    {"hash": "9d4a082", "message": "feat: rent payment tracking + status views"},
                    {"hash": "e28f5c1", "message": "polish: responsive React UI pass"}
                ]
            }
        )

        Project.objects.update_or_create(
            slug="pixelmart",
            defaults={
                "title": "PixelMart — Digital Marketplace",
                "status": "Completed",
                "is_featured": False,
                "badge": "Final year project",
                "project_path": "~/projects/pixelmart",
                "tagline": "A digital marketplace for creators to upload and sell digital assets, with authentication, search, and filtering.",
                "tech_stack": ["React.js", "JavaScript", "MongoDB"],
                "github_url": "https://github.com/swethabalamurugan-14/pixelmart",
            }
        )

        Project.objects.update_or_create(
            slug="student-management",
            defaults={
                "title": "Student Management System",
                "status": "Completed",
                "is_featured": False,
                "badge": "Mini project",
                "project_path": "~/projects/student-management",
                "tagline": "A desktop application to manage student records, with CRUD operations using Python and MySQL and a Tkinter interface.",
                "tech_stack": ["Python", "Tkinter", "MySQL", "SQL"],
                "github_url": "https://github.com/swethabalamurugan-14/student-management",
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded portfolio database!'))
