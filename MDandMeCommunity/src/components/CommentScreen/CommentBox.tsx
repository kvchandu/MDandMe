import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Comment from "./Comment";
import { CommentData } from "../../types/CommentData";

type CommentBoxProps = {
  comments: { [key: string]: CommentData };
};

const CommentBox = ({ comments }: CommentBoxProps) => {
  const renderComments = (parentId: number | null, level: number) => {
    console.log(parentId, level);
    return Object.values(comments)
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <View key={comment.id} style={{ marginLeft: level * 20 }}>
          <Comment comment={comment} comments={comments} level={level} />
        </View>
      ));
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
