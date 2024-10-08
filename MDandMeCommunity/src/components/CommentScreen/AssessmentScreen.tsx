import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { useEffect, useState } from "react";
import { PostItem } from "../../types/PostItem";
import HugCounter from "../Card/HugCounter";
import Description from "./Description";
import Assessment from "./Assessment";
import CommentBox from "./CommentBox";
import palette from "../../assets/colors";

type AssessmentScreenRouteProp = RouteProp<RootStackParamList, "Comments">;

type AssessmentScreenProps = {
  route: AssessmentScreenRouteProp;
};

const AssessmentScreen = ({ route }: AssessmentScreenProps) => {
  const API_URL = "http://0.0.0.0:8000";

  const [postData, setPostData] = useState<PostItem>();
  const { post_url, initialIsHugged } = route.params;

  console.log(postData ? typeof postData["comments"] : "None");
  // console.log("Hug Status in Comment Section", initialIsHugged);

  useEffect(() => {
    getPostData();
  }, []);

  const handleHug = async (newHugCount: number, newHugStatus: boolean) => {
    console.log("In handleHug function CommentSection");
    try {
      const response = await fetch(`${API_URL}/items/hug`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_url, num_hugs: newHugCount }),
      });
      if (!response.ok) {
        throw new Error("Failed to update hug count on server");
      }
    } catch (error) {
      console.error("Error updating hug count:", error);
      // Optionally, revert the local state change if the server update fails
    }
  };

  const getPostData = async () => {
    try {
      const encodedPostUrl = encodeURIComponent(post_url);
      const response = await fetch(
        `${API_URL}/get-post?post_url=${encodedPostUrl}`
      );
      const json = await response.json();
      setPostData(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>
          {postData ? postData["title"] : "No Data Found"}
        </Text>

        <Description
          description={postData ? postData["patient_description"] : ""}
        />
        <View style={styles.buttonRow}>
          <HugCounter
            initialCount={postData ? postData["num_hugs"] : 0}
            hugStatus={initialIsHugged}
            onHug={handleHug}
          />
          <Text>Share Button</Text>
        </View>
      </View>

      <Assessment assessment={postData ? postData["assessment"] : ""} />
      <CommentBox
        initialComments={postData ? postData["comments"] : {}}
        postUrl={post_url}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: palette.BACKGROUND,
  },
  title: {
    fontSize: 35,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: palette.SECONDARY,
    padding: 5,
  },
  description: {
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 3,
    fontSize: 18,
  },
  assessment: {
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 3,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  postContainer: {
    backgroundColor: palette.PRIMARY,
    padding: 10,
    borderRadius: 10,
  },
});

export default AssessmentScreen;
