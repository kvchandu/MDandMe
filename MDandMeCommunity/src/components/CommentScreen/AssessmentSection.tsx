import { Text, StyleSheet, View } from "react-native";

type AssessmentSectionProps = {
  text: string;
};

const AssessmentSection = ({ text }: AssessmentSectionProps) => {
  const heading = text.split("\n\n")[0];
  const content = text.split("\n\n").slice(1);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      {content.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15, marginBottom: 15, borderWidth: 3, padding: 10 },
  heading: {
    fontSize: 20,
  },
});

export default AssessmentSection;
