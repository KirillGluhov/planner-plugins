import { usePlugins } from "@/providers/PluginProvider";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Platform, StyleSheet, ScrollView } from "react-native"
import WebView from "react-native-webview"

const CustomPage = () => {
    const { id } = useLocalSearchParams();
    const {getPlugin} = usePlugins();
    const plugin = getPlugin(id.toString());

    return <ScrollView>
    {
        plugin ?
        (Platform.OS === 'web' ?
        <iframe
            srcDoc={plugin}
            style={{ width: '100%', height: 500, border: 'none' }}
        /> :
        <WebView
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            source={{ html: plugin }}
            style={styles.webview}
        />) : null

    }</ScrollView>
}

const styles = StyleSheet.create({
    webview: {
        height: 500,
        width: '100%',
        borderWidth: 2,
        borderColor: "#007AFF",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }
})

export default CustomPage;