import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { styles } from "./styles";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Pothole", value: "pothole" },
  { label: "Broken Streetlight", value: "streetlight" },
  { label: "Graffiti", value: "graffiti" },
  { label: "Trash Overflow", value: "trash" },
  { label: "Blocked Sidewalk", value: "sidewalk" },
  { label: "Damaged Signage", value: "sign" },
  { label: "Water Leak", value: "water" },
  { label: "Noise Complaint", value: "noise" },
  { label: "Vandalism", value: "vandalism" },
  { label: "Other", value: "other" },
];

const FormInputs = ({
  description,
  setDescription,
  location,
  setLocation,
  issueType,
  setIssueType,
}: any) => {
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === issueType && <Text>✓</Text>}
      </View>
    );
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#999"
      />
      <View style={styles.pickerContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={issueType}
          onChange={(item) => {
            setIssueType(item.value);
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default FormInputs;
