# Yoga Pose Recognizer - User Instructions

## Overview

This MIT App Inventor application uses the Teachable Machine extension to recognize yoga poses through your device's camera. The app can:

1. Detect three different yoga poses
2. Display a star animation when a pose is recognized
3. Track pose sequences in a guided practice mode
4. Show confidence levels for pose detection
5. Provide visual feedback for each recognized pose

## Installation Instructions

1. Download the `YogaPoseRecognizer.aia` file to your computer.
2. Go to [MIT App Inventor](https://ai2.appinventor.mit.edu).
3. Log in to your account (or create one if you don't have one).
4. Click on "Projects" and select "Import project (.aia) from my computer".
5. Choose the downloaded `YogaPoseRecognizer.aia` file and click "OK".
6. The project will open in the MIT App Inventor Designer view.

## How to Use the App

### Basic Pose Recognition

1. Connect your device using the MIT AI2 Companion app or build the app to your device.
2. When the app starts, press the "Start Recognition" button to activate the camera.
3. The app will automatically begin analyzing the camera feed for yoga poses.
4. When a pose is detected:
   - The name of the pose will be displayed at the top of the screen
   - A confidence percentage will be shown
   - A star animation will appear when confidence exceeds 50%
   - A reference image for the pose will be displayed

5. Use the "Toggle Camera" button to switch between front and rear cameras.

### Guided Sequence Mode

1. Press the "Start Pose Sequence" button to enter sequence mode.
2. The app will guide you through a sequence of poses (Pose 1 → Pose 2 → Pose 3 → Pose 1).
3. The "Next Pose" label shows which pose you should attempt next.
4. Hold each pose until it's recognized with sufficient confidence.
5. The app will automatically advance to the next pose in the sequence.
6. Press "Stop Pose Sequence" to exit sequence mode.

## Understanding the Display

- **Pose Label**: Shows the current detected pose
- **Confidence Label**: Displays the confidence level (0-100%)
- **Star Animation**: Appears when a pose is detected with >50% confidence
- **Reference Images**: Example images of each pose for visual guidance
- **Next Pose Label**: In sequence mode, shows which pose to do next

## Troubleshooting

- Make sure you have good lighting for optimal pose detection.
- Position yourself so your entire body is visible in the camera frame.
- If poses aren't being detected, try moving to a location with a plain background.
- If the app crashes, restart it and try again with slower movements.
- Ensure you have the TeachableMachine extension properly installed.

## Customizing the App

If you want to modify the app:

1. Open the app in MIT App Inventor.
2. In the Designer view, you can modify the user interface.
3. In the Blocks view, you can adjust the pose detection logic.
4. You can replace the existing model with your own Teachable Machine model:
   - Train a new model at [Teachable Machine](https://teachablemachine.withgoogle.com/)
   - Export it and replace the "ModelLink" property of the TeachableMachine component.
   - Adjust the class names in the blocks accordingly.

Enjoy your yoga practice with this interactive pose recognition app!