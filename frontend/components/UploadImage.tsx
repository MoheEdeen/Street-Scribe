import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const UploadImageComponent = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [issueType, setIssueType] = useState<string>("pothole");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const pickerRef = useRef<any>(null);

  useEffect(() => {
    loadImage();
  }, []);

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const loadImage = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      const sortedFiles = files.sort().reverse();
      setCurrentImage(imgDir + sortedFiles[0]);
    }
  };

  const selectImage = async (useLibrary: boolean) => {
    let result: ImagePicker.ImagePickerResult;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }
    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    await Promise.all(
      files.map((file) => FileSystem.deleteAsync(imgDir + file))
    );

    const filename = new Date().getTime() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });

    setCurrentImage(dest);
    return { uri: dest, filename };
  };

  const deleteImage = async () => {
    if (currentImage) {
      try {
        await FileSystem.deleteAsync(currentImage);
        setCurrentImage(null);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  const uploadImage = async () => {
    if (!currentImage) {
      return;
    }

    const filename = currentImage.split("/").pop() || "";
    const extension = filename.split(".").pop()?.toLowerCase();

    let mimeType = "image/jpeg";
    if (extension === "png") mimeType = "image/png";
    else if (extension === "heic") mimeType = "image/heic";
    else if (extension === "jpg") mimeType = "image/jpeg";
    else if (extension === "webp") mimeType = "image/webp";
    const formData = new FormData();

    formData.append("image", {
      uri: currentImage,
      name: filename,
      type: mimeType,
    } as any);

    // copy from .env when testing for now
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {currentImage ? (
          <View>
            <Image source={{ uri: currentImage }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>No image selected</Text>
          </View>
        )}
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#999"
        />
        <View style={styles.latlong}>
          <TextInput
            keyboardType="numeric"
            style={[styles.input, styles.halfWidthInput]}
            placeholder="Enter Latitude"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#999"
          />
          <TextInput
            keyboardType="numeric"
            style={[styles.input, styles.halfWidthInput]}
            placeholder="Enter Longitude"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            ref={pickerRef}
            selectedValue={issueType}
            onValueChange={(itemValue) => setIssueType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            <Picker.Item label="Pothole" value="pothole" />
            <Picker.Item label="Broken Streetlight" value="streetlight" />
            <Picker.Item label="Graffiti" value="graffiti" />
            <Picker.Item label="Trash Overflow" value="trash" />
            <Picker.Item label="Blocked Sidewalk" value="sidewalk" />
            <Picker.Item label="Damaged Signage" value="sign" />
            <Picker.Item label="Water Leak" value="water" />
            <Picker.Item label="Noise Complaint" value="noise" />
            <Picker.Item label="Vandalism" value="vandalism" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.galleryButton]}
          onPress={() => selectImage(true)}
        >
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cameraButton]}
          onPress={() => selectImage(false)}
        >
          <Text style={styles.buttonText}>Capture Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.uploadButton]}
          onPress={uploadImage}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  halfWidthInput: {
    width: 155,
  },
  latlong: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 320,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  noImageContainer: {
    flex: 1,
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  noImageText: {
    color: "#999",
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    height: 50,
    width: 320,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  picker: {
    height: 100,
    width: 300,
    color: "#333",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
    gap: 12,
  },
  button: {
    padding: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  galleryButton: {
    backgroundColor: "#4285F4",
    borderWidth: 0,
  },
  cameraButton: {
    backgroundColor: "#34A853",
    borderWidth: 0,
  },
  uploadButton: {
    backgroundColor: "#EA4335",
    borderWidth: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default UploadImageComponent;
