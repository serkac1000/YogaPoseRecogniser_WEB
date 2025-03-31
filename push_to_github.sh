#!/bin/bash

# Script to push the Yoga Pose Recognizer to GitHub
# This script assumes you have Git installed and configured

# Configuration
GITHUB_REPO="https://github.com/serkac1000/YogaPoseRecogniser_WEB.git"
BRANCH="main"

# Ensure the script stops on errors
set -e

echo "=== Preparing Yoga Pose Recognizer for GitHub ==="

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
  echo "Git repository initialized."
else
  echo "Git repository already initialized."
fi

# Add all files
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit: Yoga Pose Recognizer Web Application"

# Add remote origin if not already added
if ! git remote | grep -q origin; then
  echo "Adding remote origin..."
  git remote add origin $GITHUB_REPO
else
  echo "Remote origin already exists."
fi

# Push to GitHub
echo "Pushing to GitHub repository..."
git push -u origin $BRANCH

echo "=== Push to GitHub completed! ==="
echo "Visit your repository at: $GITHUB_REPO"