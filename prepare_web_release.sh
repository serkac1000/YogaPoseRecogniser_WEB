#!/bin/bash

# Script to prepare the yoga pose recognizer web app for GitHub

# Create the dist directory if it doesn't exist
mkdir -p dist

# Build the application
echo "Building the application..."
npm run build

# Copy necessary files to the dist directory
echo "Copying files to dist directory..."
cp -r dist/* dist/
cp README.md dist/
cp package.json dist/
cp -r client/index.html dist/
cp -r client/src/assets dist/assets

echo "Project prepared for GitHub release!"
echo "You can now push the contents to your repository."