import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
  Switch,
} from "react-native";
import Header from "../components/Header";

import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

type Props = {
  navigation: any;
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const goBack = useCallback((): void => navigation.goBack(), []);
  const toggleSwitch = useCallback(
    () => setIsEnabled((previousState) => !previousState),
    []
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: String("APPSTRING"),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" goBack={goBack} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <View style={styles.container}>
          <View style={styles.button}>
            <Text style={styles.text}>Dark Mode</Text>

            <Switch
              trackColor={{ false: "#767577", true: "#106fdc" }}
              thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.button2} onPress={onShare}>
            <Text style={styles.text2}>Share</Text>

            <Feather name="share" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  scrollViewContentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  text: {
    fontSize: width * 0.045,
    color: "#222222",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#eee",
    borderRadius: 12,
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: width * 0.9,
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#0884ff",
    borderRadius: 12,
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: width * 0.9,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text2: {
    fontSize: width * 0.045,
    color: "#fff",
    fontWeight: "500",
  },
});
