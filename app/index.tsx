import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Phase = "Inhale" | "Hold" | "Exhale";

export default function HomeScreen() {
  const phases: Phase[] = ["Inhale", "Hold", "Exhale", "Hold"];
  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const phase = phases[phaseIndex];
  const [count, setCount] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(false);

  // handle start: reset and activate session
  function handleStart() {
    setPhaseIndex(0);
    setCount(1);
    setIsActive(true);
  }

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 4) {
          advancePhase();
          return 1;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive]);

  // function to cycle phases
  function advancePhase() {
    setPhaseIndex((i) => (i + 1) % phases.length);
  }

  // handle stop: deactivate session and reset
  function handleStop() {
    setIsActive(false);
    setPhaseIndex(0);
    setCount(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isActive && (
          <View style={styles.sessionScreen}>
            <Text style={styles.phaseText}>{phase}</Text>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {!isActive ? (
          <Pressable style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Session</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.button, styles.stopButton]}
            onPress={handleStop}
          >
            <Text style={[styles.buttonText, styles.stopButtonText]}>
              Stop Session
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: "60%",
    alignItems: "center",
  },
  stopButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  stopButtonText: {
    color: "white",
  },
  sessionScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phaseText: {
    color: "white",
    fontSize: 32,
    marginBottom: 10,
  },
  countText: {
    color: "white",
    fontSize: 64,
    marginBottom: 20,
  },
});

export const options = { headerShown: false };
