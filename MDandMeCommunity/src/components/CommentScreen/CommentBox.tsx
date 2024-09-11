import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Comment from "./Comment";
import { CommentData } from "../../types/CommentData";

type CommentBoxProps = {
  initialComments: { [key: string]: CommentData };
  postUrl: string;
};

const CommentBox = ({ initialComments, postUrl }: CommentBoxProps) => {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const renderComments = (parentId: number | null, level: number) => {
    return Object.values(comments)
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <View key={comment.id} style={{ marginLeft: level * 20 }}>
          <Comment
            postUrl={postUrl}
            comment={comment}
            comments={comments}
            level={level}
            onAddReply={addReply}
          />
        </View>
      ));
  };

  const addReply = (newComment: CommentData) => {
    setComments((prevComments) => ({
      ...prevComments,
      [newComment.id]: newComment,
    }));
  };

  return (
    <ScrollView style={styles.container}>{renderComments(null, 0)}</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CommentBox;
