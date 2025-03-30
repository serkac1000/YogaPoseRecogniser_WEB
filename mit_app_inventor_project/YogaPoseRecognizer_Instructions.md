# Yoga Pose Recognizer - MIT App Inventor Project

This document provides detailed instructions for creating a Yoga Pose Recognition app using MIT App Inventor, based on a model trained with Teachable Machine.

## Components Overview

| Component | Name | Purpose |
|-----------|------|---------|
| Camera | Camera1 | Captures images for pose recognition |
| Image | StarImage | Displays when a pose is recognized |
| Label | PoseLabel | Shows the currently detected pose |
| Button | StartButton | Initiates the recognition process |
| Clock | Clock1 | Timer for periodic image capture |
| TeachableMachine | TMRecognizer | Processes images and identifies poses |

## Interface Design

1. **Screen Setup**
   - Title: "Yoga Pose Recognizer"
   - ScreenOrientation: Portrait
   - AlignHorizontal: Center

2. **Layout**
   - Use a VerticalArrangement for the main layout (rename to MainLayout)
   - Set Width to "Fill parent" and Height to "Fill parent"
   - Add padding of about 10 pixels

3. **Component Properties**
   - **Camera1**:
     - Width: Fill parent
     - Height: 300px
   
   - **PoseLabel**:
     - Text: "No Pose Detected"
     - FontSize: 18
     - FontBold: True
     - TextAlignment: Center
     - Width: Fill parent
     - TextColor: Black
   
   - **StartButton**:
     - Text: "Start Recognition"
     - Width: 200px
     - Shape: Rounded
   
   - **StarImage**:
     - Picture: star1.png (upload this image to the project)
     - Width: 100px
     - Height: 100px
     - Visible: False
     - AlignHorizontal: Center
   
   - **Clock1**:
     - TimerInterval: 500 (milliseconds)
     - TimerEnabled: False
   
   - **TMRecognizer**:
     - ModelUrl: "https://teachablemachine.withgoogle.com/models/gIF64n3nR/"
     - ConfidenceThreshold: 0.5

## Block Programming Instructions

### 1. Initialize Variables

1. Create a global variable named `currentPose` with an initial value of `1`

### 2. Start Button Click Event

1. When `StartButton.Click` occurs:
   - Set `Clock1.TimerEnabled` to `true`
   - Set `StartButton.Enabled` to `false`
   - Set `PoseLabel.Text` to "Starting recognition..."

### 3. Clock Timer Event

1. When `Clock1.Timer` occurs:
   - Call `Camera1.TakePicture`

### 4. Camera After Picture Event

1. When `Camera1.AfterPicture` occurs with parameter `image`:
   - Set `TMRecognizer.Image` to `image`
   - Call `TMRecognizer.Classify`

### 5. TMRecognizer Got Classification Event

1. When `TMRecognizer.GotClassification` occurs with parameters `result` and `confidence`:
   - Create an if-then-else block structure:
     
     **If** `result = "Pose1" AND confidence ≥ 0.5`:
     - Set `PoseLabel.Text` to "Pose 1 Detected (Mountain Pose)"
     - Set `StarImage.Visible` to `true`
     - **If** `global currentPose = 1`:
       - Set `global currentPose` to `2`
     
     **Else if** `result = "Pose2" AND confidence ≥ 0.5`:
     - Set `PoseLabel.Text` to "Pose 2 Detected (Tree Pose)"
     - Set `StarImage.Visible` to `true`
     - **If** `global currentPose = 2`:
       - Set `global currentPose` to `3`
     
     **Else if** `result = "Pose3" AND confidence ≥ 0.5`:
     - Set `PoseLabel.Text` to "Pose 3 Detected (Warrior Pose)"
     - Set `StarImage.Visible` to `true`
     - **If** `global currentPose = 3`:
       - Set `global currentPose` to `1`
     
     **Else**:
     - Set `PoseLabel.Text` to "No Pose Detected, current expected: Pose " + `global currentPose`
     - Set `StarImage.Visible` to `false`

### 6. Add Reset Button (Optional Enhancement)

1. Add a "Button" component named `ResetButton`
   - Set Text to "Reset"
   - Set Width to 200px
   - Set Shape to Rounded

2. When `ResetButton.Click` occurs:
   - Set `global currentPose` to `1`
   - Set `Clock1.TimerEnabled` to `false`
   - Set `StartButton.Enabled` to `true`
   - Set `PoseLabel.Text` to "No Pose Detected"
   - Set `StarImage.Visible` to `false`

## Visual Block Representation

Below is a textual representation of how the blocks should be arranged:

```
// Initialize global variable
initialize global currentPose to 1

// Start Button Click Event
when StartButton.Click
  do
    set Clock1.TimerEnabled to true
    set StartButton.Enabled to false
    set PoseLabel.Text to "Starting recognition..."

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
      set PoseLabel.Text to "Pose 1 Detected (Mountain Pose)"
      set StarImage.Visible to true
      if global currentPose = 1 then
        set global currentPose to 2
      end if
    else if result = "Pose2" and confidence ≥ 0.5 then
      set PoseLabel.Text to "Pose 2 Detected (Tree Pose)"
      set StarImage.Visible to true
      if global currentPose = 2 then
        set global currentPose to 3
      end if
    else if result = "Pose3" and confidence ≥ 0.5 then
      set PoseLabel.Text to "Pose 3 Detected (Warrior Pose)"
      set StarImage.Visible to true
      if global currentPose = 3 then
        set global currentPose to 1
      end if
    else
      set PoseLabel.Text to join "No Pose Detected, current expected: Pose " get global currentPose
      set StarImage.Visible to false
    end if

// Reset Button Click Event (Optional)
when ResetButton.Click
  do
    set global currentPose to 1
    set Clock1.TimerEnabled to false
    set StartButton.Enabled to true
    set PoseLabel.Text to "No Pose Detected"
    set StarImage.Visible to false
```

## Notes for Implementation

1. **Teachable Machine Extension**: Make sure to import the Teachable Machine extension before creating the project.
2. **Star Image**: Upload a star image to the project media through the Media panel.
3. **Testing**: Test the app on an Android device through the MIT AI2 Companion app.
4. **Sequence Logic**: The app implements a specific sequence (Pose 1 → Pose 2 → Pose 3 → Pose 1) and only advances when the correct pose is detected.
5. **Confidence Threshold**: The model only recognizes poses with at least 50% confidence.