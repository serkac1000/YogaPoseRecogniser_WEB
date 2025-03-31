#!/bin/bash

# Create release directory if it doesn't exist
mkdir -p releases/web_app

# Create a temporary directory for the web app files
mkdir -p temp_web_app

# Copy relevant files to the temporary directory
cp -r client temp_web_app/
cp -r server temp_web_app/
cp -r shared temp_web_app/
cp package.json temp_web_app/
cp tsconfig.json temp_web_app/
cp vite.config.ts temp_web_app/
cp postcss.config.js temp_web_app/
cp tailwind.config.ts temp_web_app/
cp theme.json temp_web_app/
cp drizzle.config.ts temp_web_app/
cp WEB_APP_README.md temp_web_app/README.md

# Create the zip file
cd temp_web_app
zip -r ../releases/web_app/YogaPoseRecognizer_Web_v1.1.zip .
cd ..

# Clean up
rm -rf temp_web_app

echo "Web application release created at releases/web_app/YogaPoseRecognizer_Web_v1.1.zip"