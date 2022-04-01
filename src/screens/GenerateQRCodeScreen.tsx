import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SvgQRCode from "react-native-qrcode-svg";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoadingModal from "../components/LoadingModal";
import Header from "../components/Header";
import Button from "../components/Button";
import QrCodeModal from "../components/QrCodeModal";

const { width, height } = Dimensions.get("screen");

type Props = {
  navigation: any;
};

const GenerateQRCodeScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [qrCode, setQrCode] = useState<string>("");
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState<boolean>(false);

  const inputRef = useRef<TextInput>();

  useEffect(() => {
    setModalVisible(true);
    inputRef.current.focus();

    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  }, []);

  const goBack = useCallback(() => navigation.goBack(), []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Generate QR" goBack={goBack} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.qrContainer}>
            <View style={styles.qrBox}>
              <SvgQRCode
                value={qrCode ? qrCode : " "}
                backgroundColor="#eee"
                size={width * 0.25}
              />
            </View>
          </View>

          <TextInput
            ref={inputRef}
            style={styles.input}
            multiline={true}
            value={qrCode}
            onChangeText={(t) => setQrCode(t)}
          />
        </ScrollView>
        <Button
          text="Generate"
          style={styles.generateButton}
          onPress={() => setQrCodeModalVisible(true)}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />
        </Button>
        <QrCodeModal
          visible={qrCodeModalVisible}
          qrCode="dlsfkaj"
          setVisible={setQrCodeModalVisible}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GenerateQRCodeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 12,
    width: width * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: width * 0.05,
    maxHeight: height * 0.3,
  },
  generateButton: {
    width: width * 0.612345,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  qrBox: {
    alignItems: "center",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  qrContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },
});
