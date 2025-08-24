# ==============================================================================
# MAKEFILE FOR MUSIC PLAYER DOCKER COMPOSE
# ==============================================================================
# This Makefile provides convenient commands for managing your containerized
# music player application. Run 'make help' to see all available commands.

# Define variables
COMPOSE_FILE = docker-compose.yml
PROJECT_NAME = music-player
ENV_FILE = .env

# Default target when you just run 'make'
.DEFAULT_GOAL := help

# ==============================================================================
# SETUP COMMANDS
# ==============================================================================

.PHONY: setup
setup: ## First-time setup: copy env file and build services
	@echo "🚀 Setting up Music Player development environment..."
	@if [ ! -f .env ]; then \
		cp .env.example .env && \
		echo "📝 Created .env file from .env.example"; \
		echo "⚠️  Please edit .env with your actual values!"; \
	else \
		echo "📝 .env file already exists"; \
	fi
	@make build
	@echo "✅ Setup complete! Run 'make up' to start services."

.PHONY: build
build: ## Build all service images
	@echo "🔨 Building all service images..."
	docker-compose -f $(COMPOSE_FILE) build

.PHONY: build-no-cache
build-no-cache: ## Build all service images without cache
	@echo "🔨 Building all service images (no cache)..."
	docker-compose -f $(COMPOSE_FILE) build --no-cache

# ==============================================================================
# SERVICE MANAGEMENT
# ==============================================================================

.PHONY: up
up: ## Start all services in foreground
	@echo "🚀 Starting all services..."
	docker-compose -f $(COMPOSE_FILE) up

.PHONY: up-d
up-d: ## Start all services in background
	@echo "🚀 Starting all services in background..."
	docker-compose -f $(COMPOSE_FILE) up -d
	@make status

.PHONY: down
down: ## Stop all services
	@echo "🛑 Stopping all services..."
	docker-compose -f $(COMPOSE_FILE) down

.PHONY: restart
restart: ## Restart all services
	@echo "🔄 Restarting all services..."
	docker-compose -f $(COMPOSE_FILE) restart

.PHONY: stop
stop: ## Stop all services (without removing containers)
	@echo "⏸️  Stopping all services..."
	docker-compose -f $(COMPOSE_FILE) stop

.PHONY: start
start: ## Start previously stopped services
	@echo "▶️  Starting services..."
	docker-compose -f $(COMPOSE_FILE) start

# ==============================================================================
# INDIVIDUAL SERVICE MANAGEMENT
# ==============================================================================

.PHONY: user-service
user-service: ## Start only user service and its dependencies
	@echo "🚀 Starting user service..."
	docker-compose -f $(COMPOSE_FILE) up user-service

.PHONY: auth-service
auth-service: ## Start only auth service and its dependencies
	@echo "🔐 Starting auth service..."
	docker-compose -f $(COMPOSE_FILE) up auth-service

.PHONY: album-service
album-service: ## Start only album service and its dependencies
	@echo "💿 Starting album service..."
	docker-compose -f $(COMPOSE_FILE) up album-service

.PHONY: song-service
song-service: ## Start only song service and its dependencies
	@echo "🎵 Starting song service..."
	docker-compose -f $(COMPOSE_FILE) up song-service

# ==============================================================================
# MONITORING AND DEBUGGING
# ==============================================================================

.PHONY: status
status: ## Show status of all services
	@echo "📊 Service status:"
	@docker-compose -f $(COMPOSE_FILE) ps

.PHONY: logs
logs: ## Show logs from all services
	@echo "📜 Showing logs from all services..."
	docker-compose -f $(COMPOSE_FILE) logs

.PHONY: logs-f
logs-f: ## Follow logs from all services in real-time
	@echo "📜 Following logs from all services..."
	docker-compose -f $(COMPOSE_FILE) logs -f

.PHONY: logs-user
logs-user: ## Show logs from user service
	@docker-compose -f $(COMPOSE_FILE) logs user-service

.PHONY: logs-auth
logs-auth: ## Show logs from auth service
	@docker-compose -f $(COMPOSE_FILE) logs auth-service

.PHONY: logs-album
logs-album: ## Show logs from album service
	@docker-compose -f $(COMPOSE_FILE) logs album-service

.PHONY: logs-song
logs-song: ## Show logs from song service
	@docker-compose -f $(COMPOSE_FILE) logs song-service

# ==============================================================================
# HEALTH CHECKS AND TESTING
# ==============================================================================

.PHONY: health
health: ## Check health of all services
	@echo "🏥 Checking service health..."
	@echo "User Service (8003):"
	@curl -s http://localhost:8003/health || echo "❌ User service not responding"
	@echo ""
	@echo "Auth Service (8000):"
	@curl -s http://localhost:8000/health || echo "❌ Auth service not responding"
	@echo ""
	@echo "Album Service (8001):"
	@curl -s http://localhost:8001/health || echo "❌ Album service not responding"
	@echo ""
	@echo "Song Service (8002):"
	@curl -s http://localhost:8002/health || echo "❌ Song service not responding"
	@echo ""

.PHONY: test-endpoints
test-endpoints: ## Test basic endpoints of all services
	@echo "🧪 Testing service endpoints..."
	@echo "Testing User Service..."
	@curl -s -X GET http://localhost:8003/users | head -c 100 || echo "❌ Failed"
	@echo ""
	@echo "Testing Album Service..."
	@curl -s -X GET http://localhost:8001/albums | head -c 100 || echo "❌ Failed"
	@echo ""
	@echo "Testing Song Service..."
	@curl -s -X GET http://localhost:8002/songs | head -c 100 || echo "❌ Failed"
	@echo ""

# ==============================================================================
# SHELL ACCESS
# ==============================================================================

.PHONY: shell-user
shell-user: ## Open shell in user service container
	@echo "🐚 Opening shell in user service container..."
	docker-compose -f $(COMPOSE_FILE) exec user-service bash

.PHONY: shell-auth
shell-auth: ## Open shell in auth service container
	@echo "🐚 Opening shell in auth service container..."
	docker-compose -f $(COMPOSE_FILE) exec auth-service bash

.PHONY: shell-album
shell-album: ## Open shell in album service container
	@echo "🐚 Opening shell in album service container..."
	docker-compose -f $(COMPOSE_FILE) exec album-service bash

.PHONY: shell-song
shell-song: ## Open shell in song service container
	@echo "🐚 Opening shell in song service container..."
	docker-compose -f $(COMPOSE_FILE) exec song-service bash

# ==============================================================================
# CLEANUP COMMANDS
# ==============================================================================

.PHONY: clean
clean: ## Stop services and remove containers
	@echo "🧹 Cleaning up containers..."
	docker-compose -f $(COMPOSE_FILE) down

.PHONY: clean-volumes
clean-volumes: ## Stop services and remove containers and volumes
	@echo "🧹 Cleaning up containers and volumes..."
	@echo "⚠️  This will delete all data in Docker volumes!"
	@read -p "Are you sure? [y/N] " -n 1 -r && echo && \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose -f $(COMPOSE_FILE) down -v; \
	else \
		echo "Cancelled."; \
	fi

.PHONY: clean-images
clean-images: ## Remove all built images for this project
	@echo "🧹 Removing project images..."
	@docker images --format "table {{.Repository}}:{{.Tag}}\t{{.ID}}" | grep music | awk '{print $$2}' | xargs -r docker rmi

.PHONY: clean-all
clean-all: ## Nuclear option: remove everything related to this project
	@echo "💥 Removing everything related to this project..."
	@echo "⚠️  This will delete containers, volumes, networks, and images!"
	@read -p "Are you absolutely sure? [y/N] " -n 1 -r && echo && \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose -f $(COMPOSE_FILE) down -v --remove-orphans; \
		make clean-images; \
		docker network rm music-player-network 2>/dev/null || true; \
	else \
		echo "Cancelled."; \
	fi

# ==============================================================================
# DEVELOPMENT HELPERS
# ==============================================================================

.PHONY: rebuild-service
rebuild-service: ## Rebuild specific service (usage: make rebuild-service SERVICE=user-service)
	@if [ -z "$(SERVICE)" ]; then \
		echo "❌ Please specify SERVICE. Example: make rebuild-service SERVICE=user-service"; \
		exit 1; \
	fi
	@echo "🔨 Rebuilding $(SERVICE)..."
	docker-compose -f $(COMPOSE_FILE) build $(SERVICE)
	docker-compose -f $(COMPOSE_FILE) up -d $(SERVICE)

.PHONY: scale
scale: ## Scale a service (usage: make scale SERVICE=song-service REPLICAS=3)
	@if [ -z "$(SERVICE)" ] || [ -z "$(REPLICAS)" ]; then \
		echo "❌ Please specify SERVICE and REPLICAS. Example: make scale SERVICE=song-service REPLICAS=3"; \
		exit 1; \
	fi
	@echo "📈 Scaling $(SERVICE) to $(REPLICAS) replicas..."
	docker-compose -f $(COMPOSE_FILE) up -d --scale $(SERVICE)=$(REPLICAS)

.PHONY: config
config: ## Validate and view the compose configuration
	@echo "⚙️  Docker Compose configuration:"
	docker-compose -f $(COMPOSE_FILE) config

# ==============================================================================
# HELP
# ==============================================================================

.PHONY: help
help: ## Show this help message
	@echo "🎵 Music Player Docker Compose Commands"
	@echo "========================================"
	@echo ""
	@echo "Quick Start:"
	@echo "  make setup    # First-time setup"
	@echo "  make up-d     # Start services in background"
	@echo "  make health   # Check if services are running"
	@echo "  make down     # Stop services"
	@echo ""
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# ==============================================================================
# EXAMPLES OF USAGE
# ==============================================================================
#
# First time setup:
#   make setup
#   edit .env file with your database credentials
#   make up-d
#   make health
#
# Daily development workflow:
#   make up-d          # Start services
#   make logs-f        # Watch logs while developing
#   make health        # Check if everything is working
#   make down          # Stop when done
#
# When you change code:
#   make rebuild-service SERVICE=user-service
#   make logs-user     # Check logs for that service
#
# Debugging a service:
#   make shell-user    # Get a bash shell inside the container
#   make logs-user     # Check recent logs
#
# Clean slate restart:
#   make clean
#   make build
#   make up-d
