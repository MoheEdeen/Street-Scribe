import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";

import Card from "@/components/Card";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
interface Issue {
  issueType: string;
  location: string;
  imageUrl: string;
  description: string;
}

export default function TabOneScreen() {
  const [data, setData] = useState<Issue[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = () => {
    setRefreshing(true);
    fetch(`localhost`)
      .then((response) => response.json())
      .then((result) => {
        const new_data = result.rows.map((item: any) => ({
          issueType: item.issue_type || "Unknown Type",
          location: item.location || "Unknown Location",
          imageUrl: item.image_url || "https://picsum.photos/700",
          description: item.description || "Description",
        }));
        setData(new_data);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setRefreshing(false);
      });
    setSearchQuery("");
  };
  const filterData = () => {
    const filtered = data.filter((item) =>
      item.issueType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };
  useEffect(() => {
    // fetchData();
    const dummy = [
      {
        issueType: "Graffiti",
        location: "2nd St and Elm St",
        imageUrl: "https://picsum.photos/700",
        description:
          "Vandalism on the side of a building with spray paint tags",
      },
      {
        issueType: "Broken Streetlight",
        location: "3rd St and Pine St",
        imageUrl: "https://picsum.photos/700",
        description:
          "Street light pole is damaged and not functioning, creating safety hazard",
      },
      {
        issueType: "Fallen Tree",
        location: "4th St and Oak St",
        imageUrl: "https://picsum.photos/700",
        description:
          "Large tree has fallen across the sidewalk blocking pedestrian access",
      },
    ];
    setData(dummy);
    setFilteredData(dummy);
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
        renderItem={({ item }) => (
          <View style={styles.separator}>
            <Card
              issueType={item.issueType}
              location={item.location}
              imageurl={item.imageUrl}
              description={item.description}
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
