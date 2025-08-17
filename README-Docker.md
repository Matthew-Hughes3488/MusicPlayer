# 🎵 Music Player - Docker Guide

This guide explains how to run the Music Player microservices using Docker and Docker Compose.

## 📋 Prerequisites

- Docker (version 20.10 or later)
- Docker Compose (version 2.0 or later)
- Make (optional, but recommended for easier commands)

Check if you have these installed:
```bash
docker --version
docker-compose --version
make --version
```

## 🚀 Quick Start

1. **First-time setup**:
   ```bash
   make setup
   ```
   This copies `.env.example` to `.env` and builds all services.

2. **Edit environment variables**:
   ```bash
   nano .env  # or use your preferred editor
   ```
   Update database credentials and JWT secret key.

3. **Start all services**:
   ```bash
   make up-d  # Starts in background
   ```

4. **Check service health**:
   ```bash
   make health
   ```

5. **View logs**:
   ```bash
   make logs-f  # Follow logs in real-time
   ```

## 🏗️ Architecture Overview

The application consists of four microservices:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Service  │    │  Auth Service   │    │ Album Service   │    │  Song Service   │
│   Port: 8003    │    │   Port: 8000    │    │   Port: 8001    │    │   Port: 8002    │
│                 │    │                 │    │                 │    │                 │
│ • User CRUD     │    │ • Authentication│    │ • Album CRUD    │    │ • Song CRUD     │
│ • User profiles │    │ • JWT tokens    │    │ • Album metadata│    │ • Song metadata │
│ • User roles    │    │ • Login/logout  │    │ • Album art     │    │ • Playlists     │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         └───────────────────────┼───────────────────────┼───────────────────────┘
                                │                       │
                    ┌─────────────────────────────────┐
                    │      music-network (bridge)     │
                    │   Enables service-to-service    │
                    │      communication by name      │
                    └─────────────────────────────────┘
```

### Service Dependencies

```
song-service
    ↓ depends on
album-service
    ↓ depends on  
auth-service
    ↓ depends on
user-service (foundation service)
```

## 📁 Project Structure

```
music-player/
├── docker-compose.yml          # Main compose file
├── .env.example               # Environment variables template
├── .env                       # Your actual environment variables (git-ignored)
├── Makefile                   # Convenient commands
├── backend/
│   ├── requirements.txt       # Python dependencies
│   ├── user_service/
│   │   ├── Dockerfile        # User service container definition
│   │   └── app.py            # FastAPI application
│   ├── auth_service/
│   │   ├── Dockerfile        # Auth service container definition
│   │   └── app.py            # FastAPI application
│   ├── album_service/
│   │   ├── Dockerfile        # Album service container definition
│   │   └── app.py            # FastAPI application
│   ├── song_service/
│   │   ├── Dockerfile        # Song service container definition
│   │   └── app.py            # FastAPI application
│   └── database/             # Shared database models and utilities
└── README-Docker.md          # This file
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Key variables:

#### Database Configuration
```bash
DB_HOST=localhost              # Database host
DB_PORT=5432                  # Database port
DB_USER=musicuser             # Database username
DB_PASSWORD=secure-password   # Database password
DB_NAME=music_db              # Database name
DATABASE_URL=postgresql://... # Complete database URL
```

#### JWT Configuration
```bash
JWT_SECRET_KEY=your-secret-key    # Secret for signing JWT tokens
JWT_ALGORITHM=HS256              # JWT signing algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=30   # Token expiration time
```

#### Service URLs (automatically configured by Docker Compose)
```bash
USER_SERVICE_URL=http://user-service:8003
AUTH_SERVICE_URL=http://auth-service:8000
ALBUM_SERVICE_URL=http://album-service:8001
SONG_SERVICE_URL=http://song-service:8002
```

## 🛠️ Development Commands

### Service Management
```bash
# Start all services in background
make up-d

# Start all services in foreground (see logs)
make up

# Stop all services
make down

# Restart all services
make restart

# Check service status
make status
```

### Individual Services
```bash
# Start only specific service (and its dependencies)
make user-service
make auth-service
make album-service
make song-service
```

### Monitoring and Debugging
```bash
# Check health of all services
make health

# View logs from all services
make logs

# Follow logs in real-time
make logs-f

# View logs from specific service
make logs-user
make logs-auth
make logs-album
make logs-song
```

### Shell Access
```bash
# Open bash shell in specific container
make shell-user
make shell-auth
make shell-album
make shell-song
```

### Building and Rebuilding
```bash
# Build all services
make build

# Build without cache (clean build)
make build-no-cache

# Rebuild specific service
make rebuild-service SERVICE=user-service
```

## 🔍 Testing Your Services

### Health Check Endpoints
```bash
curl http://localhost:8003/health  # User service
curl http://localhost:8000/health  # Auth service
curl http://localhost:8001/health  # Album service
curl http://localhost:8002/health  # Song service
```

### API Endpoints
```bash
# Test automated with make
make test-endpoints

# Manual testing
curl http://localhost:8003/users          # Get users
curl http://localhost:8001/albums         # Get albums
curl http://localhost:8002/songs          # Get songs

# Authentication test (requires user service to be running)
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

## 🌐 Service Communication

Docker Compose creates a bridge network where services can communicate by name:

```python
# Instead of http://localhost:8003, services use:
USER_SERVICE_URL = "http://user-service:8003"
AUTH_SERVICE_URL = "http://auth-service:8000"
ALBUM_SERVICE_URL = "http://album-service:8001"
SONG_SERVICE_URL = "http://song-service:8002"
```

### Network Topology
```
Host Machine (your computer)
├── localhost:8000 → auth-service container
├── localhost:8001 → album-service container  
├── localhost:8002 → song-service container
├── localhost:8003 → user-service container
└── music-network (Docker bridge network)
    ├── user-service:8003
    ├── auth-service:8000
    ├── album-service:8001
    └── song-service:8002
```

## 🐛 Troubleshooting

### Common Issues

#### Services Won't Start
```bash
# Check Docker is running
docker info

# Check compose file syntax
make config

# View detailed logs
make logs
```

#### Port Already in Use
```bash
# Find what's using the port
sudo lsof -i :8003

# Kill the process or change ports in docker-compose.yml
```

#### Services Can't Communicate
```bash
# Check network exists
docker network ls | grep music

# Check service names resolve
make shell-auth
# Inside container:
nslookup user-service
curl http://user-service:8003/health
```

#### Module Import Errors
```bash
# Check Python path inside container
make shell-user
# Inside container:
python -c "import sys; print(sys.path)"
ls -la /app/backend/
```

#### Database Connection Issues
```bash
# Check environment variables
make shell-user
# Inside container:
env | grep DB

# Test database connection
python -c "from backend.database.connector import connector; print('DB OK')"
```

### Debug Commands
```bash
# Check what's running
docker ps

# Check container logs
docker logs music-user-service

# Inspect container
docker inspect music-user-service

# Check network
docker network inspect music-player-network

# Run command in container
docker exec -it music-user-service bash
```

## 🧹 Cleanup

### Stop and Clean Up
```bash
# Stop services
make down

# Remove containers and volumes (⚠️ deletes data!)
make clean-volumes

# Remove built images
make clean-images

# Nuclear option - remove everything
make clean-all
```

## 🏭 Production Considerations

### Security
- Use Docker secrets instead of environment variables for sensitive data
- Run containers as non-root users (already configured)
- Use multi-stage builds to reduce image size
- Scan images for vulnerabilities

### Performance  
- Set resource limits in docker-compose.yml
- Use production WSGI server instead of development server
- Enable logging drivers for centralized logging
- Use health checks for proper load balancer integration

### Scaling
```bash
# Scale specific service
make scale SERVICE=song-service REPLICAS=3

# Use Docker Swarm or Kubernetes for production scaling
```

### Monitoring
- Add monitoring containers (Prometheus, Grafana)
- Configure proper logging (ELK stack, Fluentd)
- Set up alerting for service failures

## 📚 Learning Resources

### Docker Concepts You've Learned
1. **Containers**: Lightweight, isolated runtime environments
2. **Images**: Templates for creating containers
3. **Dockerfile**: Instructions for building images
4. **Docker Compose**: Tool for defining multi-container applications
5. **Networks**: How containers communicate
6. **Volumes**: Persistent data storage
7. **Environment Variables**: Configuration management
8. **Health Checks**: Monitoring container health

### Next Steps
1. Learn Docker Swarm for production orchestration
2. Explore Kubernetes for advanced container orchestration
3. Study CI/CD pipelines with Docker
4. Learn about container security best practices
5. Explore monitoring and logging solutions

## 🤝 Getting Help

If you encounter issues:

1. Check this README first
2. Run `make help` for available commands
3. Check service logs: `make logs-[service-name]`
4. Verify service health: `make health`
5. Test network connectivity between services

---

Happy containerizing! 🐳
