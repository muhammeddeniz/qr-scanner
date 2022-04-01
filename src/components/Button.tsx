import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";

type Props = TouchableOpacityProps & {
  text: string;
  style: any;
  onPress: (...args: any[]) => any;
  children?: JSX.Element;
};

const Button: React.FC<Props> = ({
  onPress,
  text,
  style,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => onPress()}
      {...props}
    >
      {children}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#167FFC",
    borderRadius: 12,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 15,
  },
});
