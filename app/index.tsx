import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SessionButton from "../components/SessionButton";

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

  const transform = useSharedValue(0);
  // shared value for text color animation
  const textProgress = useSharedValue(0);
  const slideProgress = useSharedValue(0); // 0 = Start, 1 = Stop

  useEffect(() => {
    transform.value = withTiming(isActive ? 100 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
    // animate text color
    textProgress.value = withTiming(isActive ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
    // animate start/stop slide
    slideProgress.value = withTiming(isActive ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [isActive]);

  // animated text color style
  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      textProgress.value,
      [0, 1],
      ["black", "white"]
    );
    return { color };
  });

  const style = useAnimatedStyle<ViewStyle>(() => ({
    transform: [
      {
        translateY: withTiming(`${transform.value}%`, {
          duration: 200,
          easing: Easing.out(Easing.cubic),
        }),
      },
    ],
  }));

  // Styles for independent text animation
  const startSlideStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(`${slideProgress.value * -100}%`, {
          duration: 200,
          easing: Easing.out(Easing.cubic),
        }),
      },
    ],
  }));

  const stopSlideStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(`${(1 - slideProgress.value) * 100}%`, {
          duration: 200,
          easing: Easing.out(Easing.cubic),
        }),
      },
    ],
  }));

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
        <SessionButton
          isActive={isActive}
          onPress={() => (isActive ? handleStop() : handleStart())}
        />
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
