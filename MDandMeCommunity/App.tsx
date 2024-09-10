import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PostList from "./src/components/PostList";
import CommentSection from "./src/components/CommentScreen/CommentSection";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Comments: { post_url: string; initialIsHugged: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PostList}
          options={{ title: "Community" }}
        />
        <Stack.Screen name="Comments" component={CommentSection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
