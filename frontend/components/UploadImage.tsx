import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
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
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const pickerRef = useRef<any>(null);

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
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };
    const result = useLibrary
      ? await ImagePicker.launchImageLibraryAsync(options)
      : await ImagePicker.launchCameraAsync(options);

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <ImageDisplay currentImage={currentImage} onDelete={deleteImage} />
        <FormInputs
          description={description}
          setDescription={setDescription}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          issueType={issueType}
          setIssueType={setIssueType}
          pickerRef={pickerRef}
        />
        <ButtonGroup onSelectImage={selectImage} onUpload={uploadImage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadImageComponent;
