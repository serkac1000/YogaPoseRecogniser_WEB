# YogaPoseRecognizer v2.0 Release Notes

This major feature release adds significant improvements to the web application version of YogaPoseRecognizer, focusing on user experience and visual feedback.

## New Features

- **3-2-1 Countdown Animation**: When a pose is recognized with more than 50% confidence, a 3-2-1 countdown animation is displayed before advancing to the next pose
- **Camera View Mirroring**: The camera view is now mirrored (left hand appears on left side) for more intuitive pose matching
- **Progress Bar**: Visual progress indicator during the countdown animation
- **Enhanced Star Animation**: Improved the star animation visibility when poses are recognized
- **Sequential Pose Advancement**: Automatically cycles through poses (Pose 1 → Pose 2 → Pose 3 → Pose 1) when current pose is recognized with confidence ≥ 50%

## UI Improvements

- Improved confidence level indicator for clearer feedback during practice
- Better visual organization of pose information and camera display
- Stop recognition button to pause at any time
- Settings button more accessible for quicker configuration changes

## Previous Release (v1.0.1) Fixes

- Repaired corrupted blocks code in Screen1.bky file that prevented proper loading in MIT App Inventor
- Resolved layout issues with the star animation when displayed on different screen sizes
- Fixed camera permission handling for better first-run experience

## Web Application Features

The web version (v2.0) now has feature parity with the MIT App Inventor version and additional improvements:

- Uses React and TensorFlow.js for improved performance
- Responsive design that works on mobile, tablet, and desktop devices
- Persistent storage for settings and custom pose images
- Custom model URL configuration for using your own Teachable Machine models

## Installation Instructions

### Web Application
1. Visit the deployed application at https://github.com/serkac1000/YogaPoseRecogniser_WEB
2. No installation needed - works directly in browser on any device

### MIT App Inventor Version
1. Download the YogaPoseRecognizer.aia file from this release
2. Open MIT App Inventor (ai2.appinventor.mit.edu)
3. Go to Projects > Import project (.aia) from my computer
4. Select the downloaded YogaPoseRecognizer.aia file
5. The project will open and can be immediately tested or modified