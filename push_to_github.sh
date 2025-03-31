#!/bin/bash

# Script to push the Yoga Pose Recognizer to GitHub
# This script uses the GITHUB_TOKEN environment variable for authentication

# Configuration
GITHUB_USER="serkac1000"
REPO_NAME="YogaPoseRecogniser_WEB"
BRANCH="main"
GITHUB_REPO_URL="https://$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"

# Ensure the script stops on errors
set -e

echo "=== Preparing Yoga Pose Recognizer for GitHub ==="

# Set Git identity (using generic info since we're using token auth)
git config --global user.name "GitHub Actions"
git config --global user.email "actions@github.com"

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
git commit -m "Release 2.0: Added 3-2-1 countdown animation and mirroring"

# Add remote origin if not already added
if ! git remote | grep -q origin; then
  echo "Adding remote origin..."
  git remote add origin $GITHUB_REPO_URL
else
  echo "Remote origin already exists, updating URL to use token..."
  git remote set-url origin $GITHUB_REPO_URL
fi

# Push to GitHub using token
echo "Pushing to GitHub repository..."
git push -u origin $BRANCH --force

echo "=== Push to GitHub completed! ==="
echo "Visit your repository at: https://github.com/$GITHUB_USER/$REPO_NAME"