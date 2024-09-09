import { View, Text, StyleSheet, Button } from "react-native";
import HugCounter from "./HugCounter";
import { useState } from "react";

type PostProps = {
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  onHug: (post_url: string, newHugCount: number) => void;
};

const Post = ({
  post_url,
  title,
  created_at,
  num_hugs,
  patient_description,
  onHug,
}: PostProps) => {
  const handleHug = (newCount: number) => {
    onHug(post_url, newCount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>
        {new Date(created_at).toLocaleDateString()}
      </Text>
      <Text style={styles.hugs}>Hugs: {num_hugs}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {patient_description}
      </Text>
      <HugCounter initialCount={num_hugs} onHug={handleHug} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  hugs: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
});

export default Post;
