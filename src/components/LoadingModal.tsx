import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
  visible: boolean;
  setVisible?: (...args: any[]) => any;
};

const LoadingModal: React.FC<Props> = ({ visible }) => {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View style={styles.modalInner}>
        <ActivityIndicator size={"large"} color={"#fff"} />
      </View>
    </Modal>
  );
};

export default React.memo(LoadingModal);

const styles = StyleSheet.create({
  modalInner: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "#5c5c5ceb",
    width: 100,
    height: 100,
  },
});
