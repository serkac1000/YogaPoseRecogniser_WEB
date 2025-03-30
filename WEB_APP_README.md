# Yoga Pose Recognizer - Web Version

This is the web application version of the Yoga Pose Recognizer app, which uses React, TensorFlow.js, and modern UI components to provide the same functionality as the MIT App Inventor version but in a web-based format.

## Features

- Real-time yoga pose detection using TensorFlow.js
- Sequential pose practice mode
- Visual feedback for successful poses
- Responsive design that works on all devices
- Modern UI with shadcn components

## Technologies Used

- React for the UI components
- TensorFlow.js for pose detection
- Tailwind CSS for styling
- shadcn/ui component library
- Vite for fast development and production builds

## Installation and Setup

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:5173`

## How to Use

1. Allow camera access when prompted
2. Click "Start Recognition" to begin pose detection
3. Follow the on-screen instructions to perform the yoga poses in sequence
4. Maintain each pose until recognized with sufficient confidence
5. Complete the sequence to advance to the next level

## Project Structure

- `client/src/components/YogaPoseRecognizer.tsx`: Core component for pose detection
- `client/src/components/PoseDisplay.tsx`: Component for displaying current and detected poses
- `client/src/components/StarAnimation.tsx`: Visual feedback for successful poses
- `client/src/lib/yogaPoseModel.ts`: TensorFlow.js model integration
- `client/src/pages/home.tsx`: Main application page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.