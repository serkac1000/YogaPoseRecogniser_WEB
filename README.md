# Yoga Pose Recognizer Web Application

A modern web application for yoga pose recognition using TensorFlow.js and Teachable Machine models. This application allows users to practice yoga poses in sequence while getting real-time feedback on their form.

## Features

- **Real-time Pose Recognition**: Uses camera feed to recognize yoga poses based on a trained model
- **Sequential Pose Practice**: Automatically advances through a sequence of poses when each is recognized
- **Customizable Pose Images**: Upload your own reference images for each pose
- **Persistent Settings**: All settings and custom images are saved locally
- **Responsive Design**: Works on desktops, tablets, and mobile devices

## Installation

To set up the Yoga Pose Recognizer Web App:

1. Clone the repository:
   ```
   git clone https://github.com/serkac1000/YogaPoseRecogniser_WEB.git
   cd YogaPoseRecogniser_WEB
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

1. **Settings Configuration**:
   - Access the Settings page first to configure the application
   - Enter a TensorFlow.js model URL (default model included)
   - Upload custom reference images for each pose

2. **Pose Practice**:
   - Return to the main screen and click "Start Recognition"
   - Position yourself in front of the camera
   - Follow the current expected pose shown on screen
   - Hold the pose until it's recognized (minimum 50% confidence)
   - The app will automatically advance to the next pose

3. **Sequence Flow**:
   - The app cycles through poses in sequence (Pose 1 → Pose 2 → Pose 3 → Pose 1)
   - Progress is indicated in the pose sequence tracker

## Model Information

This application uses models trained with [Teachable Machine](https://teachablemachine.withgoogle.com/), a web-based tool that makes creating machine learning models fast, easy, and accessible.

The default model recognizes three basic yoga poses:
- Pose 1: Mountain Pose (Tadasana)
- Pose 2: Tree Pose (Vrikshasana)
- Pose 3: Warrior Pose (Virabhadrasana)

You can create and use your own custom pose models by:
1. Training a pose model on [Teachable Machine](https://teachablemachine.withgoogle.com/)
2. Publishing your model
3. Using the provided model URL in the app settings

## Privacy and Security

- All processing happens locally in your browser
- No images or video data are sent to any server
- Custom pose images are stored locally in your browser

## Development

This application is built with:
- React with TypeScript
- TensorFlow.js for machine learning
- Shadcn UI components for the interface
- Vite for development and building

## License

MIT License