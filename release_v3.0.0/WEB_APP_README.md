# Yoga Pose Recognizer - Web Application Version

This is the web application version of the Yoga Pose Recognizer, built with modern web technologies. The app provides the same core pose recognition functionality as the MIT App Inventor version but runs in any modern web browser.

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm (usually comes with Node.js)

### Installation Steps

1. **Download the code**
   - Download the YogaPoseRecognizer_Web.zip file from the GitHub repository
   - Extract the zip file to a location on your computer

2. **Install dependencies**
   ```bash
   # Navigate to the extracted folder
   cd YogaPoseRecognizer_Web
   
   # Install all required packages
   npm install
   ```

3. **Start the application**
   ```bash
   # Start the development server
   npm run dev
   ```

4. **Access the application**
   - Open your web browser
   - Navigate to `http://localhost:5000`
   - Allow camera access when prompted

## Deploying to Production

If you want to deploy the application to a production server:

1. **Build the application**
   ```bash
   # Create optimized production build
   npm run build
   ```

2. **Start the production server**
   ```bash
   # Start the server with the built files
   npm start
   ```

## System Requirements

### Browser Requirements
- Modern browser with WebRTC support (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Webcam access

### Minimum Hardware
- Any device with a front-facing camera (laptop, tablet, mobile phone)
- 4GB RAM recommended
- Modern CPU (2015 or newer)

## Using the Web Application

1. Allow camera access when prompted
2. The camera feed will appear in the center of the screen
3. Strike a yoga pose
4. The application will display the detected pose and confidence level
5. Follow the instructions for sequence mode to practice multiple poses in sequence

## Troubleshooting

### Camera Not Working
- Make sure your browser has permission to access the camera
- Try refreshing the page
- Check if your camera is being used by another application

### Performance Issues
- Close other tabs and applications to free up resources
- Try using a device with a faster processor
- Lower the resolution of the camera feed in settings

### Recognition Not Working
- Make sure you are in a well-lit environment
- Stand at a distance where your full body is visible
- Wear clothing that contrasts with the background

## Additional Resources

For more information about the yoga poses recognized by this application, refer to the included pose descriptions or visit yoga resources online for proper form and technique.

For developers interested in the technical implementation, see the `client/src/lib/yogaPoseModel.ts` file to understand how TensorFlow.js model integration works.