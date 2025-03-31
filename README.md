# YogaPoseRecognizer v3.0.0

An intelligent, interactive yoga learning experience using AI-powered pose recognition. This project provides both a mobile application built with MIT App Inventor and a cross-platform web alternative using modern web technologies.

## 🧘 Features

- **Real-time Pose Recognition**: Detects and identifies yoga poses using machine learning
- **Skeleton Visualization**: Displays a green skeleton overlay showing body joints and movement
- **Sequential Practice**: Automatically advances through a sequence of poses when recognized
- **Countdown Animation**: Provides a 3-2-1 countdown with progress bar between poses
- **Configurable Settings**: Customize model URL and comparison pose images
- **Persistent Storage**: Settings are saved between sessions
- **Demo Mode**: Continues to work with simulated skeleton animation when camera access is unavailable
- **Cross-Platform**: Works on mobile devices and desktop browsers

## 📱 MIT App Inventor Version

The original application is built using MIT App Inventor with the Teachable Machine extension:

- Easy-to-use drag-and-drop interface
- Built-in camera access for pose recognition
- No coding experience required to use
- Works on Android devices

### Files:
- `YogaPoseRecognizer.aia` - Main application file
- `YogaPoseRecognizer_Debug_v1.1.1.aia` - Debug version with additional logging
- `MIT_App_Inventor_Troubleshooting.md` - Help for common issues

## 🌐 Web Application Version

The web version provides an alternative implementation with enhanced features:

- Built with TypeScript, React, and TensorFlow.js
- Responsive design for mobile and desktop
- Advanced skeleton-based pose detection
- Improved visualization and feedback
- Persistent settings across sessions

### Running the Web App:
1. Clone this repository
2. Install dependencies: `npm install`
3. Start the application: `npm run dev`
4. Open your browser to http://localhost:5000

## 🔄 Release History

See [RELEASE_NOTES.md](RELEASE_NOTES.md) for detailed version history.

## 📖 Documentation

- [WEB_APP_README.md](WEB_APP_README.md) - Detailed web application instructions
- [MIT_App_Inventor_Project_Summary.md](MIT_App_Inventor_Project_Summary.md) - MIT App Inventor version details
- [MIT_App_Inventor_Troubleshooting.md](MIT_App_Inventor_Troubleshooting.md) - Troubleshooting guide

## 🚀 Deployment

### MIT App Inventor Version:
1. Download and import the `.aia` file into MIT App Inventor
2. Build the app using the MIT App Inventor builder
3. Install on your Android device

### Web Application Version:
1. Use the included `prepare_web_release.sh` script to create a release package
2. Deploy to any web server or hosting service
3. Access via a web browser on any device

## 🧪 Technologies

- MIT App Inventor framework
- Teachable Machine AI models
- TypeScript & React
- TensorFlow.js
- Tailwind CSS
- Vite