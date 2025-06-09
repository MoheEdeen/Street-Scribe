import * as React from "react";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Portal, Modal, Button, Card, Text } from "react-native-paper";
// import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
// import { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
// import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { styles } from "./styles";

// const LeftContent = (props: { size: number }) => (
//   <Avatar.Icon {...props} icon="folder" />
// );

const card = ({ issueType, location, imageurl }: any) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { width, height } = useWindowDimensions();
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: width * 0.9,
              minHeight: height * 0.3,
              backgroundColor: "white",
              borderRadius: 16,
              padding: 20,
              zIndex: 9999,
              overflow: "hidden",
              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              {issueType} Incident
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#555",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              {location}
            </Text>

            <View
              style={{ width: "100%", borderRadius: 12, overflow: "hidden" }}
            >
              <Card.Cover
                source={{ uri: imageurl }}
                style={{
                  height: 180,
                  borderRadius: 12,
                }}
                resizeMode="cover"
              />
            </View>
          </View>
        </Modal>
      </Portal>
      <Card style={styles.card} theme={{ roundness: 10 } as ThemeProp}>
        <View style={{ padding: 10 }}>
          <Card.Cover source={{ uri: imageurl }} />
          <TouchableOpacity style={styles.locationCardButton}>
            <MaterialIcons name="location-pin" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Card.Content>
          <Text variant="titleLarge">{issueType}</Text>
          <Text variant="bodyMedium">{location}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            textColor={"#ffff"}
            style={styles.cardButton}
            onPress={showModal}
          >
            View
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

export default card;
