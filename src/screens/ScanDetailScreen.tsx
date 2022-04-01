import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Linking,
  Share,
} from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import * as Clipboard from "expo-clipboard";

import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PHONE_checker, URL_checker } from "../utils/Checkers";

const { width } = Dimensions.get("screen");

type Props = {
  navigation: any;
  route: any;
};

const ScanDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data } = route.params;

  const [copiedText, setCopiedText] = React.useState("");
  const [isCopied, setIsCopied] = React.useState(false);

  const goBack = (): void => navigation.goBack();

  const goBackHome = () =>
    navigation.reset({
      index: 1,
      routes: [{ name: "Home" }],
    });

  const copyToClipboard = () => {
    setIsCopied(true);

    setTimeout(async () => {
      await Clipboard.setString(String(data));
      setIsCopied(false);
    }, 1000);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: String(data),
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
      <Header title="Detail" goBack={goBack} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{String(data)}</Text>
        </View>

        <View style={styles.footer}>
          {URL_checker(String(data)) ? (
            <Button
              text="Uygulama URL'ini Ac"
              onPress={() => navigation.push("WebViewScreen", { url: data })}
              style={styles.button}
            >
              <MaterialCommunityIcons name="web" size={24} color="white" />
            </Button>
          ) : null}

          {PHONE_checker(String(data).slice(4)) ? (
            <Button
              text="Uygulama URL'ini Ac"
              onPress={() =>
                Linking.openURL(`telprompt:${String(data).slice(4)}`)
              }
              style={styles.button}
            >
              <Foundation name="telephone" size={24} color="white" />
            </Button>
          ) : null}

          <Button text="Paylaş" onPress={() => onShare()} style={styles.button}>
            <Ionicons name="ios-share-social" size={24} color="white" />
          </Button>

          <Button
            text="Panoya Kopyala"
            onPress={copyToClipboard}
            style={styles.button}
          >
            <Feather name="copy" size={24} color="white" />
          </Button>

          <Button
            text="AnaSayfaya Don"
            onPress={goBackHome}
            style={[
              styles.button,
              { backgroundColor: "#FE9526", marginTop: 40 },
            ]}
          >
            <Ionicons name="home-outline" size={24} color="white" />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScanDetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollView: {},
  scrollViewContentContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    flex: 1,
  },
  button: {
    width: width * 0.8,
    marginVertical: 5,
    alignItems: "center",
  },
  text: {
    fontSize: width * 0.05,
    color: "#111",
    fontWeight: "500",
  },
  footer: {
    paddingBottom: 20,
  },
});
