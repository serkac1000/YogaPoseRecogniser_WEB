# Yoga Pose Recognizer App

An innovative yoga application available in two versions: a mobile application using MIT App Inventor and a web application using modern web technologies. Both leverage Teachable Machine AI to provide an intelligent, interactive yoga learning experience for practitioners of all levels.

## Features

- Real-time yoga pose recognition using AI models
- Sequential pose practice mode to guide users through yoga sequences
- Visual feedback with animated elements for successful poses
- Confidence threshold display
- Cross-platform support (mobile app and browser-based web app)

## Technologies Used

### Mobile Version
- MIT App Inventor framework
- Teachable Machine AI for pose recognition
- TensorFlow Lite for mobile inference
- Custom UI elements for enhanced user experience

### Web Version
- Modern JavaScript/TypeScript with React
- TensorFlow.js for in-browser AI inference
- Responsive UI with Tailwind CSS
- Express.js backend for serving the application

## Getting Started

### Mobile App Version (MIT App Inventor)
1. Download the latest `.aia` file from the Releases section
2. Import the file into MIT App Inventor (ai2.appinventor.mit.edu)
3. Test the app in the emulator or on your device
4. Follow the on-screen instructions to start practicing yoga poses

**Note:** If you encounter blocks loading issues, please refer to the `Blocks_Loading_Fix_Guide.md` or try the Web App version instead.

### Web Application Version
1. Download the `YogaPoseRecognizer_Web.zip` file from the Releases section
2. Extract the zip file to a location on your computer
3. Install dependencies with `npm install`
4. Start the development server with `npm run dev`
5. Open your browser and navigate to `http://localhost:5000`

For detailed web app installation instructions, see `WEB_APP_README.md`.

## Releases

- v1.1.1: Added debug version and web application alternative
- v1.0.1: Maintenance release with fixed block code and enhanced stability
- v1.0.0: Initial release with core features

## License

This project is licensed under the MIT License - see the LICENSE file for details.