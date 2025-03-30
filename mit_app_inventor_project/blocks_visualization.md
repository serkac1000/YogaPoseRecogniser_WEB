# Visual Guide to MIT App Inventor Blocks

This document provides a textual representation of how the blocks should be arranged in MIT App Inventor for the Yoga Pose Recognizer app.

## Global Variable Initialization

```
[initialize global | currentPose | to | 1 ]
```

## StartButton.Click Event

```
when [StartButton].Click
  do
    ┌─────────────────────────────────────┐
    │ set [Clock1].[TimerEnabled] to true │
    └─────────────────────────────────────┘
    
    ┌───────────────────────────────────────┐
    │ set [StartButton].[Enabled] to false  │
    └───────────────────────────────────────┘
    
    ┌─────────────────────────────────────────────────┐
    │ set [PoseLabel].[Text] to "Starting recognition..."│
    └─────────────────────────────────────────────────┘
    
    ┌───────────────────────────────────────────────────────────┐
    │ set [ExpectedPoseLabel].[Text] to                         │
    │   ┌─────────────────────────────────────────────────────┐ │
    │   │ join "Expected: Pose " [get [global currentPose]]    │ │
    │   └─────────────────────────────────────────────────────┘ │
    └───────────────────────────────────────────────────────────┘
```

## ResetButton.Click Event

```
when [ResetButton].Click
  do
    ┌───────────────────────────────┐
    │ set [global currentPose] to 1 │
    └───────────────────────────────┘
    
    ┌──────────────────────────────────┐
    │ set [Clock1].[TimerEnabled] to false │
    └──────────────────────────────────┘
    
    ┌────────────────────────────────────┐
    │ set [StartButton].[Enabled] to true │
    └────────────────────────────────────┘
    
    ┌───────────────────────────────────────────┐
    │ set [PoseLabel].[Text] to "No Pose Detected" │
    └───────────────────────────────────────────┘
    
    ┌────────────────────────────────────────────┐
    │ set [ExpectedPoseLabel].[Text] to "Expected: Pose 1" │
    └────────────────────────────────────────────┘
    
    ┌─────────────────────────────────────┐
    │ set [StarImage].[Visible] to false  │
    └─────────────────────────────────────┘
```

## Clock1.Timer Event

```
when [Clock1].Timer
  do
    ┌───────────────────────┐
    │ call [Camera1].[TakePicture] │
    └───────────────────────┘
```

## Camera1.AfterPicture Event

```
when [Camera1].[AfterPicture] with [image]
  do
    ┌────────────────────────────────────────┐
    │ set [TMRecognizer].[Image] to [get image] │
    └────────────────────────────────────────┘
    
    ┌───────────────────────────┐
    │ call [TMRecognizer].[Classify] │
    └───────────────────────────┘
```

## TMRecognizer.GotClassification Event

```
when [TMRecognizer].[GotClassification] with [result] [confidence]
  do
    if ┌──────────────────────────────────────────────────────┐
       │ [get result] = "Pose1" and [get confidence] ≥ 0.5    │
       └──────────────────────────────────────────────────────┘
    then
      ┌──────────────────────────────────────────────────────┐
      │ set [PoseLabel].[Text] to                            │
      │   ┌─────────────────────────────────────────────────┐│
      │   │ join "Pose 1 Detected (" [get confidence] ")"    ││
      │   └─────────────────────────────────────────────────┘│
      └──────────────────────────────────────────────────────┘
      
      ┌────────────────────────────────────┐
      │ set [StarImage].[Visible] to true  │
      └────────────────────────────────────┘
      
      if ┌──────────────────────────────────────────┐
         │ [get [global currentPose]] = 1           │
         └──────────────────────────────────────────┘
      then
        ┌───────────────────────────────┐
        │ set [global currentPose] to 2 │
        └───────────────────────────────┘
        
        ┌──────────────────────────────────────────────────┐
        │ set [ExpectedPoseLabel].[Text] to "Expected: Pose 2" │
        └──────────────────────────────────────────────────┘
    else if ┌────────────────────────────────────────────────┐
            │ [get result] = "Pose2" and [get confidence] ≥ 0.5 │
            └────────────────────────────────────────────────┘
    then
      ┌──────────────────────────────────────────────────────┐
      │ set [PoseLabel].[Text] to                            │
      │   ┌─────────────────────────────────────────────────┐│
      │   │ join "Pose 2 Detected (" [get confidence] ")"    ││
      │   └─────────────────────────────────────────────────┘│
      └──────────────────────────────────────────────────────┘
      
      ┌────────────────────────────────────┐
      │ set [StarImage].[Visible] to true  │
      └────────────────────────────────────┘
      
      if ┌──────────────────────────────────────────┐
         │ [get [global currentPose]] = 2           │
         └──────────────────────────────────────────┘
      then
        ┌───────────────────────────────┐
        │ set [global currentPose] to 3 │
        └───────────────────────────────┘
        
        ┌──────────────────────────────────────────────────┐
        │ set [ExpectedPoseLabel].[Text] to "Expected: Pose 3" │
        └──────────────────────────────────────────────────┘
    else if ┌────────────────────────────────────────────────┐
            │ [get result] = "Pose3" and [get confidence] ≥ 0.5 │
            └────────────────────────────────────────────────┘
    then
      ┌──────────────────────────────────────────────────────┐
      │ set [PoseLabel].[Text] to                            │
      │   ┌─────────────────────────────────────────────────┐│
      │   │ join "Pose 3 Detected (" [get confidence] ")"    ││
      │   └─────────────────────────────────────────────────┘│
      └──────────────────────────────────────────────────────┘
      
      ┌────────────────────────────────────┐
      │ set [StarImage].[Visible] to true  │
      └────────────────────────────────────┘
      
      if ┌──────────────────────────────────────────┐
         │ [get [global currentPose]] = 3           │
         └──────────────────────────────────────────┘
      then
        ┌───────────────────────────────┐
        │ set [global currentPose] to 1 │
        └───────────────────────────────┘
        
        ┌──────────────────────────────────────────────────┐
        │ set [ExpectedPoseLabel].[Text] to "Expected: Pose 1" │
        └──────────────────────────────────────────────────┘
    else
      ┌─────────────────────────────────────────────┐
      │ set [PoseLabel].[Text] to "No Pose Detected" │
      └─────────────────────────────────────────────┘
      
      ┌────────────────────────────────────┐
      │ set [StarImage].[Visible] to false │
      └────────────────────────────────────┘
```

## Optional: StarImage.Visible Event (for animation)

```
when [StarImage].[Visible]
  do
    ┌──────────────────┐
    │ call [Clock1].[Timer] │
    └──────────────────┘
```

## Notes on Block Colors

In MIT App Inventor, different types of blocks have different colors:

- **Event blocks** (when...) are yellow
- **Control blocks** (if, if-else, loops) are orange
- **Math and logic blocks** are green
- **Text blocks** are purple
- **Variable blocks** are red
- **Component property setters** are blue
- **Component method callers** are blue

This visual guide aims to help you understand how to connect the blocks properly in MIT App Inventor, even though actual colors aren't displayed in this text representation.