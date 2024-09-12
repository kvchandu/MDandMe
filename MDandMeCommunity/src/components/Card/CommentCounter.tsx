import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

type CommentCounterProps = {
  initialCount: number;
  onCommentClick: () => void;
};

const CommentCounter = ({
  initialCount,
  onCommentClick,
}: CommentCounterProps) => {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    onCommentClick();
  };

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <TouchableOpacity style={[styles.button]} onPress={handleClick}>
      <View style={styles.container}>
        <Feather name="message-square" size={24} color="black" />
        <Text>{count} Comments</Text>
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 110,
  },
  count: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default CommentCounter;
