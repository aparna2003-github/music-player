import cv2
import os
import random
import pygame
import requests
from deepface import DeepFace

# Backend API URL
API_URL = "http://localhost:5000/detect-emotion"

# Capture a Single Image from Webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not access the camera")
    exit()

ret, frame = cap.read()
cap.release()

if not ret:
    print("Error: Could not capture image")
    exit()

# Detect Emotion
try:
    result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
    emotion = result[0]['dominant_emotion']
    cv2.putText(frame, f"Emotion: {emotion}", (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    print(f"Detected Emotion: {emotion}")

    # Send Emotion to Backend
    response = requests.post(API_URL, json={"emotion": emotion})
    if response.status_code == 200:
        print("Emotion sent successfully!")
    else:
        print("Failed to send emotion to backend.")

    # Display the Captured Image with Emotion Label
    cv2.imshow("Emotion Detection", frame)
    cv2.waitKey(3000)  # Display for 3 seconds
    cv2.destroyAllWindows()

except Exception as e:
    print(f"Error: {e}")
