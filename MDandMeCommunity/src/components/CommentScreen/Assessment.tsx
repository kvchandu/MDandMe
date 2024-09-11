import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import AssessmentSection from "./AssessmentSection";

type AssessmentProps = {
  assessment: string;
};
const Assessment = ({ assessment }: AssessmentProps) => {
  const [sections, setSections] = useState<string[]>();
  useEffect(() => {
    if (assessment) {
      setSections(assessment.split("### ").filter(Boolean));
    }
  }, [assessment]);

  return (
    <View>
      {/* <Text style={styles.container}>{assessment}</Text> */}

      {sections?.map((item, index) => (
        <AssessmentSection key={index} text={item}></AssessmentSection>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15, marginBottom: 15, borderWidth: 3 },
});

export default Assessment;
