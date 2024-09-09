import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

type CommentCounterProps = {
  initialCount: number;
};

const CommentCounter = ({ initialCount }: CommentCounterProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <TouchableOpacity style={[styles.container]}>
      <Feather name="message-square" size={24} color="black" />
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

export default CommentCounter;
