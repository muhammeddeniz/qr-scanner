import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Modal from "react-native-modal";
import SvgQRCode from "react-native-qrcode-svg";

import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  setVisible?: (...args: any[]) => any;
  qrCode: string;
};

const { width } = Dimensions.get("screen");

const QrCodeModal: React.FC<Props> = ({ visible, setVisible, qrCode }) => {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.8}
      animationIn="bounceIn"
      animationOut="bounceOut"
      onBackdropPress={() => setVisible(false)}
    >
      <View style={styles.modalInner}>
        <SvgQRCode
          value={qrCode ? qrCode : " "}
          backgroundColor="#d2d2d2"
          size={width * 0.4}
        />
        <Button
          style={styles.button}
          text="Close"
          onPress={() => setVisible(false)}
        >
          <AntDesign name="closecircle" size={24} color="#fff" />
        </Button>
      </View>
    </Modal>
  );
};

export default React.memo(QrCodeModal);

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    justifyContent: "center",
  },
  modalInner: {
    padding: 20,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "#d2d2d2",
    width: width * 0.6,
  },
});
