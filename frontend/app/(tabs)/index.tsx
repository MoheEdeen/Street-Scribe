import { StyleSheet, ScrollView, RefreshControl, FlatList } from "react-native";

import Card from "@/components/Card";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
interface Issue {
  issueType: string;
  location: string;
  imageUrl: string;
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
      },
      {
        issueType: "Broken Streetlight",
        location: "3rd St and Pine St",
        imageUrl: "https://picsum.photos/700",
      },
      {
        issueType: "Fallen Tree",
        location: "4th St and Oak St",
        imageUrl: "https://picsum.photos/700",
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
      <ScrollView
        style={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <View style={{ backgroundColor: "transparent" }}>
          <FlatList
            data={filteredData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.separator}>
                <Card
                  issueType={item.issueType}
                  location={item.location}
                  imageUrl={item.imageUrl}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
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
