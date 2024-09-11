import { FlatList } from "react-native";
import Comment from "./Comment";
import { CommentData } from "../../types/CommentData";

type CommentBoxProps = {
  comments: object;
};

const CommentBox = ({ comments }: CommentBoxProps) => {
  const topLevelComments = Object.values(comments).filter(
    (comment) => comment.parent_id === null
  );
  //   console.log("topLevelComments", topLevelComments);

  return (
    <FlatList
      data={topLevelComments}
      renderItem={({ item }) => <Comment comment={item} comments={comments} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CommentBox;
