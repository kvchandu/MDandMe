import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";

type DescriptionProps = {
  description: string;
};

const Description = ({ description }: DescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 250;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const previewText =
    description.length > previewLength
      ? description.slice(0, previewLength) + "..."
      : description;

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={styles.container}>
        <Text style={styles.description}>
          {isExpanded ? description : previewText}
        </Text>
        {description.length > previewLength && (
          <Text style={styles.expandButton}>
            {isExpanded ? "Show less" : "Read more"}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 3,
    padding: 10,
  },
  description: {
    fontSize: 17,
  },
  expandButton: {
    color: "blue",
    marginTop: 5,
    textAlign: "right",
  },
});

export default Description;
