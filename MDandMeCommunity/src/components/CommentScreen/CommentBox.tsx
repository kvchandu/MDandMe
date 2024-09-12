import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import Comment from "./Comment";
import { CommentData } from "../../types/CommentData";
import palette from "../../assets/colors";

type CommentBoxProps = {
  initialComments: { [key: string]: CommentData };
  postUrl: string;
};

const CommentBox = ({ initialComments, postUrl }: CommentBoxProps) => {
  const [comments, setComments] = useState(initialComments);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyName, setReplyName] = useState("");
  const API_URL = "http://0.0.0.0:8000/add-comment";

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const renderComments = (parentId: number | null, level: number) => {
    return Object.values(comments)
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <Comment
          key={comment.id.toString()}
          postUrl={postUrl}
          comment={comment}
          comments={comments}
          level={level}
          onAddReply={addReply}
        />
      ));
  };

  const addReply = (newComment: CommentData) => {
    setComments((prevComments) => ({
      ...prevComments,
      [newComment.id]: newComment,
    }));
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const submitReply = async () => {
    if (replyText.trim() === "" || replyName.trim() === "") {
      alert("Please enter both a name and a comment.");
      return;
    }

    const newComment: CommentData = {
      id: Date.now(), // Temporary ID, will be replaced by the server
      parent_id: null,
      display_name: replyName,
      text: replyText,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_url: postUrl,
          parent_id: 0,
          display_name: replyName,
          text: replyText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      newComment.id = data.comment_id;

      addReply(newComment);
      setIsReplying(false);
      setReplyText("");
      setReplyName("");
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("Failed to submit reply. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!isReplying ? (
        <View style={styles.replyButtonContainer}>
          <TouchableOpacity onPress={handleReply} style={styles.replyButton}>
            <Text style={styles.replyButtonText}>Add Comment</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.replyContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={replyName}
            onChangeText={setReplyName}
          />
          <TextInput
            style={styles.input}
            placeholder="Your reply"
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />
          <Button title="Submit Reply" onPress={submitReply} />
          <Button title="Cancel" onPress={() => setIsReplying(false)} />
        </View>
      )}
      {Object.keys(comments).length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <View>
            <Text style={styles.emptyStateText}>
              There are no comments yet. Be the first to start a discussion!
            </Text>
          </View>
        </View>
      ) : (
        renderComments(null, 0)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.PRIMARY,
    marginBottom: 10,
  },

  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  replyButton: {
    marginTop: 4,
    marginBottom: 10,
  },
  replyButtonText: {
    color: "#007AFF",
  },
  replyButtonContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  replyContainer: {},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

export default CommentBox;
