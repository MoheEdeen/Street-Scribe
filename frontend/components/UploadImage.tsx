import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import ImageDisplay from "./ImageDisplay";
import FormInputs from "./FormInputs";
import ButtonGroup from "./ButtonGroup";
import { styles } from "./styles";

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

  useEffect(() => {
    loadImage();
  }, []);

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
      const { uri } = await saveImage(result.assets[0].uri);
      setCurrentImage(uri);
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
    console.log("Uploading image...");
    if (!currentImage) return;

    const filename = currentImage.split("/").pop() || "";
    const extension = filename.split(".").pop()?.toLowerCase();
    let mimeType = "image/jpeg";
    if (extension === "png") mimeType = "image/png";
    if (extension === "heic") mimeType = "image/heic";
    if (extension === "webp") mimeType = "image/webp";

    const formData = new FormData();
    formData.append("image", {
      uri: currentImage,
      name: filename,
      type: mimeType,
    } as any);

    formData.append("description", description);
    formData.append("location", location);
    formData.append("issueType", issueType);
    console.log("Uploading to:", "http://localhost:3000/");
    fetch(`http://localhost/api/streetscribe`, {
      method: "POST",
      body: formData,
    });
    console.log("Image uploaded successfully");
    setDescription("");
    setLocation("");
    setIssueType("pothole");
    setCurrentImage(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      >
        <ImageDisplay currentImage={currentImage} onDelete={deleteImage} />
        <FormInputs
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          issueType={issueType}
          setIssueType={setIssueType}
        />
        <ButtonGroup onSelectImage={selectImage} onUpload={uploadImage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadImageComponent;
