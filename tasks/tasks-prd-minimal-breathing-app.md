### Relevant Files

- `App.tsx` - Main application component containing UI and state logic for both the start screen and the breathing session.
- `app/(tabs)/index.tsx` - HomeScreen component handling breathing session logic.
- `app/index.tsx` - HomeScreen component handling breathing session logic.

## Tasks

- [ ] 1.0 Implement Breathing Session Logic
  - [x] 1.1 Define state variables for the current phase (e.g., 'Inhale', 'Hold', 'Exhale') and the current count (1-4).
  - [x] 1.2 Implement a timer (e.g., `setInterval`) that updates the count every second.
  - [x] 1.3 Implement logic to advance to the next phase and reset the count when the count reaches 4.
  - [x] 1.4 Ensure the phase sequence cycles correctly (Inhale -> Hold -> Exhale -> Hold -> Inhale...).
- [ ] 2.0 Implement Breathing Session UI
  - [x] 2.1 Create the initial screen showing only the "Start" button.
  - [x] 2.2 Create the breathing session screen layout.
  - [x] 2.3 Display the current phase name dynamically based on the state.
  - [x] 2.4 Display the current count dynamically based on the state.
  - [x] 2.5 Add a "Stop" button to the breathing session screen.
  - [ ] 2.6 Ensure all UI elements use a dark mode theme (black background, light text).
- [ ] 3.0 Implement Start/Stop Functionality
  - [ ] 3.1 Add state to track whether the breathing session is active.
  - [x] 3.2 Implement the "Start" button press handler to set the session state to active, initialize the phase/count, and start the timer.
  - [x] 3.3 Implement the "Stop" button press handler to set the session state to inactive, clear the timer, and reset the UI to the initial start screen.
  - [x] 3.4 Conditionally render the start screen or the breathing session screen based on the active state.
