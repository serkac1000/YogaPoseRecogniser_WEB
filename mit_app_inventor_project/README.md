# Yoga Pose Recognizer - MIT App Inventor Project

This repository contains implementation guidelines and resources for creating a Yoga Pose Recognition application using MIT App Inventor and Teachable Machine.

## Project Overview

The Yoga Pose Recognizer is a mobile application that:
1. Uses the device camera to capture images
2. Recognizes three distinct yoga poses using machine learning
3. Guides users through a sequence of poses (Pose 1 → Pose 2 → Pose 3 → Pose 1)
4. Provides visual feedback when poses are correctly performed

## Files in this Project

1. **YogaPoseRecognizer_Instructions.md**
   - Provides a high-level overview of components and logic
   - Quick reference for implementing the app

2. **YogaPoseRecognizer_Implementation.md**
   - Detailed step-by-step instructions for building the app
   - Complete component configuration details
   - Programming logic explanations

3. **blocks_visualization.md**
   - Visual representation of how code blocks should be arranged
   - Helpful for understanding the proper block structure

4. **image_resources.md**
   - Descriptions of required image assets
   - Guidelines for creating or sourcing appropriate images

5. **star1.svg**
   - Vector graphic for the star image (needs to be converted to PNG)

## Getting Started

1. Follow these steps to implement the project:
   - Review the image_resources.md and prepare the required images
   - Read YogaPoseRecognizer_Instructions.md for an overview
   - Follow YogaPoseRecognizer_Implementation.md for detailed implementation
   - Use blocks_visualization.md as a reference for block arrangement

2. Prerequisites:
   - MIT App Inventor account
   - Teachable Machine Extension (.aix file)
   - Android device or emulator for testing
   - Images for star and yoga pose references

## Implementation Process

1. **Set up the Model** (already completed):
   - A model has been trained using Teachable Machine
   - URL: https://teachablemachine.withgoogle.com/models/gIF64n3nR/

2. **Build the App:**
   - Create the user interface as described in the implementation guide
   - Add the logic blocks as shown in the blocks visualization
   - Test each component as you build

3. **Testing the App:**
   - Use MIT App Inventor's AI Companion to test on your device
   - Verify that poses are detected correctly
   - Ensure the pose sequence works as expected
   - Check that the star appears properly when poses are recognized

4. **Exporting the App:**
   - Create an .aia file for sharing or future editing
   - Optionally build an APK for direct installation on Android devices

## Notes for Customization

- You can modify pose names and descriptions to match your preferred yoga poses
- Adjust the confidence threshold if recognition is too strict or too lenient
- Add sound feedback by including Sound components triggered by successful pose recognition
- Consider adding a timer feature to hold poses for specific durations

## Troubleshooting

- If camera doesn't activate, check permissions on your device
- If poses aren't recognized, try adjusting lighting and camera angle
- For performance issues, increase the Clock timer interval
- Ensure all image assets are properly uploaded to the Media panel

## Need Help?

For assistance with MIT App Inventor:
- Visit the [MIT App Inventor Forum](https://community.appinventor.mit.edu/)
- Check the [MIT App Inventor Documentation](https://appinventor.mit.edu/explore/library)

For help with the Teachable Machine extension:
- See the [Teachable Machine Extension Community Page](https://community.appinventor.mit.edu/t/tmic-app-inventor-extension-for-the-deployment-of-image-classification-models-exported-from-teachable-machine/64411)