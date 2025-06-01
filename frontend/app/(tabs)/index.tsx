import { StyleSheet, ScrollView, RefreshControl } from "react-native";

import Card from "@/components/Card";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";

interface Issue {
  issueType: string;
  location: string;
  imageurl: string;
}

export default function TabOneScreen() {
  const [data, setData] = useState<Issue[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = () => {
    setRefreshing(true);
    fetch(`localhost`)
      .then((response) => response.json())
      .then((result) => {
        const new_data = result.rows.map((item: any) => ({
          issueType: item.issue_type || "Unknown Type",
          location: item.location || "Unknown Location",
          imageurl: item.image_url || "https://picsum.photos/700",
        }));
        setData(new_data);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setRefreshing(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <View style={styles.separator}>
          {data.map((item, index) => (
            <Card
              key={index}
              issueType={item.issueType}
              location={item.location}
              imageurl={item.imageurl}
            />
          ))}
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
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginVertical: 20,
    gap: 50,
  },
});
