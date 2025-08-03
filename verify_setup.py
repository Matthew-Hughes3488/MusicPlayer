#!/usr/bin/env python3
"""
Backend Setup Verification Script
Run this script to verify your MusicPlayer backend setup is correct.
"""

import sys
import os

def test_imports():
    """Test that all services can be imported correctly."""
    print("🔍 Testing service imports...")
    
    try:
        # Add project root to Python path
        project_root = os.path.dirname(os.path.abspath(__file__))
        sys.path.insert(0, project_root)
        
        # Test auth service
        print("  - Auth Service...", end=" ")
        from backend.auth_service.app import app as auth_app
        print("✅")
        
        # Test user service
        print("  - User Service...", end=" ")
        from backend.user_service.app import app as user_app
        print("✅")
        
        # Test song service
        print("  - Song Service...", end=" ")
        from backend.song_service.app import app as song_app
        print("✅")
        
        # Test album service
        print("  - Album Service...", end=" ")
        from backend.album_service.app import app as album_app
        print("✅")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import Error: {e}")
        return False

def check_dependencies():
    """Check if all required dependencies are installed."""
    print("\n📦 Checking dependencies...")
    
    required_packages = [
        'fastapi',
        'uvicorn',
        'sqlalchemy',
        'pydantic',
        'dotenv',  # python-dotenv
        'bcrypt',
        'pymysql',
        'pytest',
        'jose'  # python-jose
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"  - {package}... ✅")
        except ImportError:
            print(f"  - {package}... ❌")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n⚠️  Missing packages: {', '.join(missing_packages)}")
        print("Run: pip install -r backend/requirements.txt")
        return False
    
    return True

def check_environment():
    """Check if environment variables are configured."""
    print("\n🔧 Checking environment configuration...")
    
    # Check if .env file exists
    env_file = os.path.join(os.path.dirname(__file__), 'backend', '.env')
    if os.path.exists(env_file):
        print("  - .env file... ✅")
    else:
        print("  - .env file... ⚠️  (Create .env file with database credentials)")
    
    # Check critical environment variables
    critical_vars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME']
    for var in critical_vars:
        if os.getenv(var):
            print(f"  - {var}... ✅")
        else:
            print(f"  - {var}... ⚠️  (Set in .env file)")

def main():
    """Run all verification tests."""
    print("🎵 MusicPlayer Backend Setup Verification")
    print("=" * 45)
    
    # Test imports
    imports_ok = test_imports()
    
    # Check dependencies
    deps_ok = check_dependencies()
    
    # Check environment
    check_environment()
    
    print("\n" + "=" * 45)
    
    if imports_ok and deps_ok:
        print("✅ Setup verification completed successfully!")
        print("\nYou can now start the services:")
        print("  python -m uvicorn backend.auth_service.app:app --reload --port 8001")
        print("  python -m uvicorn backend.user_service.app:app --reload --port 8002")
        print("  python -m uvicorn backend.song_service.app:app --reload --port 8003")
        print("  python -m uvicorn backend.album_service.app:app --reload --port 8004")
        
        return 0
    else:
        print("❌ Setup verification failed!")
        print("Please check the errors above and refer to the README.md for setup instructions.")
        return 1

if __name__ == "__main__":
    sys.exit(main())