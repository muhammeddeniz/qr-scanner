import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Vibration,
} from "react-native";
import Header from "../components/Header";
import { Camera } from "expo-camera";
import { FlashMode } from "expo-camera/build/Camera.types";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [openFlash, setOpenModalFlash] = useState<FlashMode>(FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Vibration.vibrate();
    navigation.navigate("ScanDetail", { data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const goBack = () => navigation.goBack();

  const onFlashPress = () => {
    if (openFlash === FlashMode.off) setOpenModalFlash(FlashMode.torch);
    else setOpenModalFlash(FlashMode.off);
  };

  const generateInner = () => (
    <>
      <View style={{ flex: 1.2 }} />
      <View style={styles.cameraLine} />
      <View style={{ flex: 1 }} />
      <View style={[styles.boxContainer]}>
        <TouchableOpacity
          style={[
            styles.box,
            {
              backgroundColor:
                openFlash === FlashMode.torch ? "#106fdc" : "#eee",
            },
          ]}
          onPress={onFlashPress}
        >
          <Ionicons
            name="ios-flashlight"
            size={width * 0.08}
            color={openFlash === FlashMode.torch ? "#fff" : "#111"}
          />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Scan" goBack={goBack} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <View style={styles.container}>
          <View style={{ flex: 0.1 }} />
          {scanned ? (
            <View style={[styles.camera, { backgroundColor: "#111" }]}>
              {generateInner()}
            </View>
          ) : (
            <Camera
              style={styles.camera}
              flashMode={openFlash}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
              {generateInner()}
            </Camera>
          )}

          {scanned && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)}
            >
              <AntDesign name="qrcode" size={24} color="#fff" />
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  box: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  boxContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: width * 0.9,
    marginBottom: 10,
  },
  camera: {
    backgroundColor: "#ccc",
    width: width * 0.96,
    height: height * 0.7,
    borderRadius: 12,
    shadowColor: "#FE7D55",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
    shadowRadius: 12,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: width * 0.9,
    backgroundColor: "#106fdc",
    borderRadius: 12,
    paddingVertical: 10,
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.06,
    marginLeft: 14,
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  scrollViewContentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  cameraLine: {
    width: width * 0.6,
    height: 1,
    backgroundColor: "#fff",
  },
});
