# 🎵 MusicPlayer Backend

> **A modern microservices-based music player backend built with FastAPI, SQLAlchemy, and clean architecture principles.**

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.12-green.svg)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.41-red.svg)](https://www.sqlalchemy.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com)
[![Tests](https://img.shields.io/badge/Tests-Pytest-yellow.svg)](https://pytest.org)

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Services](#-services)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Authentication & Authorization](#-authentication--authorization)
- [Testing](#-testing)
- [Docker Support](#-docker-support)
- [Development Guidelines](#-development-guidelines)
- [Contributing](#-contributing)

## 🎯 Overview

This project is a **microservices-based music player backend** that demonstrates modern software engineering practices including:

- **Clean Architecture** with separation of concerns
- **Domain-Driven Design** principles
- **Repository Pattern** for data access abstraction
- **Dependency Injection** for loose coupling
- **JWT-based Authentication** with role-based access control
- **Comprehensive Testing** with pytest
- **Docker containerization** for easy deployment
- **RESTful API design** with OpenAPI documentation

## 🏗️ Architecture

The system follows a **microservices architecture** with four independent services:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Service  │    │  Auth Service   │    │ Album Service   │    │  Song Service   │
│   Port: 8003    │    │   Port: 8000    │    │   Port: 8001    │    │   Port: 8002    │
│                 │    │                 │    │                 │    │                 │
│ • User CRUD     │◄───┤ • JWT Auth      │    │ • Album CRUD    │    │ • Song CRUD     │
│ • User profiles │    │ • Login/logout  │    │ • Album metadata│    │ • Song metadata │
│ • Role mgmt     │    │ • Token verify  │    │ • Album-songs   │    │ • User likes    │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         └───────────────────────┼───────────────────────┼───────────────────────┘
                                │                       │
                    ┌─────────────────────────────────────┐
                    │        Shared Database              │
                    │    (Microsoft SQL Server)          │
                    │                                     │
                    │ • Users, Albums, Songs tables      │
                    │ • Many-to-many relationships       │
                    │ • ACID transactions                 │
                    └─────────────────────────────────────┘
```

### Design Patterns Used

- **Repository Pattern**: Abstract data access with swappable implementations (SQLAlchemy + Mock)
- **Service Layer Pattern**: Business logic encapsulation
- **Dependency Injection**: Loose coupling between components
- **Factory Pattern**: Database connector creation
- **DTO Pattern**: Data transfer objects for API models

## 🚀 Services

### 1. **User Service** (`localhost:8003`)
Manages user accounts, profiles, and roles.

**Key Features:**
- User registration and profile management
- Role-based access control (admin/user)
- Password hashing with bcrypt
- User authentication data for auth service

**Main Endpoints:**
- `GET /users` - List all users (authenticated)
- `GET /users/{id}` - Get user by ID (authenticated)
- `GET /users/email/{email}` - Get user by email (for auth service)
- `POST /users` - Create new user (public)
- `PUT /users/{id}` - Update user (admin only)
- `DELETE /users/{id}` - Delete user (admin only)

### 2. **Auth Service** (`localhost:8000`)
Handles authentication and JWT token management.

**Key Features:**
- JWT token generation and validation
- Password verification
- Integration with user service for credential validation
- Token-based session management

**Main Endpoints:**
- `POST /auth/login` - User login with email/password
- JWT middleware for other services

### 3. **Album Service** (`localhost:8001`)
Manages music albums and their metadata.

**Key Features:**
- Album CRUD operations
- Album-song relationship management
- Album cover image URLs
- Genre and artist management

**Main Endpoints:**
- `GET /albums` - List all albums (public)
- `GET /albums/{id}` - Get album by ID (authenticated)
- `GET /albums/{id}/songs` - Get songs in album (authenticated)
- `POST /albums` - Create album (admin only)
- `PUT /albums/{id}` - Update album (admin only)
- `DELETE /albums/{id}` - Delete album (admin only)

### 4. **Song Service** (`localhost:8002`)
Manages individual songs and user interactions.

**Key Features:**
- Song CRUD operations
- Song metadata (title, artist, duration, etc.)
- User likes/favorites functionality
- File URL management for audio files

**Main Endpoints:**
- `GET /songs` - List all songs (public)
- `GET /songs/{id}` - Get song by ID (authenticated)
- `POST /songs` - Create song (admin only)
- `PUT /songs/{id}` - Update song (admin only)
- `DELETE /songs/{id}` - Delete song (admin only)

## 🛠️ Tech Stack

### Core Technologies
- **Python 3.13** - Latest Python version
- **FastAPI 0.115.12** - Modern, fast web framework
- **SQLAlchemy 2.0.41** - Advanced ORM with async support
- **Uvicorn 0.34.2** - ASGI server for production

### Database & Storage
- **Microsoft SQL Server** - Primary database (with Docker support)
- **pyodbc 5.2.0** - SQL Server connectivity
- **PyMySQL 1.1.1** - MySQL support (alternative)

### Authentication & Security
- **python-jose 3.5.0** - JWT token handling
- **passlib 1.7.4** - Password hashing
- **bcrypt 4.3.0** - Secure password hashing
- **pydantic 2.11.4** - Data validation and serialization

### Development & Testing
- **pytest 8.3.5** - Testing framework
- **python-dotenv 1.1.1** - Environment variable management
- **httpx 0.28.1** - HTTP client for service communication
- **requests 2.32.4** - HTTP requests library

### Containerization
- **Docker** - Container platform
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
backend/
├── 📄 requirements.txt              # Python dependencies
├── 📄 .env                         # Environment variables
├── 📄 useful_cmds.txt              # Helpful commands reference
│
├── 👤 user_service/                # User management service
│   ├── 📱 app.py                   # FastAPI application
│   ├── 🐳 Dockerfile               # Container definition
│   ├── 📋 requirements.txt         # Service-specific deps
│   ├── 🛣️  routers/                # API endpoints
│   │   └── user_router.py
│   ├── 🏢 services/                # Business logic
│   │   ├── user_alchemy_service.py
│   │   └── mock_user_service.py
│   ├── 📊 repos/                   # Data access layer
│   │   ├── user_alchemy_repo.py
│   │   └── mock_user_repo.py
│   ├── 📝 models/                  # Pydantic models
│   │   ├── user_model.py
│   │   ├── user_input_model.py
│   │   └── user_update_model.py
│   ├── 🛡️  utils/                  # Utilities
│   │   ├── auth_helper.py
│   │   └── security.py
│   ├── ⚠️  errors_exceptions/       # Custom exceptions
│   ├── 🎭 mock_data/               # Test data
│   └── 🧪 tests/                   # Unit tests
│
├── 🔐 auth_service/                # Authentication service
│   ├── 📱 app.py                   # FastAPI application
│   ├── 🐳 Dockerfile               # Container definition
│   ├── 🛣️  routers.py               # API endpoints
│   ├── 🏢 auth_service.py          # Core auth logic
│   ├── 🔑 jwt_utils.py             # JWT token utilities
│   ├── 🔒 security_utils.py        # Security utilities
│   ├── 📝 model/                   # Pydantic models
│   ├── ⚠️  exceptions/             # Custom exceptions
│   └── 🧪 tests/                   # Unit tests
│
├── 💿 album_service/               # Album management service
│   ├── 📱 app.py                   # FastAPI application
│   ├── 🐳 Dockerfile               # Container definition
│   ├── 🛣️  routers/                # API endpoints
│   ├── 🏢 services/                # Business logic
│   ├── 📊 repos/                   # Data access layer
│   ├── 📝 models/                  # Pydantic models
│   ├── 🛡️  utils/                  # Utilities
│   ├── ⚠️  errors_exceptions/       # Custom exceptions
│   ├── 🎭 mock_data/               # Test data
│   └── 🧪 tests/                   # Unit tests
│
├── 🎵 song_service/                # Song management service
│   ├── 📱 app.py                   # FastAPI application
│   ├── 🐳 Dockerfile               # Container definition
│   ├── 🛣️  routers/                # API endpoints
│   ├── 🏢 services/                # Business logic
│   ├── 📊 repos/                   # Data access layer
│   ├── 📝 models/                  # Pydantic models
│   ├── 🛡️  utils/                  # Utilities
│   ├── ⚠️  errors_exceptions/       # Custom exceptions
│   ├── 🎭 mock_data/               # Test data
│   └── 🧪 tests/                   # Unit tests
│
└── 🗄️  database/                   # Shared database layer
    ├── 📊 models/                  # SQLAlchemy ORM models
    │   ├── base.py                 # Base model class
    │   ├── user_model.py           # User table model
    │   ├── album_model.py          # Album table model
    │   ├── song_model.py           # Song table model
    │   ├── album_songs_model.py    # Many-to-many: albums-songs
    │   └── user_likes.py           # Many-to-many: users-songs
    ├── 🔌 connector/               # Database connection
    │   └── connector.py            # SQLAlchemy engine setup
    ├── 🏭 factories/               # Factory patterns
    │   └── connector_factory.py
    └── 🧪 tests/                   # Database tests
```

### Architecture Layers

Each service follows a **clean architecture** with distinct layers:

1. **Presentation Layer** (`routers/`) - HTTP API endpoints
2. **Business Logic Layer** (`services/`) - Core business rules
3. **Data Access Layer** (`repos/`) - Database operations
4. **Domain Models Layer** (`models/`) - Data structures
5. **Infrastructure Layer** (`utils/`, `database/`) - External concerns

## 🚀 Getting Started

### Prerequisites

- **Python 3.13+**
- **Microsoft SQL Server** (or Docker)
- **Git**

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Matthew-Hughes3488/MusicPlayer.git
   cd MusicPlayer/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv music
   source music/bin/activate  # On Windows: music\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Configure database connection**
   ```env
   DB_HOST=localhost
   DB_PORT=1433
   DB_USER=sa
   DB_PASSWORD=YourStrongPassword
   DB_NAME=MUSIC_PLAYER_DB
   DATABASE_URL=mssql+pyodbc://sa:YourStrongPassword@localhost:1433/MUSIC_PLAYER_DB?driver=ODBC+Driver+18+for+SQL+Server&TrustServerCertificate=yes&Encrypt=no
   ```

6. **Start services individually**
   ```bash
   # Terminal 1 - User Service
   cd user_service && uvicorn app:app --host 0.0.0.0 --port 8003 --reload

   # Terminal 2 - Auth Service  
   cd auth_service && uvicorn app:app --host 0.0.0.0 --port 8000 --reload

   # Terminal 3 - Album Service
   cd album_service && uvicorn app:app --host 0.0.0.0 --port 8001 --reload

   # Terminal 4 - Song Service
   cd song_service && uvicorn app:app --host 0.0.0.0 --port 8002 --reload
   ```

### Docker Setup (Recommended)

1. **Use Docker Compose** (from project root)
   ```bash
   cd .. # Go to project root
   make setup    # First-time setup
   make up-d     # Start all services in background
   make health   # Check service health
   ```

2. **View logs**
   ```bash
   make logs-f   # Follow all service logs
   make logs-user  # View specific service logs
   ```

3. **Stop services**
   ```bash
   make down     # Stop all services
   ```

## 🗄️ Database Schema

The system uses **Microsoft SQL Server** with the following schema:

```sql
-- Users table
CREATE TABLE USERS (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(255) NOT NULL UNIQUE,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(255) NOT NULL,
    last_name NVARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME
);

-- Albums table
CREATE TABLE ALBUMS (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(100) NOT NULL,
    artist NVARCHAR(100) NOT NULL,
    genre NVARCHAR(50) NOT NULL,
    description NVARCHAR(500),
    cover_image_url NVARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME
);

-- Songs table
CREATE TABLE SONGS (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(100) NOT NULL,
    artist NVARCHAR(100) NOT NULL,
    genre NVARCHAR(50) NOT NULL,
    file_url NVARCHAR(255) NOT NULL,
    duration INT, -- in seconds
    description NVARCHAR(500),
    cover_image_url NVARCHAR(255),
    release_date DATETIME,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME
);

-- Many-to-many: Albums ↔ Songs
CREATE TABLE album_songs (
    album_id INT FOREIGN KEY REFERENCES ALBUMS(id),
    song_id INT FOREIGN KEY REFERENCES SONGS(id),
    PRIMARY KEY (album_id, song_id)
);

-- Many-to-many: Users ↔ Songs (likes)
CREATE TABLE user_likes (
    user_id INT FOREIGN KEY REFERENCES USERS(id),
    song_id INT FOREIGN KEY REFERENCES SONGS(id),
    created_at DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (user_id, song_id)
);
```

### Relationships

- **Users ↔ Songs**: Many-to-many (likes/favorites)
- **Albums ↔ Songs**: Many-to-many (songs can be in multiple albums)
- All tables have automatic timestamps and primary keys

## 📖 API Documentation

Each service provides **interactive OpenAPI documentation**:

### Service Documentation URLs

- **User Service**: http://localhost:8003/docs
- **Auth Service**: http://localhost:8000/docs  
- **Album Service**: http://localhost:8001/docs
- **Song Service**: http://localhost:8002/docs

### Common Response Formats

```json
// Success Response
{
  "id": 1,
  "title": "Example Album",
  "artist": "Example Artist",
  "created_at": "2025-01-17T10:00:00Z"
}

// Error Response
{
  "detail": "Resource not found"
}

// Validation Error Response
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### Authentication Headers

For protected endpoints, include JWT token:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8001/albums/1
```

## 🔐 Authentication & Authorization

The system implements **JWT-based authentication** with role-based access control.

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant AuthService
    participant UserService
    participant ProtectedService

    Client->>AuthService: POST /auth/login {email, password}
    AuthService->>UserService: GET /users/email/{email}
    UserService->>AuthService: User data with password_hash
    AuthService->>AuthService: Verify password
    AuthService->>Client: JWT token + user_id
    
    Client->>ProtectedService: GET /protected {Authorization: Bearer JWT}
    ProtectedService->>ProtectedService: Validate JWT
    ProtectedService->>Client: Protected data
```

### JWT Token Structure

```json
{
  "sub": "user_id",           // Subject (user identifier)
  "exp": 1642784400,         // Expiration timestamp
  "iat": 1642780800,         // Issued at timestamp
  "role": "user"             // User role (user/admin)
}
```

### Authorization Levels

1. **Public**: No authentication required
   - `GET /albums` (list albums)
   - `POST /users` (user registration)
   - `POST /auth/login` (login)

2. **Authenticated**: Valid JWT token required
   - `GET /albums/{id}` (view specific album)
   - `GET /users/{id}` (view user profile)

3. **Admin Only**: Admin role required
   - `POST /albums` (create album)
   - `DELETE /users/{id}` (delete user)
   - `PUT /albums/{id}` (update album)

### Usage Examples

```bash
# 1. Login to get token
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Response: {"auth_token": "eyJ0eXAiOiJKV1QiLCJhb...", "user_id": 1}

# 2. Use token for protected endpoints
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."

curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8001/albums/1
```

## 🧪 Testing

The project includes comprehensive tests using **pytest**.

### Test Structure

Each service has three types of tests:

1. **API Tests** (`test_*_api.py`) - HTTP endpoint testing
2. **Service Tests** (`test_*_service.py`) - Business logic testing  
3. **Repository Tests** (`test_*_repo.py`) - Data access testing

### Running Tests

```bash
# Run all tests
pytest

# Run tests for specific service
pytest user_service/tests/

# Run with coverage
pytest --cov=backend --cov-report=html

# Run specific test file
pytest album_service/tests/test_album_api.py

# Run with verbose output
pytest -v
```

### Test Examples

```python
# API Test Example
def test_create_album(test_client):
    response = test_client.post("/albums", json={
        "title": "Test Album",
        "artist": "Test Artist", 
        "genre": "Rock"
    })
    assert response.status_code == 201
    assert response.json()["title"] == "Test Album"

# Service Test Example  
def test_album_service_create():
    service = MockAlbumService()
    album = service.create_new_album(AlbumInput(
        title="Test Album",
        artist="Test Artist",
        genre="Rock"
    ))
    assert album.title == "Test Album"
```

### Mock vs Real Implementations

Each service includes both **real** and **mock** implementations:

- **Real**: Uses SQLAlchemy with actual database
- **Mock**: Uses in-memory data for fast testing

```python
# Real implementation (production)
album_service = AlbumAlchemyService(
    album_repository=AlbumAlchemyRepository()
)

# Mock implementation (testing)
album_service = MockAlbumService(
    album_repository=MockAlbumRepository()
)
```

## 🐳 Docker Support

The project is fully containerized with Docker support.

### Individual Service Containers

Each service has its own `Dockerfile`:

```dockerfile
# Example: album_service/Dockerfile
FROM python:3.13-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY album_service/ ./backend/album_service/
COPY database/ ./backend/database/

# Set environment
ENV PYTHONPATH=/app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# Start command
EXPOSE 8001
CMD ["uvicorn", "backend.album_service.app:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Docker Compose

Multi-container orchestration with service discovery:

```yaml
# docker-compose.yml (simplified)
version: '3.8'
services:
  user-service:
    build:
      context: ./backend
      dockerfile: user_service/Dockerfile
    ports:
      - "8003:8003"
    environment:
      - DATABASE_URL=${DATABASE_URL}
    networks:
      - music-network

  auth-service:
    build:
      context: ./backend
      dockerfile: auth_service/Dockerfile
    ports:
      - "8000:8000"
    depends_on:
      - user-service
    environment:
      - USER_SERVICE_URL=http://user-service:8003
    networks:
      - music-network

networks:
  music-network:
    driver: bridge
```

### Container Features

- **Multi-stage builds** for optimized image sizes
- **Non-root user** for security
- **Health checks** for monitoring
- **Environment variable injection** for configuration
- **Service discovery** via Docker networking

## 💻 Development Guidelines

### Code Organization

Following **Clean Architecture** principles:

```python
# ✅ Good: Clear separation of concerns
class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo  # Dependency injection
        
    def create_user(self, user_input: UserInput) -> User:
        # Business logic here
        if self.repo.email_exists(user_input.email):
            raise ValueError("Email already exists")
        return self.repo.create(user_input)

# ❌ Bad: Mixed concerns
class UserService:
    def create_user(self, user_input):
        # Database logic mixed with business logic
        session = Session()
        if session.query(User).filter_by(email=user_input.email).first():
            raise ValueError("Email exists")
        user = User(**user_input.dict())
        session.add(user)
        session.commit()
        return user
```

### Naming Conventions

- **Files**: `snake_case.py`
- **Classes**: `PascalCase`
- **Functions/Variables**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`
- **Private members**: `_underscore_prefix`

### Error Handling

```python
# Custom exceptions for domain-specific errors
class UserNotFoundError(Exception):
    """Raised when a user cannot be found."""
    pass

# HTTP exception mapping in routers
@router.get("/users/{user_id}")
def get_user(user_id: int):
    try:
        return user_service.get_user_by_id(user_id)
    except UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
```

### Environment Configuration

```python
# Use environment variables for configuration
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-key")
```

### Testing Best Practices

- **Arrange-Act-Assert** pattern
- **Test isolation** with mocks/fixtures
- **Edge case coverage**
- **Integration tests** for critical paths

```python
def test_create_user_with_duplicate_email():
    # Arrange
    service = MockUserService()
    user_input = UserInput(email="test@example.com", username="test")
    service.create_new_user(user_input)  # Create first user
    
    # Act & Assert
    with pytest.raises(ValueError, match="Email already exists"):
        service.create_new_user(user_input)  # Attempt duplicate
```

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add tests for new functionality
   - Update documentation as needed

3. **Run tests**
   ```bash
   pytest
   make test  # If using Makefile
   ```

4. **Run linting**
   ```bash
   flake8 backend/
   black backend/  # Code formatting
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Convention

Using [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions/modifications
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

### Code Style

- **PEP 8** compliance
- **Type hints** for function parameters and return values
- **Docstrings** for public methods
- **Maximum line length**: 100 characters

```python
def create_user(
    self, 
    user_input: UserInputModel, 
    validate_email: bool = True
) -> UserModel:
    """
    Create a new user in the system.
    
    Args:
        user_input: User data for creation
        validate_email: Whether to validate email format
        
    Returns:
        Created user model
        
    Raises:
        ValueError: If email already exists or is invalid
    """
    pass
```

---

## 📊 Project Statistics

- **4 Microservices** with independent deployment
- **26+ Test Files** with comprehensive coverage
- **Clean Architecture** with 5+ distinct layers
- **JWT Authentication** with role-based authorization
- **Docker Support** with multi-container orchestration
- **SQL Server Integration** with SQLAlchemy ORM
- **RESTful APIs** with OpenAPI documentation

---

## 🏆 Key Features

✅ **Microservices Architecture**  
✅ **Clean Code & SOLID Principles**  
✅ **Comprehensive Testing Suite**  
✅ **Docker Containerization**  
✅ **JWT Authentication & Authorization**  
✅ **Database ORM with SQLAlchemy**  
✅ **API Documentation with OpenAPI**  
✅ **Environment-based Configuration**  
✅ **Mock Implementations for Testing**  
✅ **Inter-service Communication**  

---

**Built with ❤️ by [Matthew Hughes](https://github.com/Matthew-Hughes3488)**

For questions or contributions, please open an issue or submit a pull request!
