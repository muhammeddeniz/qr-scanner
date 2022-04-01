import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  goBack?: (...args: any[]) => any;
  showSettings?: boolean;
  style?: any;
};

const Header: React.FC<Props> = ({ title, goBack, showSettings, style }) => {
  const navigation: any = useNavigation();

  const goToSettings = useCallback(
    () => navigation.navigate("SettingsScreen"),
    []
  );

  return (
    <View style={[styles.container, style]}>
      {goBack ? (
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="ios-arrow-back-circle-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyView} />
      )}

      <Text style={styles.title}>{title}</Text>

      {showSettings ? (
        <TouchableOpacity onPress={goToSettings}>
          <Ionicons name="settings-outline" size={32} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyView} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  emptyView: {
    width: 32,
    height: 32,
  },
});
