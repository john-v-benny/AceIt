import cv2
import mediapipe as mp

# Initialize MediaPipe solutions
mp_pose = mp.solutions.pose
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

pose = mp_pose.Pose()
hands = mp_hands.Hands()

# Start webcam capture
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert the frame to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process pose and hands
    pose_results = pose.process(rgb_frame)
    hands_results = hands.process(rgb_frame)

    # Convert frame back to BGR for OpenCV
    frame = cv2.cvtColor(rgb_frame, cv2.COLOR_RGB2BGR)

    feedback = []

    # Detect pose landmarks
    if pose_results.pose_landmarks:
        landmarks = pose_results.pose_landmarks.landmark

        # Extract landmarks
        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
        right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]
        nose = landmarks[mp_pose.PoseLandmark.NOSE]
        left_ear = landmarks[mp_pose.PoseLandmark.LEFT_EAR]
        right_ear = landmarks[mp_pose.PoseLandmark.RIGHT_EAR]

        # Check for upright sitting
        shoulder_diff = abs(left_shoulder.y - right_shoulder.y)
        hip_diff = abs(left_hip.y - right_hip.y)
        if shoulder_diff < 0.05 and hip_diff < 0.05:
            feedback.append("Upright sitting detected.")
        else:
            feedback.append("Adjust your posture to sit upright.")

        # Check for neutral head position
        head_tilt = abs(left_ear.y - right_ear.y)
        if head_tilt < 0.05:
            feedback.append("Neutral head position detected.")
        else:
            feedback.append("Keep your head straight for better posture.")

        # Check for forward lean (optional)
        shoulder_to_hip_diff = abs((left_shoulder.x + right_shoulder.x) / 2 -
                                   (left_hip.x + right_hip.x) / 2)
        if 0.02 < shoulder_to_hip_diff < 0.1:
            feedback.append("Slight forward lean detected (shows engagement).")

        # Draw pose landmarks
        mp_drawing.draw_landmarks(frame, pose_results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

    # Detect hand landmarks
    if hands_results.multi_hand_landmarks:
        for hand_landmarks in hands_results.multi_hand_landmarks:
            # Example: Check visibility of thumb and index finger
            thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
            index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]

            if thumb_tip.visibility > 0.8 and index_tip.visibility > 0.8:
                feedback.append("Hands are visible and open.")
            else:
                feedback.append("Keep hands visible and open.")

            # Draw hand landmarks
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    # Display feedback on the frame
    y_offset = 20
    for text in feedback:
        cv2.putText(frame, text, (10, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        y_offset += 30

    # Show the video feed
    cv2.imshow("Posture and Gesture Detection", frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()