# ==============================================================================
# DOCKERFILE FOR ALBUM SERVICE
# ==============================================================================
# This file defines how to build a Docker container for the album service.
# Docker builds containers in layers - each instruction creates a new layer.
# Understanding layers is key: unchanged layers are cached and reused for faster builds.

# ------------------------------------------------------------------------------
# 1. BASE IMAGE
# ------------------------------------------------------------------------------
# Start from an official Python runtime image
# python:3.13-slim is a smaller version with just the essentials
# Other options: python:3.13 (full), python:3.13-alpine (smallest but sometimes tricky)
FROM python:3.13-slim

# Set metadata for the image (optional but good practice)
# This helps identify your images later with 'docker inspect'
LABEL maintainer="your-email@example.com"
LABEL description="Album Service for Music Player Application"
LABEL version="1.0"

# ------------------------------------------------------------------------------
# 2. SET WORKING DIRECTORY
# ------------------------------------------------------------------------------
# Create and set the working directory inside the container
# All subsequent commands will run from this directory (/app)
# Think of this as 'cd /app' but permanent for the container
WORKDIR /app

# ------------------------------------------------------------------------------
# 3. INSTALL SYSTEM DEPENDENCIES (if needed)
# ------------------------------------------------------------------------------
# Update package list and install any system-level dependencies
# curl is needed for our health check later
# The && chains commands together - if one fails, the whole RUN fails
# rm -rf /var/lib/apt/lists/* cleans up package lists to keep image size smaller
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------------------------------
# 4. COPY AND INSTALL PYTHON DEPENDENCIES FIRST
# ------------------------------------------------------------------------------
# Why copy requirements.txt first? DOCKER LAYER CACHING!
# If your source code changes but requirements.txt doesn't,
# Docker reuses the cached layer with installed packages = faster builds
COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir: Don't keep downloaded packages (saves space)
# --upgrade pip: Make sure we have latest pip version
# The && ensures both commands succeed
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ------------------------------------------------------------------------------
# 5. COPY APPLICATION CODE
# ------------------------------------------------------------------------------
# Now copy your application code
# We recreate the backend/ directory structure to match your Python imports
# Your app.py has: "from backend.album_service.routers..." 
# So we need this exact structure inside the container

COPY album_service/ ./backend/album_service/
COPY database/ ./backend/database/

# Why copy code AFTER installing dependencies?
# Code changes frequently, dependencies don't
# This way, code changes don't invalidate the dependency installation layer

# ------------------------------------------------------------------------------
# 6. SET ENVIRONMENT VARIABLES
# ------------------------------------------------------------------------------
# PYTHONPATH tells Python where to look for modules
# Since we have backend/ structure, /app is the root where Python should start looking
ENV PYTHONPATH=/app

# Prevent Python from writing .pyc files (compiled bytecode)
# In containers, these files just take up space and aren't reused
ENV PYTHONDONTWRITEBYTECODE=1

# Ensure Python output goes straight to terminal without buffering
# This makes logs appear immediately in 'docker logs'
ENV PYTHONUNBUFFERED=1

# Application environment variables (empty by default)
# Override these when running the container with -e flags or --env-file
# Based on your .env file structure:

# Database configuration
ENV DB_HOST=""
ENV DB_PORT=""  
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV DB_NAME=""
ENV DB_DRIVER=""
ENV DATABASE_URL=""

# Service URLs
ENV USER_SERVICE_URL=""

# JWT Configuration  
ENV JWT_SECRET_KEY=""
ENV JWT_ALGORITHM="HS256"


# ------------------------------------------------------------------------------
# 7. EXPOSE PORT
# ------------------------------------------------------------------------------
# Tell Docker that this container will listen on port 8001
# This is DOCUMENTATION only - it doesn't actually open the port
# You still need -p 8001:8001 when running the container
EXPOSE 8001

# ------------------------------------------------------------------------------
# 8. SET USER (Security Best Practice)
# ------------------------------------------------------------------------------
# DON'T RUN AS ROOT! Security 101 for containers
# Create a non-root user to run the application
# If someone breaks into your container, they won't have root privileges

RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# From this point on, all commands run as 'appuser', not root

# ------------------------------------------------------------------------------
# 9. HEALTH CHECK (Optional but recommended)
# ------------------------------------------------------------------------------
# Docker can periodically check if your container is healthy
# --interval=30s: Check every 30 seconds
# --timeout=10s: Wait max 10 seconds for response
# --start-period=5s: Wait 5 seconds before first check (app startup time)
# --retries=3: Try 3 times before marking as unhealthy
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# ------------------------------------------------------------------------------
# 10. DEFAULT COMMAND
# ------------------------------------------------------------------------------
# This is what runs when the container starts
# uvicorn: ASGI server for FastAPI (like gunicorn for Flask)
# backend.album_service.app:app: Python module path to your FastAPI app
# --host 0.0.0.0: Accept connections from any IP (not just localhost)
# --port 8001: Port to listen on INSIDE the container
CMD ["uvicorn", "backend.album_service.app:app", "--host", "0.0.0.0", "--port", "8001"]

# ------------------------------------------------------------------------------
# DOCKER CONCEPTS YOU'VE LEARNED:
# ------------------------------------------------------------------------------
# 1. Build Context: Directory Docker can access during build (the . in docker build -t name .)
# 2. Layers: Each instruction creates a layer, cached for faster rebuilds
# 3. Layer Ordering: Put changing stuff (your code) after stable stuff (dependencies)
# 4. Port Mapping: EXPOSE documents, -p actually maps host:container ports
# 5. Security: Always use non-root users in containers
# 6. Health Checks: Let Docker monitor your app's health
# 7. Environment Variables: Configure behavior without rebuilding images

# ------------------------------------------------------------------------------
# HOW TO USE THIS DOCKERFILE:
# ------------------------------------------------------------------------------
# 1. Build: docker build -f album_service/Dockerfile -t album-service .
#    (run from backend/ directory)
# 
# 2. Run: docker run -p 8001:8001 album-service
#    Maps host port 8001 to container port 8001
# 
# 3. Test: curl http://localhost:8001/health
# 
# 4. Debug: docker run -it --entrypoint /bin/bash album-service
#    Opens a shell inside the container for troubleshooting
#
# 5. View logs: docker logs <container_id>
# 
# 6. Stop: docker stop <container_id>

# ------------------------------------------------------------------------------
# COMMON DEBUGGING TIPS:
# ------------------------------------------------------------------------------
# - "Module not found": Check PYTHONPATH and directory structure
# - "Permission denied": Check if files are owned by appuser
# - "Can't connect": Check port mapping (-p host:container)
# - "Build context error": Make sure you're in the right directory
# - "Layer cache issues": Use docker build --no-cache to rebuild everything
