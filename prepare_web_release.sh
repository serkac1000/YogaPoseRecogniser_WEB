#!/bin/bash

# Script to prepare the web application for release
# Creates a clean release package with only necessary files

# Set version
VERSION="4.0.0"
RELEASE_DIR="release_v4.0.0"

# Create release directory if it doesn't exist
mkdir -p $RELEASE_DIR

# Copy necessary files
echo "Copying project files..."

# Core application files
cp -r client $RELEASE_DIR/
cp -r server $RELEASE_DIR/
cp -r shared $RELEASE_DIR/

# Configuration files
cp package.json $RELEASE_DIR/
cp tsconfig.json $RELEASE_DIR/
cp vite.config.ts $RELEASE_DIR/
cp tailwind.config.ts $RELEASE_DIR/
cp postcss.config.js $RELEASE_DIR/
cp drizzle.config.ts $RELEASE_DIR/
cp theme.json $RELEASE_DIR/

# Documentation
cp README.md $RELEASE_DIR/
cp RELEASE_NOTES.md $RELEASE_DIR/
cp WEB_APP_README.md $RELEASE_DIR/

# Create simplified .gitignore
cat > $RELEASE_DIR/.gitignore << EOL
node_modules/
.env
.DS_Store
*.log
dist/
build/
.cache/
EOL

# Create a zip archive
echo "Creating zip archive..."
cd $RELEASE_DIR
zip -r ../YogaPoseRecognizer_Web_v${VERSION}.zip .
cd ..

echo "Release package created successfully!"
echo "Files are in the $RELEASE_DIR directory"
echo "Zip archive is available at YogaPoseRecognizer_Web_v${VERSION}.zip"