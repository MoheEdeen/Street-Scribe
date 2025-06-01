import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "#f9fafb",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    marginBottom: 24,
  },

  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    borderRadius: 16,
  },

  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#ef4444",
    borderRadius: 24,
    padding: 8,
  },

  noImageText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "500",
  },

  formContainer: {
    width: "100%",
    marginBottom: 20,
    gap: 16,
  },

  input: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    fontSize: 16,
    paddingHorizontal: 4,
    backgroundColor: "transparent",
    color: "#111827",
  },

  latlong: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  halfWidthInput: {
    flex: 1,
  },

  pickerContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
    height: 50,
  },

  picker: {
    width: "100%",
    height: 50,
    color: "#111827",
  },

  buttonContainer: {
    width: "100%",
    marginTop: 24,
    gap: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  galleryButton: {
    backgroundColor: "#374151",
  },

  cameraButton: {
    backgroundColor: "#1f2937",
  },

  uploadButton: {
    backgroundColor: "#111827",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },

  dropdown: {
    marginTop: 16,
    height: 50,
    width: "100%",
  },

  item: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textItem: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },

  placeholderStyle: {
    fontSize: 16,
    color: "#9ca3af",
  },

  selectedTextStyle: {
    fontSize: 16,
    color: "#111827",
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#1f2937",
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
  cardButton: {
    backgroundColor: "#111827",
  },
  card: {
    backgroundColor: "#ffffff",
  },
  locationCardButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#3396ff",
    borderRadius: 24,
    padding: 8,
  },
});
