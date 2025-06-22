import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "@/components/Card";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
interface Issue {
  id: any;
  issueType: string;
  location: string;
  imageUrl: string;
  description: string;
  upvoteCount: number;
  hasUpvoted: boolean;
}

export default function TabOneScreen() {
  const [data, setData] = useState<Issue[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const UpvoteToggle = async (index: number) => {
    try {
      const deviceId = await AsyncStorage.getItem("@device_id");
      const report = data[index];

      await fetch("http://localhost/toggle-upvote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportId: report.id,
          deviceId: deviceId,
        }),
      });

      const updated = [...data];
      updated[index].hasUpvoted = !report.hasUpvoted;
      updated[index].upvoteCount += report.hasUpvoted ? 1 : -1;
      setData(updated);
      setFilteredData(updated);
    } catch (error) {
      console.error("Failed to toggle upvote:", error);
    }
    // const updated = [...data];
    // updated[index].hasUpvoted = !updated[index].hasUpvoted;
    // updated[index].upvoteCount += updated[index].hasUpvoted ? 1 : -1;
    // setData(updated);
    // setFilteredData(updated);
  };
  const fetchData = async () => {
    setRefreshing(true);
    try {
      const deviceId = await AsyncStorage.getItem("@device_id");
      fetch(`http://localhost/api/streetscribe?device_id=${deviceId}`)
        .then((response) => response.json())
        .then((result) => {
          const new_data = result.rows.map((item: any) => ({
            id: item.id || "Unknown ID",
            issueType: item.issue_type || "Unknown Type",
            location: item.location || "Unknown Location",
            imageUrl: item.image_url || "https://picsum.photos/700",
            description: item.description || "Description",
            upvoteCount: item.upvote_count || 0,
            hasUpvoted: item.has_upvoted || false,
          }));
          setData(new_data);
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          setRefreshing(false);
        });

      setSearchQuery("");
    } catch (err) {
      console.error("Failed to get device ID:", err);
      setRefreshing(false);
    }
  };
  const filterData = () => {
    const filtered = data.filter((item) =>
      item.issueType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };
  useEffect(() => {
    fetchData();
    // const dummy = [
    //   {
    //     id: "1",
    //     issueType: "Graffiti",
    //     location: "2nd St and Elm St",
    //     imageUrl: "https://picsum.photos/700",
    //     description:
    //       "Vandalism on the side of a building with spray paint tags",
    //     upvoteCount: 0,
    //     hasUpvoted: false,
    //   },
    //   {
    //     id: "2",
    //     issueType: "Broken Streetlight",
    //     location: "3rd St and Pine St",
    //     imageUrl: "https://picsum.photos/700",
    //     description:
    //       "Street light pole is damaged and not functioning, creating safety hazard",
    //     upvoteCount: 0,
    //     hasUpvoted: false,
    //   },
    //   {
    //     id: "3",
    //     issueType: "Fallen Tree",
    //     location: "4th St and Oak St",
    //     imageUrl: "https://picsum.photos/700",
    //     description:
    //       "Large tree has fallen across the sidewalk blocking pedestrian access",
    //     upvoteCount: 0,
    //     hasUpvoted: false,
    //   },
    // ];
    // setData(dummy);
    // setFilteredData(dummy);
  }, []);
  useEffect(() => {
    filterData();
  }, [searchQuery, data]);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          marginVertical: 20,
          backgroundColor: "transparent",
          borderBottomWidth: 1.5,
        }}
      />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "transparent" }}
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        renderItem={({ item, index }) => (
          <View style={styles.separator}>
            <Card
              issueType={item.issueType}
              location={item.location}
              imageurl={item.imageUrl}
              description={item.description}
              upvoteCount={item.upvoteCount}
              hasUpvoted={item.hasUpvoted}
              onUpvoteToggle={() => UpvoteToggle(index)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    marginHorizontal: 20,
  },
  separator: {
    backgroundColor: "transparent",
    marginVertical: 20,
    gap: 50,
  },
});
