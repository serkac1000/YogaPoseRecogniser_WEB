
import cv2
import os

try:
    import tensorflow as tf
    TENSORFLOW_AVAILABLE = True
except ImportError as e:
    print(f"[ERROR] Failed to import TensorFlow: {str(e)}")
    TENSORFLOW_AVAILABLE = False

def test_tensorflow():
    if TENSORFLOW_AVAILABLE:
        print("[DEBUG] TensorFlow version:", tf.__version__)
        print("[DEBUG] GPU available:", tf.config.list_physical_devices('GPU'))
    else:
        print("[ERROR] TensorFlow is not available")

def test_camera():
    try:
        cap = cv2.VideoCapture(0)
        if cap.isOpened():
            print("[DEBUG] Camera initialized successfully")
            ret, frame = cap.read()
            if ret:
                print("[DEBUG] Camera frame captured successfully")
            cap.release()
        else:
            print("[ERROR] Failed to open camera")
    except Exception as e:
        print(f"[ERROR] Camera error: {str(e)}")

def test_model_file():
    model_path = 'modelLHRHBOTHHAND.mdl'
    if os.path.exists(model_path):
        print(f"[DEBUG] Model file found at {model_path}")
        print(f"[DEBUG] Model file size: {os.path.getsize(model_path)} bytes")
        if TENSORFLOW_AVAILABLE:
            try:
                model = tf.keras.models.load_model(model_path)
                print("[DEBUG] Model loaded successfully")
            except Exception as e:
                print(f"[ERROR] Failed to load model: {str(e)}")
        else:
            print("[ERROR] Cannot load model: TensorFlow is not available")
    else:
        print(f"[ERROR] Model file not found at {model_path}")

def main():
    print("[DEBUG] Starting basic diagnostics")
    test_tensorflow()
    test_model_file()
    test_camera()
    print("[DEBUG] Diagnostics complete")

if __name__ == "__main__":
    main()
