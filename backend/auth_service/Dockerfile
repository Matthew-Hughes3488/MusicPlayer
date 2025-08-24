# ==============================================================================
# DOCKERFILE FOR AUTH SERVICE
# ==============================================================================
# Authentication service that communicates with the user service
# This demonstrates inter-service communication in a microservices architecture

# ------------------------------------------------------------------------------
# 1. BASE IMAGE
# ------------------------------------------------------------------------------
FROM python:3.13-slim

# Metadata for container identification
LABEL maintainer="your-email@example.com"
LABEL description="Authentication Service for Music Player Application"
LABEL version="1.0"

# ------------------------------------------------------------------------------
# 2. SET WORKING DIRECTORY
# ------------------------------------------------------------------------------
WORKDIR /app

# ------------------------------------------------------------------------------
# 3. INSTALL SYSTEM DEPENDENCIES
# ------------------------------------------------------------------------------
# Install curl for health checks and any other system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------------------------------
# 4. COPY AND INSTALL PYTHON DEPENDENCIES
# ------------------------------------------------------------------------------
# Copy requirements first for better Docker layer caching
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ------------------------------------------------------------------------------
# 5. COPY APPLICATION CODE
# ------------------------------------------------------------------------------
# Copy the auth service code and shared dependencies
COPY auth_service/ ./backend/auth_service/
COPY database/ ./backend/database/

# ------------------------------------------------------------------------------
# 6. ENVIRONMENT VARIABLES
# ------------------------------------------------------------------------------
# Python configuration
ENV PYTHONPATH=/app
ENV PYTHONDONTWRITEBYTECODE=1
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
# Auth service typically runs on port 8000 (different from user:8003, album:8001)
EXPOSE 8000

# ------------------------------------------------------------------------------
# 8. SECURITY: NON-ROOT USER
# ------------------------------------------------------------------------------
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# ------------------------------------------------------------------------------
# 9. HEALTH CHECK
# ------------------------------------------------------------------------------
# Check if the auth service is responding on its health endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# ------------------------------------------------------------------------------
# 10. DEFAULT COMMAND
# ------------------------------------------------------------------------------
# Start the auth service on port 8000
CMD ["uvicorn", "backend.auth_service.app:app", "--host", "0.0.0.0", "--port", "8000"]

# ------------------------------------------------------------------------------
# MICROSERVICES COMMUNICATION NOTES:
# ------------------------------------------------------------------------------
# This auth service needs to communicate with the user service.
# In a containerized environment, you have several options:
#
# 1. DOCKER COMPOSE (Recommended for development):
#    Services can reference each other by name:
#    USER_SERVICE_URL=http://user-service:8003
#
# 2. HOST NETWORKING:
#    Use host.docker.internal (Docker Desktop) or host networking mode
#    USER_SERVICE_URL=http://host.docker.internal:8003
#
# 3. EXTERNAL SERVICES:
#    Point to services running on the host or other servers
#    USER_SERVICE_URL=http://192.168.1.100:8003

# ------------------------------------------------------------------------------
# ENVIRONMENT VARIABLE HANDLING:
# ------------------------------------------------------------------------------
# This Dockerfile provides default values for environment variables.
# You can override them in several ways:
#
# 1. At runtime with -e flags:
#    docker run -e USER_SERVICE_URL=http://user-service:8003 auth-service
#
# 2. With an environment file:
#    docker run --env-file .env auth-service
#
# 3. In docker-compose.yml:
#    environment:
#      - USER_SERVICE_URL=http://user-service:8003
#
# 4. Load from .env file in the container (current approach):
#    The auth service uses python-dotenv to load .env files

# ------------------------------------------------------------------------------
# HOW TO USE THIS DOCKERFILE:
# ------------------------------------------------------------------------------
# 1. Build:
#    docker build -f auth_service/Dockerfile -t auth-service .
#
# 2. Run standalone (for testing):
#    docker run -p 8000:8000 \
#      -e USER_SERVICE_URL=http://host.docker.internal:8003 \
#      auth-service
#
# 3. Run with custom environment file:
#    docker run -p 8000:8000 --env-file .env auth-service
#
# 4. Test the health endpoint:
#    curl http://localhost:8000/health
#
# 5. Test authentication (requires user service running):
#    curl -X POST http://localhost:8000/auth/login \
#      -H "Content-Type: application/json" \
#      -d '{"email": "user@example.com", "password": "password"}'

# ------------------------------------------------------------------------------
# DOCKER COMPOSE EXAMPLE:
# ------------------------------------------------------------------------------
# Here's how you might define this in docker-compose.yml:
#
# version: '3.8'
# services:
#   user-service:
#     build:
#       context: .
#       dockerfile: user_service/Dockerfile
#     ports:
#       - "8000:8000"
#     environment:
#       - DATABASE_URL=${DATABASE_URL}
#   
#   auth-service:
#     build:
#       context: .
#       dockerfile: auth_service/Dockerfile
#     ports:
#       - "8002:8002"
#     depends_on:
#       - user-service
#     environment:
#       - USER_SERVICE_URL=http://user-service:8000
#       - JWT_SECRET_KEY=${JWT_SECRET_KEY}
#     env_file:
#       - .env
