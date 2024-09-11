import { View, Text } from "react-native";

type CommentBoxParentProps = {
  content: string;
};

const CommentBoxParent = ({ content }: CommentBoxParentProps) => {
  return (
    <View>
      <Text>Comments</Text>
      <CommentBox comments={commentsData} />
    </View>
  );
};

export default CommentBoxParent;
