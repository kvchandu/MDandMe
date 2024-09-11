import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CommentData } from "../../types/Comment";
import { useState } from "react";

type CommentProps = {
  comment: CommentData;
  comments: { [key: string]: CommentData };
  level?: number;
};

const Comment = ({ comment, comments, level = 0 }: CommentProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const childComments = Object.values(comments).filter(
    (c) => c.parent_id === comment.id
  );

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <View style={{ marginLeft: level * 20 }}>
      <TouchableOpacity onPress={toggleMinimize}>
        <View style={styles.commentContainer}>
          <Text style={styles.authorName}>{comment.display_name}</Text>
          {!isMinimized && (
            <>
              <Text style={styles.commentText}>{comment.text}</Text>
              <Text style={styles.timestamp}>
                {new Date(comment.created_at).toLocaleString()}
              </Text>
            </>
          )}
          <Text style={styles.minimizeIndicator}>
            {isMinimized ? "▼ Show More" : "▲ Show Less"}
          </Text>
        </View>
      </TouchableOpacity>
      {!isMinimized &&
        childComments.map((childComment) => (
          <Comment
            key={childComment.id}
            comment={childComment}
            comments={comments}
            level={level + 1}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  commentContainer: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  authorName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentText: {
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  minimizeIndicator: {
    color: "#007AFF",
    marginTop: 4,
  },
});

export default Comment;
