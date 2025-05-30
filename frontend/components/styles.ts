import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 1,
    maxHeight: "40%",
  },
  image: {
    width: "100%",
    height: "100%",
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
    width: "100%",
    aspectRatio: 1,
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
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  latlong: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    marginBottom: 12,
  },
  halfWidthInput: {
    flex: 1,
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
  },
  picker: {
    width: 300,
    height: 50,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 5,
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
    backgroundColor: "#02ccb4",
  },
  cameraButton: {
    backgroundColor: "#02ccb4",
  },
  uploadButton: {
    backgroundColor: "#02cc56",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
