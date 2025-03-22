import { useState } from "react";
import { View, TouchableOpacity, Text, Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system";

const PLUGIN_PATH = FileSystem.documentDirectory + `plugin.ts`;
const PLUGIN_URL = "http://81.31.247.55:8080/";

export default function PluginsScreen()
{
    const [pluginSaved, setPluginSaved] = useState(false);

    const downloadPlugin = async () => {
        try 
        {
            if (Platform.OS === 'web')
            {
                const response = await fetch(PLUGIN_URL);
                const pluginCode = await response.text();
                localStorage.setItem("plugin", pluginCode);
                console.log(`Плагин загружен и сохранён`);
            }
            else
            {
                const {uri} = await FileSystem.downloadAsync(
                    "http://81.31.247.55:8080/",
                    PLUGIN_PATH
                )
                Alert.alert(`Плагин загружен и сохранён по пути: ${uri}`)
            }
            
            setPluginSaved(true);
        }
        catch (e)
        {
            console.error("Ошибка: ", e);
            Alert.alert("Ошибка", "Не удалось скачать и сохранить")
        }
    }

    const executePlugin = async () => {
        try {
            let pluginCode = "";
            if (Platform.OS === 'web')
            {
                pluginCode = localStorage.getItem("plugin") || "";
            }
            else
            {
                pluginCode = await FileSystem.readAsStringAsync(PLUGIN_PATH);
            }
            
            eval(pluginCode);

            console.log("Выполнение кода")
            Alert.alert("Выполнение кода");
        }
        catch (e)
        {
            console.log("Не удаётся выполнить")
            Alert.alert("Ошибка", "Не удаётся выполнить");
        }
    }

    return (<View>
        <TouchableOpacity onPress={() => downloadPlugin()}>
            <Text>Скачивание плагина</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={!pluginSaved} onPress={() => executePlugin()}>
            <Text>Запуск плагина</Text>
        </TouchableOpacity>
    </View>)
}