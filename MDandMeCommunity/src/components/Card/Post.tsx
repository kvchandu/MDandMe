import { View, Text, StyleSheet, Button } from "react-native";
import HugCounter from "./HugCounter";
import { useState } from "react";
import CommentCounter from "./CommentCounter";

type PostProps = {
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  num_comments: number;
  onHug: (post_url: string, newHugCount: number, isHugged: boolean) => void;
  onCommentClick: (post_url: string) => void;
};

const Post = ({
  post_url,
  title,
  created_at,
  num_hugs,
  patient_description,
  num_comments,
  onHug,
  onCommentClick,
}: PostProps) => {
  const handleHug = (newCount: number, isHugged: boolean) => {
    onHug(post_url, newCount, isHugged);
  };
  const handleCommentClick = () => {
    onCommentClick(post_url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* <Text style={styles.date}>
        {new Date(created_at).toLocaleDateString()}
      </Text>
      <Text style={styles.hugs}>Hugs: {num_hugs}</Text> */}
      <Text style={styles.description} numberOfLines={3}>
        {patient_description}
      </Text>
      <View style={styles.bottomRow}>
        <HugCounter initialCount={num_hugs} onHug={handleHug} />
        <CommentCounter
          initialCount={num_comments}
          onCommentClick={handleCommentClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#fff",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
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
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Post;
