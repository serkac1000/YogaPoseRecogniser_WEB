# Yoga Pose Recognizer - Implementation Guide

This guide will walk you through the process of implementing the Yoga Pose Recognizer app in MIT App Inventor step by step.

## Prerequisites

1. MIT App Inventor account (ai2.appinventor.mit.edu)
2. Teachable Machine Extension (.aix file)
3. Image assets (star1.png, pose1.png, pose2.png, pose3.png)
4. Android device or emulator for testing

## Step 1: Create a New Project

1. Log in to MIT App Inventor
2. Click "Start new project" and name it "YogaPoseRecognizer"

## Step 2: Import the Teachable Machine Extension

1. Download the Teachable Machine Extension (.aix file) from the MIT App Inventor community
2. In Designer view, scroll to "Extensions" at the bottom of the Components panel
3. Click "Import extension" and select the downloaded .aix file

## Step 3: Design the User Interface

### Add Main Layout Components

1. Drag a VerticalArrangement component to the Viewer
   - Rename it to "MainLayout"
   - Set Width to "Fill parent" and Height to "Fill parent"
   - Set AlignHorizontal to "Center"
   - Set Background Color to "Default"
   - Set Padding to 10

2. Add Header Label (optional)
   - Drag a Label component into MainLayout
   - Rename it to "HeaderLabel"
   - Set Text to "Yoga Pose Recognizer"
   - Set FontSize to 24
   - Set FontBold to true
   - Set TextAlignment to "Center"
   - Set Width to "Fill parent"

### Add Camera and Pose Recognition Components

3. Add Camera component
   - Drag a Camera component to the screen (it will appear in non-visible components)
   - Keep the default name "Camera1"

4. Add Image Preview Area
   - Drag a HorizontalArrangement into MainLayout
   - Rename it to "CameraPreviewArea"
   - Set Width to "Fill parent" and Height to "300 pixels"
   - Set AlignHorizontal to "Center"

5. Add Pose Detection Label
   - Drag a Label component into MainLayout (below CameraPreviewArea)
   - Rename it to "PoseLabel"
   - Set Text to "No Pose Detected"
   - Set FontSize to 18
   - Set FontBold to true
   - Set TextColor to "Black"
   - Set TextAlignment to "Center"
   - Set Width to "Fill parent"

6. Add Expected Pose Label
   - Drag a Label component into MainLayout (below PoseLabel)
   - Rename it to "ExpectedPoseLabel"
   - Set Text to "Expected: Pose 1"
   - Set FontSize to 16
   - Set TextColor to "#2979FF" (blue)
   - Set TextAlignment to "Center"
   - Set Width to "Fill parent"

7. Add Star Image
   - Drag an Image component into MainLayout
   - Rename it to "StarImage"
   - Upload star1.png through the Media panel
   - Set Picture to "star1.png"
   - Set Height to "100 pixels" and Width to "100 pixels"
   - Set AlignHorizontal to "Center"
   - Set Visible to false

### Add Control Buttons

8. Add Button Panel
   - Drag a HorizontalArrangement into MainLayout
   - Rename it to "ButtonPanel"
   - Set Width to "Fill parent"
   - Set AlignHorizontal to "Center"

9. Add Start Button
   - Drag a Button component into ButtonPanel
   - Rename it to "StartButton"
   - Set Text to "Start Recognition"
   - Set Width to "130 pixels"
   - Set FontSize to 14
   - Set Shape to rounded (use 8 for radius)
   - Set BackgroundColor to "#4CAF50" (green)
   - Set TextColor to "White"

10. Add Reset Button
    - Drag a Button component into ButtonPanel
    - Rename it to "ResetButton"
    - Set Text to "Reset"
    - Set Width to "130 pixels"
    - Set FontSize to 14
    - Set Shape to rounded (use 8 for radius)
    - Set BackgroundColor to "#F44336" (red)
    - Set TextColor to "White"

### Add Non-Visible Components

11. Add Clock
    - Drag a Clock component to the screen
    - Rename it to "Clock1"
    - Set TimerInterval to 500 (milliseconds)
    - Set TimerEnabled to false

12. Add TeachableMachine Recognizer
    - Locate the TeachableMachine component from the Extensions section
    - Drag the TMRecognizer component to the screen
    - Set ModelUrl to "https://teachablemachine.withgoogle.com/models/gIF64n3nR/"
    - Set ConfidenceThreshold to 0.5

## Step 4: Program the App Logic (Blocks View)

Switch to the Blocks view to program the app's behavior.

### 1. Initialize Global Variables

1. Create a global variable for current pose:
   - From Variables drawer, drag "initialize global name to" block
   - Set name to "currentPose"
   - Set value to 1

### 2. Program StartButton Click Event

1. From StartButton drawer, drag "when StartButton.Click" block
2. Add these blocks inside:
   - Set Clock1.TimerEnabled to true
   - Set StartButton.Enabled to false
   - Set PoseLabel.Text to "Starting recognition..."
   - Set ExpectedPoseLabel.Text to join "Expected: Pose " get global currentPose

### 3. Program ResetButton Click Event

1. From ResetButton drawer, drag "when ResetButton.Click" block
2. Add these blocks inside:
   - Set global currentPose to 1
   - Set Clock1.TimerEnabled to false
   - Set StartButton.Enabled to true
   - Set PoseLabel.Text to "No Pose Detected"
   - Set ExpectedPoseLabel.Text to "Expected: Pose 1"
   - Set StarImage.Visible to false

### 4. Program Clock Timer Event

1. From Clock1 drawer, drag "when Clock1.Timer" block
2. Add inside:
   - Call Camera1.TakePicture

### 5. Program Camera After Picture Event

1. From Camera1 drawer, drag "when Camera1.AfterPicture" block
2. Add inside:
   - Set TMRecognizer.Image to get image
   - Call TMRecognizer.Classify

### 6. Program TMRecognizer Got Classification Event

1. From TMRecognizer drawer, drag "when TMRecognizer.GotClassification" block (with result and confidence parameters)
2. Create an if-then-else structure:

```
if result = "Pose1" and confidence ≥ 0.5 then
  set PoseLabel.Text to join "Pose 1 Detected (" confidence ")"
  set StarImage.Visible to true
  if global currentPose = 1 then
    set global currentPose to 2
    set ExpectedPoseLabel.Text to "Expected: Pose 2"
  end if
else if result = "Pose2" and confidence ≥ 0.5 then
  set PoseLabel.Text to join "Pose 2 Detected (" confidence ")"
  set StarImage.Visible to true
  if global currentPose = 2 then
    set global currentPose to 3
    set ExpectedPoseLabel.Text to "Expected: Pose 3"
  end if
else if result = "Pose3" and confidence ≥ 0.5 then
  set PoseLabel.Text to join "Pose 3 Detected (" confidence ")"
  set StarImage.Visible to true
  if global currentPose = 3 then
    set global currentPose to 1
    set ExpectedPoseLabel.Text to "Expected: Pose 1"
  end if
else
  set PoseLabel.Text to "No Pose Detected"
  set StarImage.Visible to false
end if
```

### 7. Add Star Animation (Optional Enhancement)

1. From StarImage drawer, drag "when StarImage.Visible" block
2. Add inside:
   - Call Clock1.Timer (this will capture next image after a pose is detected)

## Step 5: Test the App

1. Connect your device using the MIT AI2 Companion app
2. Click "Connect" -> "AI Companion" in MIT App Inventor
3. Scan the QR code with your device
4. Test the app functionality:
   - Press "Start Recognition"
   - Perform the yoga poses in front of the camera
   - Verify that poses are detected and the sequence works as expected

## Step 6: Export the App

1. To create an .aia file:
   - Go to "Projects" -> "Export selected project (.aia) to my computer"
   - This will download the YogaPoseRecognizer.aia file

2. To create an APK file (installable app):
   - Go to "Build" -> "App (save .apk to my computer)"
   - This will generate an APK file you can install on Android devices

## Troubleshooting Tips

1. **Camera Issues**: Make sure your device gives the app permission to use the camera
2. **Model Recognition Issues**: Try to match the poses as closely as possible to your training data
3. **Performance Issues**: If the app is slow, try increasing the Clock TimerInterval to 1000 ms
4. **Star Not Appearing**: Check that the star image was uploaded correctly to the Media panel

## Complete Block Structure Reference

Here's a complete reference of all the blocks needed for this app:

```
// Initialize global variable
initialize global currentPose to 1

// Start Button Click Event
when StartButton.Click
  do
    set Clock1.TimerEnabled to true
    set StartButton.Enabled to false
    set PoseLabel.Text to "Starting recognition..."
    set ExpectedPoseLabel.Text to join "Expected: Pose " get global currentPose

// Reset Button Click Event
when ResetButton.Click
  do
    set global currentPose to 1
    set Clock1.TimerEnabled to false
    set StartButton.Enabled to true
    set PoseLabel.Text to "No Pose Detected"
    set ExpectedPoseLabel.Text to "Expected: Pose 1"
    set StarImage.Visible to false

// Clock Timer Event
when Clock1.Timer
  do
    call Camera1.TakePicture

// Camera After Picture Event
when Camera1.AfterPicture with image
  do
    set TMRecognizer.Image to get image
    call TMRecognizer.Classify

// TMRecognizer Got Classification Event
when TMRecognizer.GotClassification with result confidence
  do
    if result = "Pose1" and confidence ≥ 0.5 then
      set PoseLabel.Text to join "Pose 1 Detected (" confidence ")"
      set StarImage.Visible to true
      if global currentPose = 1 then
        set global currentPose to 2
        set ExpectedPoseLabel.Text to "Expected: Pose 2"
      end if
    else if result = "Pose2" and confidence ≥ 0.5 then
      set PoseLabel.Text to join "Pose 2 Detected (" confidence ")"
      set StarImage.Visible to true
      if global currentPose = 2 then
        set global currentPose to 3
        set ExpectedPoseLabel.Text to "Expected: Pose 3"
      end if
    else if result = "Pose3" and confidence ≥ 0.5 then
      set PoseLabel.Text to join "Pose 3 Detected (" confidence ")"
      set StarImage.Visible to true
      if global currentPose = 3 then
        set global currentPose to 1
        set ExpectedPoseLabel.Text to "Expected: Pose 1"
      end if
    else
      set PoseLabel.Text to "No Pose Detected"
      set StarImage.Visible to false
    end if

// Star Visible Changed Event (Optional)
when StarImage.Visible
  do
    call Clock1.Timer
```