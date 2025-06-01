import { StyleSheet, ScrollView } from "react-native";

import Card from "@/components/Card";
import { View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.separator}>
          <Card />
          <Card />
          <Card />
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
