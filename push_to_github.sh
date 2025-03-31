#!/bin/bash

# Script to push YogaPoseRecognizer project to GitHub
# Requires GITHUB_TOKEN to be set in environment variables

# Check if GITHUB_TOKEN is available
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN environment variable is not set"
  echo "Please set your GitHub token as a secret in Replit."
  exit 1
fi

# Set GitHub repository information
REPO_NAME="YogaPoseRecognizer"
VERSION="v3.0.0"
COMMIT_MESSAGE="Release $VERSION: Added skeleton visualization and demo mode"

# Configure Git credentials using token
git config --global user.name "Replit User"
git config --global user.email "replituser@example.com"
git config --global credential.helper store
echo "https://oauth2:${GITHUB_TOKEN}@github.com" > ~/.git-credentials

# Initialize Git repository if not already initialized
if [ ! -d .git ]; then
  echo "Initializing Git repository..."
  git init
  
  # Create .gitignore file
  echo "Creating .gitignore file..."
  cat > .gitignore << EOL
node_modules/
.env
.DS_Store
*.log
dist/
build/
.cache/
EOL
fi

# Add all files to Git
echo "Adding files to Git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Check if remote origin exists, add if not
if ! git remote | grep -q "origin"; then
  echo "Adding remote origin..."
  git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
  echo "Please update the repository URL in this script with your actual GitHub username"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main || git push -u origin master

echo "Push completed!"
echo "Remember to replace 'YOUR_USERNAME' in the script with your actual GitHub username."
echo "Version $VERSION uploaded successfully."