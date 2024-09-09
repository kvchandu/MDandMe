import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

type CommentSectionRouteProp = RouteProp<RootStackParamList, "Comments">;

type CommentSectionProps = {
  route: CommentSectionRouteProp;
};

const CommentSection = ({ route }: CommentSectionProps) => {
  const { post_url } = route.params;
  return (
    <View>
      <Text>{post_url}</Text>
    </View>
  );
};

export default CommentSection;
