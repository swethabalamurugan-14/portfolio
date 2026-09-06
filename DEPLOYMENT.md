# Production Deployment Guide

## 1. Overview

This document provides a complete, step-by-step procedure to deploy the web application from a local environment to a production architecture. It covers the deployment of the Vite/React frontend, the Django REST Framework API, and the PostgreSQL database.

## 2. Application Architecture

The target production architecture is:

```text
                    GitHub
                      │
             ┌────────┴────────┐
             ▼                 ▼
          Vercel             Render
         Frontend          Django Backend
                               │
                               │ PostgreSQL
                               ▼
                           Supabase
                          PostgreSQL
```

- **Source Control:** GitHub
- **Frontend Hosting:** Vercel (owns the Vite/React frontend)
- **Backend Hosting:** Render (owns the Django REST API)
- **Database:** Supabase (owns the PostgreSQL database)

The user interacts with Vercel over HTTPS. The frontend makes HTTPS API requests to Render. Render connects to Supabase via standard PostgreSQL protocols.

## 3. Prerequisites

Before beginning, ensure you have:
- A **GitHub** account and the code pushed to a repository.
- A **Supabase** account (https://supabase.com/).
- A **Render** account (https://render.com/).
- A **Vercel** account (https://vercel.com/).
- Node.js (v18+) & Python (3.10+) for local verification.

## 4. Repository Structure

Based on the repository inspection, the application is split into two root directories:

- **Frontend (`frontend/`):** A React application built with Vite and Tailwind CSS. It uses `npm` (`package-lock.json`), builds via `npm run build` to a `dist` directory, and expects `VITE_API_URL` to define the API base.
- **Backend (`backend/`):** A Django 5.2 application (`config` project module). It uses Gunicorn, `dj-database-url` for database connections, and WhiteNoise for static files.

## 5. Production Readiness Audit

### Blockers
- **None.** The repository is well-structured for deployment. Secrets are not hardcoded, and `.env` files are correctly ignored by `.gitignore`.

### Required Changes
- **Supabase Database:** The default local SQLite database must be replaced with Supabase PostgreSQL using the `DATABASE_URL` environment variable.
- **SECRET_KEY:** The default fallback (`'django-insecure-fallback'`) must not be used in production. A secure key must be generated.
- **DEBUG=False:** Production environments must explicitly set `DEBUG=False` to trigger Django's security middleware (HTTPS redirects, secure cookies).


## 6. GitHub Preparation

Before deploying, ensure your code is clean and pushed.

1. Verify that no `.env` files are accidentally tracked:
   ```bash
   git status
   ```
2. Add your deployment changes (if you modified `settings.py` based on the recommendations):
   ```bash
   git add .
   git commit -m "Prepare production deployment"
   git push origin main
   ```
Ensure `requirements.txt` and `package-lock.json` are up-to-date and pushed.

## 7. Supabase PostgreSQL Setup

The application uses `dj_database_url` in Django, which natively supports PostgreSQL connection strings. You do not need the Supabase SDK/API, just the direct PostgreSQL connection.

1. Log into Supabase and click **New Project**.
2. Name the project (e.g., `suvai-portfolio-db`), generate a secure Database Password, and select a region.
3. Click **Create new project**.
4. Once provisioned, navigate to **Project Settings -> Database**.
5. Locate your **Connection String** (URI format). 
6. Since Render runs a persistent container, you can use the direct connection (Port 5432) or the transaction pooler (Port 6543). The format looks like this:
   ```env
   postgres://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
7. Keep this `DATABASE_URL` ready for the Render deployment.

## 8. Django Production Configuration

The `backend/config/settings.py` file is already optimized for production.
- **Database:** It uses `dj_database_url.config(default=...)`, meaning it will automatically read `DATABASE_URL`.
- **Security:** When `DEBUG=False`, it automatically enables `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, and `SECURE_HSTS_SECONDS`.
- **WSGI:** The application will run via `gunicorn config.wsgi:application`.

## 9. Render Backend Deployment

1. Log into Render and click **New + -> Web Service**.
2. Connect your GitHub repository.
3. Select the repository and configure the service:
   - **Name:** `suvai-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - **Start Command:** `gunicorn config.wsgi:application`
4. Expand the **Environment Variables** section and configure them (see Section 10).
5. Click **Create Web Service**. 
6. Render will install dependencies, collect static files, run migrations against Supabase, and start Gunicorn.

## 10. Django Environment Variables

Configure these variables in your Render Web Service dashboard:

| Variable | Required | Service | Example | Purpose |
| -------- | -------- | ------- | ------- | ------- |
| `PYTHON_VERSION` | Yes | Render | `3.10.12` | Ensures the correct Python runtime. |
| `DATABASE_URL` | Yes | Render | `postgres://...supabase.com...` | Connects Django to Supabase. |
| `SECRET_KEY` | Yes | Render | `<generate-a-long-secure-random-string>` | Django cryptographic signing. |
| `DEBUG` | Yes | Render | `False` | Disables debug mode and enables security flags. |
| `ALLOWED_HOSTS` | Yes | Render | `suvai-api.onrender.com` | Domains allowed to reach the Django server. |
| `CORS_ALLOWED_ORIGINS` | Yes | Render | `https://suvai-portfolio.vercel.app` | Frontend domain allowed to make API requests. |
| `CSRF_TRUSTED_ORIGINS` | Yes* | Render | `https://suvai-portfolio.vercel.app` | Required for secure session auth (e.g., Django Admin). |


## 11. Vercel Frontend Deployment

The frontend requires no server runtime; it is built into static files and hosted on Vercel's edge network. The `frontend/vercel.json` file is already present to help with routing.

1. Log into Vercel and click **Add New -> Project**.
2. Import the GitHub repository.
3. Vercel automatically detects the framework. Configure the settings:
   - **Project Name:** `suvai-portfolio`
   - **Framework Preset:** `Vite`
   - **Root Directory:** Edit this to `frontend`.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Expand **Environment Variables** and configure the API URL (see Section 12).
5. Click **Deploy**.

## 12. Frontend Environment Variables

Configure this variable in Vercel before deploying:

| Variable | Required | Service | Example | Purpose |
| -------- | -------- | ------- | ------- | ------- |
| `VITE_API_URL` | Yes | Vercel | `https://suvai-api.onrender.com` | Defines the API base URL for Axios/fetch requests. |

*Note: Vite environment variables (`VITE_*`) are statically embedded at build time. If you change this variable later, you must redeploy the frontend in Vercel.*

## 13. Frontend ↔ Django API Configuration

In development, the frontend proxy defaults to `http://127.0.0.1:8000`. In production, the built React application utilizes `VITE_API_URL` to send HTTPS requests directly to Render.

**Flow:**
`User Browser` -> `Vercel (React App)` -> `VITE_API_URL (Render Django API)` -> `DATABASE_URL (Supabase PostgreSQL)`

To ensure this works, `CORS_ALLOWED_ORIGINS` on Render must exactly match the frontend URL provided by Vercel.

## 14. CORS and CSRF

Because the frontend (`vercel.app`) and backend (`onrender.com`) are on different domains:

- **CORS (Cross-Origin Resource Sharing):** Protects the API from being called by unauthorized websites. The `corsheaders` middleware in Django handles this. The `CORS_ALLOWED_ORIGINS` environment variable must contain the exact Vercel URL (e.g., `https://suvai-portfolio.vercel.app` — no trailing slash).
- **CSRF (Cross-Site Request Forgery):** Protects state-changing requests. Since the frontend is a detached SPA, it likely relies on tokens rather than sessions. However, if the Django Admin is used, CSRF comes into play. Ensure the `CSRF_TRUSTED_ORIGINS` environment variable is set to your exact Vercel URL.
- **ALLOWED_HOSTS:** Protects against HTTP Host header attacks. It must contain the Render domain.

**Do not set `CORS_ALLOW_ALL_ORIGINS = True` in production.**

## 15. Static Files

Django's static files (CSS/JS for the Django Admin and REST Framework browsable API) are managed via WhiteNoise.
- **Settings:** `STATIC_ROOT = BASE_DIR / 'staticfiles'` and `whitenoise.middleware.WhiteNoiseMiddleware` are correctly configured.
- **Deployment:** The command `python manage.py collectstatic --noinput` is executed during the Render build process. WhiteNoise intercepts requests to `/static/` and serves the files directly from the Gunicorn process. No Nginx setup is required.

## 16. Media / Uploaded Files

The repository does not configure `MEDIA_ROOT` or `MEDIA_URL`. This means the application does not currently process or store user-uploaded files (like profile pictures).
- **Render Ephemeral Storage:** Render's local filesystem resets on every deployment. If media uploads are added in the future, you **MUST** integrate an external storage provider (like AWS S3, Cloudinary, or Supabase Storage) via `django-storages`.

## 17. Database Migrations

Django migrations apply the Python database schema to Supabase.
- Migrations (`manage.py migrate`) are automatically executed during the Render build phase because they are included in the Build Command.
- If a migration fails, the Render deployment will fail, protecting your production environment from running incompatible code.

## 18. Custom Domain

To configure a custom domain (e.g., `suvai.com`):

1. **Frontend (suvai.com):**
   - Add the domain in Vercel (Project Settings -> Domains).
   - In your DNS provider, create an `A` record pointing to Vercel's IP, or a `CNAME` pointing to `cname.vercel-dns.com`.
2. **Backend (api.suvai.com):**
   - Add the domain in Render (Web Service Settings -> Custom Domains).
   - In your DNS provider, create a `CNAME` record for `api` pointing to your Render URL.
3. **Update Configurations:**
   - **Render:** Update `ALLOWED_HOSTS` to include `api.suvai.com`.
   - **Render:** Update `CORS_ALLOWED_ORIGINS` to include `https://suvai.com`.
   - **Vercel:** Update `VITE_API_URL` to `https://api.suvai.com` and redeploy.

## 19. Production Verification

### Frontend
- [ ] Homepage loads immediately.
- [ ] Internal navigation/routing works without 404s.
- [ ] CSS (Tailwind) and assets load correctly.

### Backend
- [ ] API base URL returns expected response (or 404 if no root view).
- [ ] Navigating to `<RENDER_URL>/admin/` loads the Django admin login.
- [ ] Django admin CSS loads (verifying WhiteNoise).

### Integration & Security
- [ ] Frontend successfully fetches data from the Django API.
- [ ] Browser Network tab shows HTTPS connections with no CORS errors.
- [ ] Entering an invalid path in the API does not display a Django debug trace (verifying `DEBUG=False`).

## 20. Troubleshooting

| Symptom | Cause | Diagnosis | Fix |
| ------- | ----- | --------- | --- |
| **Render Build Failure** | Dependency error | Check Render Build Logs. | Ensure package is in `backend/requirements.txt`. |
| **Supabase DB Connection Failure** | Invalid `DATABASE_URL` | Render logs show `psycopg2.OperationalError`. | Verify the Supabase URI password and ensure port 5432/6543 is correct. |
| **Render 502/503 Error** | Gunicorn crashed | Check Render App Logs. | Verify `gunicorn config.wsgi:application` is correct and `ALLOWED_HOSTS` is set. |
| **CORS Policy Error in Browser** | `CORS_ALLOWED_ORIGINS` mismatch | Browser console shows CORS block. | Check Render ENV. Ensure Vercel URL has `https://` and no trailing slash. Restart Render. |
| **Frontend calls localhost:8000** | `VITE_API_URL` missing at build | Check Network tab in browser. | Add `VITE_API_URL` to Vercel and **redeploy** the Vercel project. |
| **Django Admin has no CSS** | `collectstatic` did not run | `/admin/` looks broken. | Ensure `python manage.py collectstatic --noinput` is in the Render Build Command. |
| **Django Migration Failure** | DB schema conflict | Render Build Logs show `django.db.utils.ProgrammingError`. | Connect to Supabase via psql to inspect the schema, or reset the DB if safe. |

## 21. Future Deployment Workflow

Once deployed, the workflow is highly automated:

1. Developer makes changes locally and tests.
2. Changes are committed and pushed:
   ```bash
   git push origin main
   ```
3. **Vercel** automatically detects the push and starts building/deploying the frontend.
4. **Render** automatically detects the push, runs migrations, collects static files, and restarts Gunicorn.
5. **Caution on Migrations:** If deleting columns or renaming tables, ensure the code changes are backward compatible during the few minutes the deployment takes to propagate.

## 22. Cost and Free-Tier Considerations

*Note: Pricing and free-tier limitations are subject to change by the providers.*

- **Vercel:** Generous free tier for hobbyists; suitable for static frontend hosting.
- **Supabase:** Free tier includes a 500MB PostgreSQL database. The database pauses after 1 week of inactivity (on the free tier), which will cause API errors until you log in to unpause it.
- **Render:** Free tier web services spin down after 15 minutes of inactivity. The first request after a spin-down will experience a "cold start" delay of up to 50 seconds. Consider upgrading to the $7/mo tier for a production application that requires instant availability.

## 23. Production Launch Checklist

- [ ] Repository prepared and pushed to main branch.
- [ ] No `.env` secrets committed to GitHub.
- [ ] Supabase project and PostgreSQL database created.
- [ ] `DATABASE_URL` connection string retrieved from Supabase.
- [ ] Render Django service created.
- [ ] `SECRET_KEY` generated securely for Render.
- [ ] `DEBUG=False` set in Render.
- [ ] `ALLOWED_HOSTS` configured with Render domain.
- [ ] Render Build Command configured to run migrations and collectstatic.
- [ ] Render deployment successful (Backend API verified).
- [ ] Vercel project created.
- [ ] `VITE_API_URL` set in Vercel to point to Render.
- [ ] Vercel deployment successful (Frontend verified).
- [ ] `CORS_ALLOWED_ORIGINS` set in Render to point to Vercel.
- [ ] Production frontend ↔ backend integration tested.
- [ ] Django admin loaded and static files verified.
- [ ] Final HTTPS and security checks completed.
