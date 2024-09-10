import Post from "./Card/Post";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { PostItem } from "../types/PostItem";
import { useEffect, useState, useCallback } from "react";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

const PostList = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [lastViewedPostUrl, setLastViewedPostUrl] = useState<string | null>("");
  const isFocused = useIsFocused();

  const API_URL = "http://0.0.0.0:8000";

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isFocused && lastViewedPostUrl) {
      updatePost(lastViewedPostUrl);
      setLastViewedPostUrl(null);
    }
  }, [isFocused, lastViewedPostUrl]);

  const updatePost = async (post_url: string) => {
    try {
      const encodedPostUrl = encodeURIComponent(post_url);
      const response = await fetch(
        `${API_URL}/get-post?post_url=${encodedPostUrl}`
      );
      const updatedPost = await response.json();

      setData((prevData) =>
        prevData.map((post) =>
          post.post_url === post_url ? { ...post, ...updatedPost } : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const getHugStatus = (post_url: string): boolean => {
    const post = data.find((item) => item.post_url === post_url);
    return post ? post.is_hugged : false;
  };

  const navigateToComment = (post_url: string) => {
    setLastViewedPostUrl(post_url);
    console.log("Post URL before navigation: ", post_url);
    const post = data.find((item) => item.post_url === post_url);
    console.log(post);
    console.log("Hug Status before navigation: ", getHugStatus(post_url));
    navigation.navigate("Comments", {
      post_url: post_url,
      initialIsHugged: getHugStatus(post_url),
    });
  };

  const handleHug = async (
    post_url: string,
    newHugCount: number,
    isHugged: boolean
  ) => {
    setData((prevData) =>
      prevData.map((post) =>
        post.post_url === post_url
          ? { ...post, num_hugs: newHugCount, is_hugged: isHugged }
          : post
      )
    );

    console.log("Is Hugged Status in Handle Hug: ", isHugged);

    // Send update to server
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

  const fetchData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/items?page=${page}&items_per_page=10`
      );
      const json = await response.json();
      setData([...data, ...json.items]);
      setPage(page + 1);
      setHasMore(json.items.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const _renderItem = ({ item }: { item: PostItem }) => (
    <View style={styles.itemContainer}>
      <Post
        post_url={item.post_url}
        title={item.title}
        created_at={item.created_at}
        num_hugs={item.num_hugs}
        patient_description={item.patient_description}
        num_comments={Object.keys(item.comments).length}
        onHug={handleHug}
        onCommentClick={navigateToComment}
      />
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      style={styles.root}
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item) => item.post_url}
      onEndReached={fetchData}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#75746f",
  },
  listContainer: { paddingVertical: 20, paddingHorizontal: 5 },
  separator: {
    height: 10, // Height of the separator
    backgroundColor: "transparent",
  },
  itemContainer: {
    marginBottom: 5,
  },
});
export default PostList;
