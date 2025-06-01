import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Avatar, Button, Card, Text } from "react-native-paper";
// import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
// import { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
// import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { styles } from "./styles";

const LeftContent = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="folder" />
);

const card = () => (
  <Card style={styles.card} theme={{ roundness: 10 } as ThemeProp}>
    <View style={{ padding: 10 }}>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <TouchableOpacity style={styles.locationCardButton}>
        <MaterialIcons name="location-pin" size={24} color="white" />
      </TouchableOpacity>
    </View>
    <Card.Content>
      <Text variant="titleLarge">Type of Incident</Text>
      <Text variant="bodyMedium">Location</Text>
    </Card.Content>
    <Card.Actions>
      {/* <TouchableOpacity>
        <FontAwesome name="arrow-up" size={40} color="#1f2937" />
      </TouchableOpacity> */}
      <Button textColor={"#ffff"} style={styles.cardButton}>
        View
      </Button>
    </Card.Actions>
  </Card>
);

export default card;
