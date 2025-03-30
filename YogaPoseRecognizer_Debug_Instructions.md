# Yoga Pose Recognizer - Debug Version

## Overview

This is a special debug version of the Yoga Pose Recognizer application, designed to help identify and troubleshoot issues with the MIT App Inventor project. This version includes additional debugging features not present in the standard version.

## New Debugging Features

1. **Debug Panel**
   - A new debug panel has been added at the bottom of the screen
   - Toggle debug mode on/off with the checkbox
   - Clear logs with the "Clear Logs" button

2. **Logging System**
   - All important events and actions are now logged with timestamps
   - Logs are displayed in real-time on the screen
   - Logs can be saved to a file for later analysis

3. **File Storage**
   - Logs can be saved to a text file on your device
   - File is named "YogaPoseRecognizerLogs.txt"

4. **Error Handling**
   - Enhanced error handling for model loading and camera access
   - Detailed error messages to help identify problems

## How to Use the Debug Version

1. **Import the Project**
   - Import "YogaPoseRecognizer_Debug_v1.1.1.aia" into MIT App Inventor
   - The debug version has a different project name to avoid conflicts with the standard version

2. **Enable Debug Mode**
   - When the app starts, check the "Enable Debug" checkbox to enable detailed logging
   - Debug information will appear in the logs panel

3. **View Logs**
   - Logs will automatically appear in the logs panel as events occur
   - Scroll through logs to see the history of events
   - Use the "Clear Logs" button to reset the log display

4. **Save Logs for Analysis**
   - Tap the "Save Logs" button to save the logs to a text file
   - Share the log file for help with troubleshooting

5. **Standard Features**
   - All standard features of the Yoga Pose Recognizer app remain functional
   - Debug features do not interfere with the core functionality

## Solving Common Issues

### "Blocks did not load properly" Error
The debug version has been reconstructed to eliminate the blocks loading error. If you still encounter this issue:

1. Make sure you're using the latest version of MIT App Inventor
2. Try clearing your browser cache and cookies
3. Use a different browser or device if possible
4. Export the logs and share them for further assistance

### Camera Access Issues
If you encounter camera access problems:

1. Enable debug logging to see detailed error messages
2. Check that your device has given the app permission to use the camera
3. Try toggling between front and back cameras using the "Toggle Camera" button
4. Restart the app after granting permissions

### Model Loading Issues
If the model fails to load properly:

1. Check your internet connection
2. Enable debug mode to see detailed loading progress
3. Allow more time for the model to load on slower devices or connections

## Technical Details

This debug version includes:

- Global variables for managing logs and debug state
- Additional UI components for displaying debug information
- Enhanced error handlers for all critical functions
- File handling capabilities for exporting logs
- Simplified block structure to prevent loading errors

## Version Information

- **Version:** 1.1.1 (Debug)
- **Release Date:** March 30, 2025
- **Compatible with:** MIT App Inventor (latest version)
- **Required Extensions:** TeachableMachine, PersonalImageClassifier