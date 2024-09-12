import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import palette from "../../assets/colors";

type AssessmentSectionProps = {
  text: string;
};

const AssessmentSection = ({ text }: AssessmentSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const heading = text.split("\n\n")[0];
  const content = text.split("\n\n").slice(1);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpanded} style={styles.container}>
      <Text style={styles.heading}>
        {heading} {isExpanded ? "▲" : "▼"}
      </Text>
      {isExpanded && (
        <View>
          {content.map((item, index) => (
            <Text style={styles.content} key={index}>
              {item}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: palette.PRIMARY,
  },
  heading: {
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: palette.SECONDARY,
    lineHeight: 50,
    padding: 5,
    marginBottom: 10,
  },
  content: {
    fontSize: 17,
    marginBottom: 15,
  },
});

export default AssessmentSection;
