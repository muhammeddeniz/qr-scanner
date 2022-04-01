import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Button from "../components/Button";
import Header from "../components/Header";

type Props = {
  navigation: any;
};

const { width } = Dimensions.get("screen");

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="dark" />

      <>
        <Header title="QR App" showSettings />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }} />

            <Button
              text="Scan The QR Code"
              style={{ marginVertical: 10 }}
              onPress={() => navigation.navigate("ScanQRCode")}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color="white"
              />
            </Button>

            <Button
              text="Generate QR Code"
              style={{}}
              onPress={() => navigation.navigate("GenerateQRCode")}
            >
              <MaterialCommunityIcons
                name="qrcode-plus"
                size={24}
                color="white"
              />
            </Button>
          </SafeAreaView>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  scrollView: {},
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
});
