import { View, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import WebView from "react-native-webview";
import LoadingModal from "../components/LoadingModal";

type Props = {
  navigation: any;
  route: any;
};

const WebViewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { url } = route.params;

  const [loading, setLoading] = useState(true);
  const goBack = useCallback(() => navigation.goBack(), []);

  return (
    <View style={styles.container}>
      <Header
        goBack={goBack}
        style={{ paddingTop: 10, paddingHorizontal: 10 }}
        title={url}
      />

      <LoadingModal visible={loading} />
      <WebView
        style={styles.container}
        source={{ uri: url }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
