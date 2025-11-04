#!/usr/bin/env python3
"""
Build script for Capacity Management application.
Builds the React frontend and prepares the project for deployment.
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path


def run_command(command: list[str], cwd: Path = None) -> bool:
    """Run a shell command and return success status"""
    try:
        print(f"Running: {' '.join(command)}")
        result = subprocess.run(
            command,
            cwd=cwd,
            check=True,
            capture_output=True,
            text=True
        )
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error: Command failed with exit code {e.returncode}")
        if e.stdout:
            print(e.stdout)
        if e.stderr:
            print(e.stderr)
        return False


def main():
    """Main build process"""
    print("=" * 60)
    print("Building Capacity Management Application")
    print("=" * 60)

    # Get project root directory
    project_root = Path(__file__).parent
    frontend_dir = project_root / "frontend"
    backend_dir = project_root / "backend"
    static_dir = backend_dir / "static"

    # Step 1: Install frontend dependencies
    print("\n[1/4] Installing frontend dependencies...")
    if not (frontend_dir / "node_modules").exists():
        if not run_command(["npm", "install"], cwd=frontend_dir):
            print("Failed to install frontend dependencies")
            return 1
    else:
        print("Frontend dependencies already installed")

    # Step 2: Build React app
    print("\n[2/4] Building React application...")
    if not run_command(["npm", "run", "build"], cwd=frontend_dir):
        print("Failed to build React application")
        return 1

    # Step 3: Copy static files to backend
    print("\n[3/4] Copying static files to backend...")
    dist_dir = frontend_dir / "dist"
    if not dist_dir.exists():
        print(f"Error: Build output directory not found: {dist_dir}")
        return 1

    # Remove existing static directory
    if static_dir.exists():
        print(f"Removing existing static directory: {static_dir}")
        shutil.rmtree(static_dir)

    # Copy dist to static
    print(f"Copying {dist_dir} to {static_dir}")
    shutil.copytree(dist_dir, static_dir)

    # Step 4: Verify backend dependencies
    print("\n[4/4] Verifying backend dependencies...")
    requirements_file = backend_dir / "requirements.txt"
    if not requirements_file.exists():
        print(f"Error: requirements.txt not found: {requirements_file}")
        return 1

    print("Backend requirements:")
    with open(requirements_file) as f:
        print(f.read())

    print("\n" + "=" * 60)
    print("Build completed successfully!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. To run locally:")
    print("   - Backend: cd backend && python app.py")
    print("   - Frontend dev: cd frontend && npm run dev")
    print("\n2. To deploy to Databricks:")
    print("   - python deploy_to_databricks.py")
    print("=" * 60)

    return 0


if __name__ == "__main__":
    sys.exit(main())
