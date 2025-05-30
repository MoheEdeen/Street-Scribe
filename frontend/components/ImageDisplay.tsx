import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

const ImageDisplay = ({
  currentImage,
  onDelete,
}: {
  currentImage: string | null;
  onDelete: () => void;
}) => {
  return (
    <View style={styles.imageContainer}>
      {currentImage ? (
        <View>
          <Image source={{ uri: currentImage }} style={styles.image} />
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No image selected</Text>
        </View>
      )}
    </View>
  );
};

export default ImageDisplay;
