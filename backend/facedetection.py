import cv2
import os
import numpy as np
from deepface import DeepFace
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS globally

# Suppress TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  

# Load face detector
FACE_MODEL_PROTO = "deploy.prototxt"
FACE_MODEL_CAFFE = "res10_300x300_ssd_iter_140000.caffemodel"

if not os.path.exists(FACE_MODEL_PROTO) or not os.path.exists(FACE_MODEL_CAFFE):
    print(json.dumps({"error": "Face detection model files not found."}))
    exit(1)

net = cv2.dnn.readNetFromCaffe(FACE_MODEL_PROTO, FACE_MODEL_CAFFE)

@app.route('/api/emotion/detect', methods=['GET'])
def detect_emotion():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    if not cap.isOpened():
        return jsonify({"error": "Could not open camera."}), 500

    ret, frame = cap.read()
    cap.release()  # Release camera immediately after capturing
    if not ret or frame is None:
        return jsonify({"error": "Failed to capture a valid image."}), 500

    (h, w) = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()

    if detections.shape[2] == 0:
        return jsonify({"error": "No face detected."}), 400

    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (x, y, x_max, y_max) = box.astype("int")

            face_roi = frame[max(0, y):min(h, y_max), max(0, x):min(w, x_max)]
            if face_roi.shape[0] == 0 or face_roi.shape[1] == 0:
                continue

            try:
                result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
                detected_emotion = result[0]['dominant_emotion']
                return jsonify({"emotion": detected_emotion})
            except Exception as e:
                return jsonify({"error": f"DeepFace failed - {str(e)}"}), 500

    return jsonify({"error": "No valid face region detected."}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
