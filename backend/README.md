# MusicPlayer Backend

A microservices-based music streaming backend built with FastAPI, featuring user management, authentication, song management, and album organization.

## 🏗️ Architecture

This backend follows a **microservices architecture** with four main services:

```
backend/
├── auth_service/       # Authentication & Authorization
├── user_service/       # User Management
├── song_service/       # Song Management
├── album_service/      # Album Management
├── database/          # Shared Database Layer
└── requirements.txt   # Dependencies
```

### Service Overview

| Service | Purpose | Port | Key Features |
|---------|---------|------|--------------|
| **auth_service** | Authentication & JWT management | - | Login, registration, token validation |
| **user_service** | User CRUD operations | - | User profiles, preferences, user data |
| **song_service** | Song management | - | Song metadata, upload, streaming endpoints |
| **album_service** | Album organization | - | Album creation, song grouping, metadata |

## 🛠️ Technology Stack

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast Python web framework
- **Database:** MySQL with [SQLAlchemy 2.0](https://www.sqlalchemy.org/) ORM
- **Authentication:** JWT tokens with [bcrypt](https://pypi.org/project/bcrypt/) password hashing
- **Testing:** [pytest](https://pytest.org/) with async support
- **Server:** [uvicorn](https://www.uvicorn.org/) ASGI server
- **Validation:** [Pydantic](https://pydantic.dev/) for data validation
- **Environment:** [python-dotenv](https://pypi.org/project/python-dotenv/) for configuration

## 📋 Prerequisites

- Python 3.9+
- MySQL 5.7+ or 8.0+
- pip (Python package manager)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Note:** The project uses relative imports that require the Python path to be set correctly. Run all commands from the project root directory.

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=musicplayer_db

# Optional: Full database URL (overrides individual settings)
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/musicplayer_db

# JWT Configuration
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Database Setup

The application will automatically create tables on startup. Ensure your MySQL server is running and the database exists:

```sql
CREATE DATABASE musicplayer_db;
```

### 4. Running Services

Each service can be run independently. **Important:** All commands should be run from the project root directory to ensure proper module imports.

#### Auth Service
```bash
# From project root directory
export PYTHONPATH=$(pwd):$PYTHONPATH
cd backend/auth_service
uvicorn app:app --reload --port 8001
```

#### User Service
```bash
# From project root directory
export PYTHONPATH=$(pwd):$PYTHONPATH
cd backend/user_service
uvicorn app:app --reload --port 8002
```

#### Song Service
```bash
# From project root directory
export PYTHONPATH=$(pwd):$PYTHONPATH
cd backend/song_service
uvicorn app:app --reload --port 8003
```

#### Album Service
```bash
# From project root directory
export PYTHONPATH=$(pwd):$PYTHONPATH
cd backend/album_service
uvicorn app:app --reload --port 8004
```

Alternatively, you can run services using Python module syntax from the project root:

```bash
# From project root directory
python -m uvicorn backend.auth_service.app:app --reload --port 8001
python -m uvicorn backend.user_service.app:app --reload --port 8002
python -m uvicorn backend.song_service.app:app --reload --port 8003
python -m uvicorn backend.album_service.app:app --reload --port 8004
```

### Quick Setup Script

For convenience, you can create a setup script to start all services:

```bash
#!/bin/bash
# save as start_services.sh in project root

export PYTHONPATH=$(pwd):$PYTHONPATH

echo "Starting MusicPlayer Backend Services..."

# Start services in background
python -m uvicorn backend.auth_service.app:app --reload --port 8001 &
python -m uvicorn backend.user_service.app:app --reload --port 8002 &
python -m uvicorn backend.song_service.app:app --reload --port 8003 &
python -m uvicorn backend.album_service.app:app --reload --port 8004 &

echo "Services started on ports 8001-8004"
echo "API Documentation available at:"
echo "  - Auth Service:  http://localhost:8001/docs"
echo "  - User Service:  http://localhost:8002/docs"
echo "  - Song Service:  http://localhost:8003/docs"
echo "  - Album Service: http://localhost:8004/docs"
```

## 📚 API Documentation

Each service provides interactive API documentation via FastAPI's automatic Swagger UI:

- Auth Service: `http://localhost:8001/docs`
- User Service: `http://localhost:8002/docs`
- Song Service: `http://localhost:8003/docs`
- Album Service: `http://localhost:8004/docs`

### Core Endpoints

#### Authentication Service (`/auth`)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login (returns JWT token)
- `POST /auth/refresh` - Refresh JWT token
- `GET /auth/verify` - Verify token validity

#### User Service (`/users`)
- `GET /users` - Get all users
- `GET /users/{user_id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{user_id}` - Update user
- `DELETE /users/{user_id}` - Delete user

#### Song Service (`/songs`)
- `GET /songs` - Get all songs
- `GET /songs/{song_id}` - Get song by ID
- `POST /songs` - Create/upload new song
- `PUT /songs/{song_id}` - Update song metadata
- `DELETE /songs/{song_id}` - Delete song

#### Album Service (`/albums`)
- `GET /albums` - Get all albums
- `GET /albums/{album_id}` - Get album by ID
- `POST /albums` - Create new album
- `PUT /albums/{album_id}` - Update album
- `DELETE /albums/{album_id}` - Delete album

## 🗄️ Database Schema

The application uses SQLAlchemy models with the following main entities:

- **User** - User accounts and profiles
- **Song** - Individual song metadata and file references
- **Album** - Album information and song collections
- **UserLikes** - User song preferences (many-to-many)
- **AlbumSongs** - Album-song relationships (many-to-many)

### Key Relationships
- Users can like multiple songs (Many-to-Many)
- Albums contain multiple songs (Many-to-Many)
- Users can create playlists (if implemented)

## 🧪 Testing

### Running Tests

**Important:** Run all tests from the project root directory with proper Python path configuration.

```bash
# Set Python path (from project root)
export PYTHONPATH=$(pwd):$PYTHONPATH

# Run all tests
python -m pytest backend/

# Run tests for specific service
python -m pytest backend/user_service/tests/ -v
python -m pytest backend/song_service/tests/ -v
python -m pytest backend/album_service/tests/ -v
python -m pytest backend/database/tests/ -v

# Run tests with coverage
python -m pytest backend/ --cov=backend --cov-report=html
```

### Test Structure

Each service includes:
- **Unit tests** for repositories and services
- **Integration tests** for API endpoints
- **Mock data** for testing scenarios

## 🔧 Development

### Project Structure

Each service follows the same architectural pattern:

```
service_name/
├── app.py              # FastAPI application entry point
├── routers/            # API route definitions
├── services/           # Business logic layer
├── repos/             # Data access layer (Repository pattern)
├── models/            # Pydantic models for API
├── errors_exceptions/ # Custom exceptions
├── utils/             # Utility functions
├── tests/             # Test files
└── mock_data/         # Test data
```

### Adding New Features

1. **Models**: Define Pydantic models in `models/`
2. **Repository**: Implement data access in `repos/`
3. **Service**: Add business logic in `services/`
4. **Router**: Create API endpoints in `routers/`
5. **Tests**: Write tests in `tests/`

### Code Style

- Follow [PEP 8](https://pep8.org/) Python style guide
- Use type hints for all function parameters and returns
- Document functions with docstrings
- Keep services loosely coupled

## 🔐 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless token-based authentication
- **Input Validation**: Pydantic models validate all input data
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **CORS Configuration**: Configurable cross-origin resource sharing

## 🚀 Deployment

### Environment Variables for Production

```env
# Database
DATABASE_URL=mysql+pymysql://user:password@db-host:3306/musicplayer_prod

# Security
JWT_SECRET_KEY=your-strong-secret-key
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application
ENVIRONMENT=production
DEBUG=false
```

### Docker Support (Future Enhancement)

Consider containerizing each service:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the project structure
4. Add tests for new functionality
5. Ensure all tests pass (`python -m pytest`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📝 API Usage Examples

### Authentication Flow

```python
import requests

# Register new user
response = requests.post("http://localhost:8001/auth/register", json={
    "username": "newuser",
    "email": "user@example.com",
    "password": "securepassword"
})

# Login to get token
response = requests.post("http://localhost:8001/auth/login", json={
    "username": "newuser",
    "password": "securepassword"
})
token = response.json()["access_token"]

# Use token for authenticated requests
headers = {"Authorization": f"Bearer {token}"}
response = requests.get("http://localhost:8002/users", headers=headers)
```

### Adding Songs and Albums

```python
# Create a song
song_data = {
    "title": "My Song",
    "artist": "Artist Name",
    "duration": 180,
    "file_path": "/path/to/song.mp3"
}
response = requests.post("http://localhost:8003/songs", json=song_data, headers=headers)

# Create an album
album_data = {
    "name": "My Album",
    "artist": "Artist Name",
    "release_date": "2024-01-01"
}
response = requests.post("http://localhost:8004/albums", json=album_data, headers=headers)
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check connection credentials in `.env`
   - Ensure database exists

2. **Module Import Errors**
   - Ensure you're running commands from the project root directory
   - Set PYTHONPATH: `export PYTHONPATH=$(pwd):$PYTHONPATH`
   - Use module syntax: `python -m uvicorn backend.service_name.app:app`

3. **Missing Dependencies**
   - Make sure all packages in requirements.txt are installed
   - Check for missing JWT library: `pip install python-jose[cryptography]`

4. **JWT Token Issues**
   - Verify `JWT_SECRET_KEY` is set
   - Check token expiration settings

5. **Pydantic Warnings**
   - You may see warnings about `orm_mode` being renamed to `from_attributes`
   - These are deprecation warnings and don't affect functionality
   - Consider updating model configurations to use `from_attributes=True`

### Logs

Each service logs important events. Check console output for debugging information.

## 📄 License

This project is part of the MusicPlayer application. See the main repository for license information.

---

For frontend documentation, see the `frontend/` directory.
For overall project information, see the main repository README.