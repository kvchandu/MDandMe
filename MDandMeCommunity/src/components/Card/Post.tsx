import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
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
  isHugged: boolean;
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
  isHugged,
  onCommentClick,
}: PostProps) => {
  const handleHug = (newCount: number, isHugged: boolean) => {
    onHug(post_url, newCount, isHugged);
  };
  const handleCommentClick = () => {
    onCommentClick(post_url);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 250;

  const previewText =
    patient_description.length > previewLength
      ? patient_description.slice(0, previewLength) + "..."
      : patient_description;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.date}>
        {new Date(created_at).toLocaleDateString()}
      </Text>
      <Text style={styles.hugs}>Hugs: {num_hugs}</Text> */}
        {/* <Text style={styles.description} numberOfLines={3}>
          {patient_description}
        </Text> */}
        <Text style={styles.description}>
          {isExpanded ? patient_description : previewText}
        </Text>
        <Text style={styles.expandButton}>{isExpanded ? "" : "Read more"}</Text>
        {isExpanded && (
          <TouchableOpacity
            style={styles.fullAssessmentButton}
            onPress={handleCommentClick}
          >
            <Text style={styles.fullAssessmentButtonText}>
              View Full Assessment
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.bottomRow}>
          <HugCounter
            initialCount={num_hugs}
            hugStatus={isHugged}
            onHug={handleHug}
          />
          <CommentCounter
            initialCount={num_comments}
            onCommentClick={handleCommentClick}
          />
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
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
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  expandButton: {
    color: "blue",
    marginTop: 5,
    textAlign: "center",
    marginBottom: 5,
  },
  fullAssessmentButton: {
    // backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  fullAssessmentButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Post;
