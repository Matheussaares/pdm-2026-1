import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function DraggableItem({ item }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const initialX = useSharedValue(0);
  const initialY = useSharedValue(0);
  const isPressed = useSharedValue(false);
  const itemRef = useRef(null);

  const updatePosition = (fx, fy, width, height, px, py) => {
    initialX.value = px + width / 2;
    initialY.value = py + height / 2;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (itemRef.current) {
        itemRef.current.measure(updatePosition);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const finalX = initialX.value + event.translationX;
      const finalY = initialY.value + event.translationY;

      const isDropZone = finalY > SCREEN_HEIGHT * 0.4; 
      const isLeftZone = finalX < SCREEN_WIDTH / 2;

      if (isDropZone) {
        // AUMENTAMOS O ESPAÇAMENTO AQUI!
        // Agora varia de -80 a +80 pixels, dando muito mais espaço entre as frutas
        const randomOffsetX = Math.random() * 160 - 80;
        const randomOffsetY = Math.random() * 160 - 80;

        const targetX = (isLeftZone ? SCREEN_WIDTH * 0.25 : SCREEN_WIDTH * 0.75) + randomOffsetX;
        const targetY = SCREEN_HEIGHT * 0.75 + randomOffsetY; 

        translateX.value = withSpring(targetX - initialX.value);
        translateY.value = withSpring(targetY - initialY.value);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: withSpring(isPressed.value ? 1.1 : 1.0) },
      ],
      zIndex: isPressed.value ? 9999 : 1000,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View ref={itemRef} style={[styles.item, animatedStyle]}>
        <Text style={styles.itemText}>{item}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 80,
    backgroundColor: "#FF6B6B",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
  },
  itemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DraggableItem;