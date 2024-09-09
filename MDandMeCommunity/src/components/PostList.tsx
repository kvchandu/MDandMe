import Post from "./Card/Post";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { PostItem } from "../types/PostItem";
import { useEffect, useState } from "react";

const DATA = [
  {
    post_url:
      "37F+Experiencing+a+range+of+symptoms+including+nausea+and+frequent+urination-00001685",
    title:
      "[37F] Experiencing a range of symptoms including nausea and frequent urination",
    created_at: "2024-03-04T22:05:16.998787",
    num_hugs: 1,
    patient_description:
      "A 37-year-old female presents with a constellation of symptoms including fatigue, frequent urination, irritability, mood swings, food aversions, cravings, nausea, back pain, bloating, temperature sensitivity, and episodes of crying. The nausea is described as frequent, occurring regardless of food intake, and has been persistent for a couple of weeks, with a severity rating of 3 out of 10. The patient notes that the nausea does not seem to be triggered or alleviated by specific activities or situations. Additionally, the patient reports frequent urination that has also been occurring for a few weeks, but with no change in volume compared to usual. The patient denies the presence of fever or chills. There is also a mention of unprotected sexual activity, but no new sexual partners. No other medical conditions or symptoms were disclosed during the conversation.",
    assessment:
      "### What might be happening\n\nBased on the information you've provided, a few possibilities could explain your symptoms:\n\n- Pregnancy: Your symptoms such as fatigue, mood swings, aversion to some foods, cravings, nausea, back pain, bloating, and frequent urination are common early signs of pregnancy. Given that you've mentioned unprotected sexual activity, this could be a possibility.\n  - Pregnancy can be confirmed with a home pregnancy test or a blood test at a doctor's office.\n\n- Premenstrual Syndrome (PMS): Some of your symptoms like mood swings, food cravings, bloating, and fatigue can occur due to hormonal changes in the days leading up to your period.\n  - Treatment usually involves lifestyle changes like regular exercise, a balanced diet, and adequate sleep. Over-the-counter pain relievers can help with physical symptoms.\n\n- Urinary Tract Infection (UTI): Frequent urination and back pain can be symptoms of a UTI.\n  - UTIs are typically treated with antibiotics prescribed by a doctor.\n\n### What you can do\n\n1. Consider taking a home pregnancy test if you suspect you might be pregnant. These tests are usually accurate about a week after your missed period.\n2. Try to maintain a healthy lifestyle with regular exercise, a balanced diet, and adequate sleep. This can help manage symptoms of PMS.\n3. Drink plenty of water to help flush out your urinary tract if you suspect a UTI. However, you should still see a doctor for a proper diagnosis and treatment.\n4. Consult a healthcare professional to discuss your symptoms and get a proper diagnosis.\n\n### What you should look out for\n\nSeek immediate medical attention if:\n\n- Your symptoms worsen or persist for a prolonged period.\n- You have severe abdominal or back pain.\n- You notice blood in your urine.\n- You have a high fever, severe headache, chest pain, or other worrying symptoms.\n\nPlease remember that while I strive to provide accurate information, I'm an AI and not a substitute for professional medical advice. Always consult a healthcare professional for a formal diagnosis.",
    question: "",
    comments: {
      "3": {
        id: 3,
        parent_id: 1,
        display_name: "Archie",
        text: "I tried this before, it helped in the moment but not really later. did a bunch of PT as well",
        created_at: "2024-02-15T19:44:05.153259",
      },
      "2": {
        id: 2,
        parent_id: null,
        display_name: "Madelyn",
        text: "My brother had TMJ disorder similar to what you're describing and found PT really useful. He had to try a few different places tho, you just gotta find a good one",
        created_at: "2024-02-16T01:16:31.087576",
      },
      "1": {
        id: 1,
        parent_id: null,
        display_name: "Jessica",
        text: "I've had similar issues all my life, i think massages/myofascial release therapy is the only thing that has helped",
        created_at: "2024-02-15T19:43:03.999084",
      },
    },
  },
  {
    post_url:
      "20F+Experiencing+chest+pain+difficulty+breathing+and+vomiting-00001684",
    title: "[20F] Experiencing chest pain, difficulty breathing, and vomiting",
    created_at: "2024-03-04T21:57:52.949755",
    num_hugs: 1,
    patient_description:
      "A 20-year-old female is reporting severe chest pain described as a tight squeezing sensation around the sternum and upper left back, moderate to severe difficulty breathing, and persistent vomiting for the last two days. The patient also describes a constant, throbbing headache with an intensity of 4 out of 10, located behind the eyes and occurring daily. The patient has a medical history significant for pulmonary embolisms and deep vein thrombosis but is not currently on any preventative treatment. Additionally, the patient reports feeling clammy and has cold extremities, with no recent travel, immobilization, or use of estrogen-containing contraceptives. No new leg swelling or discoloration has been noted. The patient's symptoms are concerning and could suggest a serious condition such as a recurrent pulmonary embolism or another cardiac or respiratory issue. Immediate medical evaluation is strongly recommended.",
    assessment:
      "### What might be happening\n\nBased on the information you've provided, you're experiencing several symptoms that could indicate a serious condition. Given your history of pulmonary embolisms and deep vein thrombosis, your current symptoms of chest pain, difficulty breathing, and vomiting could potentially indicate another pulmonary embolism. This is a condition where one or more arteries in your lungs become blocked by a blood clot. This is a serious condition that can damage your lungs and other organs in your body due to reduced oxygen flow.\n\n### What you can do\n\nGiven the severity of your symptoms and your medical history, it's important to seek immediate medical attention. Please go to the nearest emergency room or call an ambulance. Do not attempt to drive yourself.\n\n### What you should look out for\n\nIf your symptoms worsen or if you experience any of the following, it's crucial to seek immediate medical attention:\n\n- Increased difficulty breathing\n- Severe chest pain\n- Coughing up blood\n- A sudden onset of sharp, severe pain in your leg\n- Swelling, redness, or warmth in your leg\n\nRemember, this advice is intended to be general in nature, and specific causes may not apply to your situation. Always consult with a healthcare provider for appropriate examination, testing, and care recommendations.",
    question: "",
    comments: {},
  },
  {
    post_url:
      "21F+With+enlarged+cervical+lymph+nodes+and+associated+symptoms-00001683",
    title: "[21F] With enlarged cervical lymph nodes and associated symptoms",
    created_at: "2024-03-04T21:56:25.217697",
    num_hugs: 1,
    patient_description:
      "A 21-year-old female presents with enlarged, painless, and rubbery lymph nodes in the neck, specifically four nodes located on the left side, behind the ear, and near the collarbone. The first node was noticed a few years ago and has increased in size recently, while the others were identified within the last month. Accompanying symptoms include fatigue, dizziness, and severe migraines that started a year ago, with pain located behind the eyes and neck, sensitivity to light, nausea, and vomiting. The migraines worsen when lying down for extended periods, and there is no known effective relief. The patient also experiences night sweats and has had significant weight loss of 30 pounds over the last six months, along with difficulty breathing that has impacted exercise and daily activities. There is a family history of hematologic or autoimmune diseases, but the patient has no personal history of chronic illnesses, is not on any medications, and has no known drug allergies.",
    assessment:
      "### What might be happening\n\nBased on the information you've provided, possible diagnoses include:\n\n- Lymphoma: This is a type of cancer that starts in the cells that are part of the body's immune system. The symptoms you've described, including enlarged lymph nodes, weight loss, night sweats, and fatigue, are common symptoms of lymphoma.\n  - Treatment typically involves chemotherapy, radiation therapy, or a combination of the two. The exact treatment plan will depend on the type and stage of the lymphoma.\n\n- Infectious Mononucleosis: This is a viral infection caused by the Epstein-Barr virus. It can cause symptoms such as fatigue, swollen lymph nodes, and night sweats. However, it is less likely given the duration of your symptoms.\n  - Treatment usually involves rest, hydration, and over-the-counter remedies for pain and fever.\n\n- Autoimmune conditions: Given your family history, it's also possible that an autoimmune condition could be causing your symptoms. Autoimmune conditions occur when your immune system mistakenly attacks your own body. Conditions such as lupus or rheumatoid arthritis could potentially cause the symptoms you're experiencing.\n  - Treatment typically involves medications to reduce inflammation and suppress the immune system.\n\n### What you can do\n\nGiven the severity and duration of your symptoms, it's important that you seek medical attention as soon as possible. Please make an appointment with your primary care provider or visit an urgent care clinic. They may refer you to a specialist, such as a hematologist or rheumatologist, for further evaluation and treatment.\n\n### What you should look out for\n\nPlease seek immediate medical attention if you experience any of the following:\n\n- Difficulty breathing or shortness of breath that is getting worse\n- Severe headache or migraine that is not relieved by over-the-counter pain medication\n- Fever or chills\n- Any new or worsening symptoms\n\nPlease remember that while I strive to provide accurate information, I am an AI and not a doctor. It's important to consult with a healthcare professional for an accurate diagnosis and treatment.",
    question: "",
    comments: {},
  },
];

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);

  const API_URL = "http://0.0.0.0:8000/items";

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const handleHug = async (post_url: string, newHugCount: number) => {
    // Update local state
    setData((prevData) =>
      prevData.map((post) =>
        post.post_url === post_url ? { ...post, num_hugs: newHugCount } : post
      )
    );

    // Send update to server
    try {
      const response = await fetch(`${API_URL}/hug`, {
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
      const response = await fetch(`${API_URL}?page=${page}&items_per_page=10`);
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
