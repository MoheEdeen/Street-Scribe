import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const ButtonGroup = ({ onSelectImage, onUpload }: any) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.galleryButton]}
          onPress={() => onSelectImage(true)}
        >
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cameraButton]}
          onPress={() => onSelectImage(false)}
        >
          <Text style={styles.buttonText}>Capture Image</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.uploadButton]}
        onPress={onUpload}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonGroup;
