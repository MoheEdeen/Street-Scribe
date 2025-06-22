import * as React from "react";
import {
  Alert,
  Linking,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Portal, Modal, Button, Card, Text } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { styles } from "./styles";

const card = ({
  issueType,
  location,
  imageurl,
  description,
  upvoteCount,
  hasUpvoted,
  onUpvoteToggle,
}: any) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { width, height } = useWindowDimensions();

  const toGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(location);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Alert.alert("Open in Maps", "Do you want to open this location in Maps?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Open",
        onPress: async () => {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert("Error", "Maps is not supported on this device");
          }
        },
      },
    ]);
  };

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

            <TouchableOpacity onPress={toGoogleMaps}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: 16,
                  color: "#000",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                {location}
              </Text>
            </TouchableOpacity>

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
            <View>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: "#333",
                  textAlign: "left",
                  marginTop: 16,
                  paddingHorizontal: 4,
                }}
              >
                {description}
              </Text>
            </View>
          </View>
        </Modal>
      </Portal>

      <Card style={styles.card} theme={{ roundness: 10 } as ThemeProp}>
        <View style={{ padding: 10 }}>
          <Card.Cover source={{ uri: imageurl }} />
          <TouchableOpacity style={styles.locationCardButton}>
            <MaterialIcons
              onPress={toGoogleMaps}
              name="location-pin"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <Card.Content>
          <Text variant="titleLarge">{issueType}</Text>
          <Text variant="bodyMedium">{location}</Text>
        </Card.Content>

        <Card.Actions
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={onUpvoteToggle}>
              <MaterialIcons
                name={hasUpvoted ? "thumb-up" : "thumb-up-off-alt"}
                size={24}
                color={hasUpvoted ? "#1976D2" : "#aaa"}
                style={{ marginRight: 8 }}
              />
            </TouchableOpacity>
            <Text>{upvoteCount}</Text>
          </View>

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
