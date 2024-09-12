import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { CommentData } from "../../types/CommentData";
import { getRelativeTime } from "../../helpers";

type CommentProps = {
  postUrl: string;
  comment: CommentData;
  comments: { [key: string]: CommentData };
  level?: number;
  onAddReply: (newComment: CommentData) => void;
};

const Comment = ({
  postUrl,
  comment,
  comments,
  level = 0,
  onAddReply,
}: CommentProps) => {
  const API_URL = "http://0.0.0.0:8000/add-comment";
  const [isMinimized, setIsMinimized] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyName, setReplyName] = useState("");

  const childComments = Object.values(comments).filter(
    (c) => c.parent_id === comment.id
  );

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
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
      parent_id: comment.id,
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
          parent_id: comment.id,
          display_name: replyName,
          text: replyText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      newComment.id = data.id; // Update with the server-generated ID

      onAddReply(newComment);
      setIsReplying(false);
      setReplyText("");
      setReplyName("");
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("Failed to submit reply. Please try again.");
    }
  };
  {
    /* <Text style={styles.minimizeIndicator}>
              
            </Text> */
  }
  return (
    <View style={{ marginLeft: level * 20 }}>
      <TouchableOpacity onPress={toggleMinimize}>
        <View style={styles.commentContainer}>
          <Text style={styles.authorName}>
            {comment.display_name}
            {isMinimized ? "  ▼ " : "  ▲ "}
          </Text>
          {!isMinimized && (
            <>
              <Text style={styles.commentText}>{comment.text}</Text>
              <Text style={styles.timestamp}>
                {getRelativeTime(comment.created_at)}
              </Text>
            </>
          )}

          {!isMinimized && (
            <View style={styles.bottomRow}>
              <>
                {!isReplying ? (
                  <TouchableOpacity
                    onPress={handleReply}
                    style={styles.replyButton}
                  >
                    <Text style={styles.replyButtonText}>Reply</Text>
                  </TouchableOpacity>
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
                    <Button
                      title="Cancel"
                      onPress={() => setIsReplying(false)}
                    />
                  </View>
                )}
              </>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {!isMinimized && (
        <>
          {childComments.map((childComment) => (
            <Comment
              postUrl={postUrl}
              key={childComment.id}
              comment={childComment}
              comments={comments}
              level={level + 1}
              onAddReply={onAddReply}
            />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  replyButton: {
    marginTop: 4,
    // marginBottom: 8,
  },
  replyButtonText: {
    color: "#007AFF",
  },
  replyContainer: {
    // marginTop: 8,
    // marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Comment;
