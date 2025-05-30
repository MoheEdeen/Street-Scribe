import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import { styles } from "./styles";

const FormInputs = ({
  description,
  setDescription,
  longitude,
  latitude,
  setLatitude,
  setLongitude,
  issueType,
  setIssueType,
  pickerRef,
}: any) => {
  return (
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
          value={latitude}
          onChangeText={setLatitude}
          placeholderTextColor="#999"
        />
        <TextInput
          keyboardType="numeric"
          style={[styles.input, styles.halfWidthInput]}
          placeholder="Enter Longitude"
          value={longitude}
          onChangeText={setLongitude}
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
  );
};

export default FormInputs;
