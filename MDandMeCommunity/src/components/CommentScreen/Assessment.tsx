import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

type AssessmentProps = {
  assessment: string;
};
const Assessment = ({ assessment }: AssessmentProps) => {
  const [sections, setSections] = useState<string[]>();
  useEffect(() => {
    if (assessment) {
      const newSections = assessment.split("### ").filter(Boolean);
      setSections(assessment.split("### "));
    }
  }, [assessment]);

  return (
    <View>
      <Text style={styles.container}>{assessment}</Text>
      <Text>{sections}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15, marginBottom: 15, borderWidth: 3 },
});

export default Assessment;
