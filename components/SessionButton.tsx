import React, { useEffect } from "react";
import type { ViewStyle } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  isActive: boolean;
  onPress: () => void;
};

const SessionButton: React.FC<Props> = ({ isActive, onPress }) => {
  const transform = useSharedValue(0);
  const textProgress = useSharedValue(0);
  const slideProgress = useSharedValue(0);

  const SLIDE_HEIGHT = 20;

  useEffect(() => {
    transform.value = withTiming(isActive ? 100 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
    textProgress.value = withTiming(isActive ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
    slideProgress.value = withTiming(isActive ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [isActive]);

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(textProgress.value, [0, 1], ["black", "white"]),
  }));

  const backgroundStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [{ translateY: `${transform.value}%` }],
  }));

  const startSlideStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideProgress.value * -SLIDE_HEIGHT }],
  }));

  const stopSlideStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - slideProgress.value) * SLIDE_HEIGHT }],
    opacity: slideProgress.value,
  }));

  return (
    <Pressable
      style={[
        styles.button,
        isActive && styles.stopButton,
        { position: "relative", overflow: "hidden" },
      ]}
      onPress={onPress}
    >
      <View style={{ height: 20, overflow: "hidden", position: "relative" }}>
        <Animated.Text
          style={[styles.buttonText, animatedTextStyle, startSlideStyle]}
        >
          Start
        </Animated.Text>
        <Animated.Text
          style={[
            styles.buttonText,
            animatedTextStyle,
            stopSlideStyle,
            { position: "absolute" },
          ]}
        >
          Stop
        </Animated.Text>
      </View>

      <Animated.Text style={[styles.buttonText, animatedTextStyle]}>
        {" "}
        Session
      </Animated.Text>

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "white", zIndex: -1 },
          backgroundStyle,
        ]}
      />
    </Pressable>
  );
};

export default SessionButton;

const styles = StyleSheet.create({
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
});
