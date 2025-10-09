import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, View } from "react-native";

const { width } = Dimensions.get("window");

const AudioWaves = () => {
  // number of bars across the screen
  const barCount = Math.floor(width / 8); // decrease 8 for more bars
  const bars = Array.from({ length: barCount }, (_, i) =>
    useRef(new Animated.Value(0)).current
  );

  useEffect(() => {
    bars.forEach((bar, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: 1,
            duration: 600 + (i % 5) * 150, // staggered effect
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 0,
            duration: 600 + (i % 5) * 150,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        height: 10, // container height for waves
        overflow: "hidden",
        marginVertical: 4,
      }}
    >
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={{
            width: 2,
            height: 10, // max bar height
            marginHorizontal: 1,
            backgroundColor: "#4CAF50",
            borderRadius: 2,
            transform: [
              {
                scaleY: bar.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1], // min and max bar growth
                }),
              },
            ],
          }}
        />
      ))}
    </View>
  );
};

export default AudioWaves;
