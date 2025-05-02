# PRD: Minimal Breathing App

## 1. Introduction/Overview

This document outlines the requirements for a minimal mobile breathing application built using Expo and React Native. The app will guide users through a simple box breathing exercise (inhale, hold, exhale, hold) with fixed 4-second intervals for each phase. The primary goal is to provide a basic, functional tool for guided breathing.

## 2. Goals

- Provide a single, easy-to-start box breathing mode.
- Clearly indicate the current phase (Inhale, Hold, Exhale, Hold) and the count within each phase (1, 2, 3, 4).
- Allow the user to start and stop the breathing session at any time.
- Offer a clean, minimal user interface in dark mode only.

## 3. User Stories

- **As a user**, I want to open the app and see a single button to start a breathing session so that I can quickly begin the exercise.
- **As a user**, I want to see the current breathing phase (Inhale, Hold, Exhale, Hold) clearly displayed so that I know what action to take.
- **As a user**, I want to see a counter from 1 to 4 for each phase so that I can maintain the correct timing.
- **As a user**, I want to be able to stop the session at any point by tapping a button so that I have control over the exercise duration.
- **As a user**, I want the app to immediately return to the initial start screen when I stop a session so that I know the session has ended.

## 4. Functional Requirements

1.  The application must be built using Expo and React Native.
2.  The app must launch to a screen displaying only a "Start" button.
3.  Tapping the "Start" button must initiate the box breathing session.
4.  The breathing session must follow this pattern cyclically:
    - Inhale for 4 seconds.
    - Hold breath for 4 seconds.
    - Exhale for 4 seconds.
    - Hold breath for 4 seconds.
5.  During the session, the screen must display:
    - The current phase name (e.g., "Inhale", "Hold", "Exhale").
    - A counter that increments from 1 to 4 for the duration of each phase, resetting to 1 for the next phase.
    - A "Stop" button located at the bottom center of the screen.
6.  The application must operate exclusively in a dark mode theme (e.g., black background, light text/elements). The background color must remain constant throughout the session.
7.  Tapping the "Stop" button must immediately terminate the breathing session.
8.  Upon stopping the session, the application must immediately return to the initial screen displaying the "Start" button.

## 5. Non-Goals (Out of Scope)

- Configurable phase durations.
- Different breathing modes (e.g., 4-7-8 breathing).
- Audio cues or haptic feedback.
- Session history or tracking of completed cycles.
- Light mode or customizable themes.
- User accounts or settings.
- Animations beyond the text/number changes.

## 6. Design Considerations (Optional)

- Maintain a minimal aesthetic.
- Ensure text for the phase and count is easily readable against the black background.
- The "Start" and "Stop" buttons should be clear and easy to tap.

## 7. Technical Considerations (Optional)

- Use standard React Native components (`View`, `Text`, `Button` or `Pressable`).
- Manage the timing and state transitions using JavaScript's `setInterval` or `setTimeout`, or Expo's timer utilities if preferred.

## 8. Success Metrics

- The user can successfully start a breathing session.
- The phase name and counter update accurately every second according to the 4-4-4-4 pattern.
- The user can successfully stop the session at any time using the "Stop" button.
- The app correctly returns to the initial start screen upon stopping.
- The app remains stable and performs reliably during a session of at least 5 minutes.

## 9. Open Questions

- None at this time.
