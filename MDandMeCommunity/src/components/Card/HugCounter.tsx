import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type HugCounterProps = {
  initialCount: number;
  hugStatus: boolean;
  onHug: (newCount: number, isHugged: boolean) => void;
};

const HugCounter = ({ initialCount, hugStatus, onHug }: HugCounterProps) => {
  const [count, setCount] = useState(initialCount);
  const [isHugged, setIsHugged] = useState(hugStatus);

  const handleHug = () => {
    const newCount = isHugged ? count - 1 : count + 1;
    setCount(newCount);
    setIsHugged(!isHugged);
    onHug(newCount, !isHugged);
  };

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <TouchableOpacity style={styles.button} onPress={handleHug}>
      <View style={styles.contentContainer}>
        <Ionicons
          name={isHugged ? "heart" : "heart-outline"}
          size={24}
          color={isHugged ? "red" : "red"}
        />
        <Text>{count}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#fa9d9d",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  button_active: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fa9d9d",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 50,
  },
  count: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default HugCounter;
