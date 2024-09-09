import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type HugCounterProps = {
  initialCount: number;
  onHug: (newCount: number) => void;
};

const HugCounter = ({ initialCount, onHug }: HugCounterProps) => {
  const [count, setCount] = useState(initialCount);
  const [isHugged, setIsHugged] = useState(false);

  const handleHug = () => {
    const newCount = isHugged ? count - 1 : count + 1;
    setCount(newCount);
    setIsHugged(!isHugged);
    onHug(newCount);
  };

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <TouchableOpacity style={[styles.container]} onPress={handleHug}>
      <Ionicons
        name={isHugged ? "heart" : "heart-outline"}
        size={24}
        color={isHugged ? "red" : "black"}
      />

      <Text>{count}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default HugCounter;
