import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Alert, Platform, FlatList, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import { ScrollView } from "react-native-gesture-handler";
import { getPluginNames } from "@/api/methods";
import { PluginCard } from "./PluginCard";

export function PluginsPage()
{
    const [pluginNames, setPluginNames] = useState<string[]>([]);

    useEffect(() => {

        const handlePluginNames = async () => {
            const names = await getPluginNames();
            setPluginNames(names);
        }

        handlePluginNames();
    },[])


    return <ScrollView 
        style={styles.list}
        contentContainerStyle={childStyles.child}
    >
        {pluginNames.map((name, index) => (
            <PluginCard pluginName={name} key={`${index}_${name}`}/>
        ))}
    </ScrollView>
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
        marginTop: 16
    }
})

const childStyles = StyleSheet.create({
    child: {
        alignItems: 'center'
    }
})

/*const [pluginSaved, setPluginSaved] = useState(false);

    const downloadPlugin = async () => {
        try 
        {
            if (Platform.OS === 'web')
            {
                const response = await fetch(PLUGIN_URL);
                const pluginCode = await response.text();
                localStorage.setItem("manifest", pluginCode);
                console.log(`Манифест загружен и сохранён: `, pluginCode);
            }
            else
            {
                const {uri} = await FileSystem.downloadAsync(
                    PLUGIN_URL,
                    PLUGIN_PATH
                )
                Alert.alert(`Манифест загружен и сохранён по пути: ${uri}`)
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
                pluginCode = localStorage.getItem("manifest") || "";
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
    }*/

    /*return (<View>
        <TouchableOpacity onPress={() => downloadPlugin()}>
            <Text>Скачивание плагина</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={!pluginSaved} onPress={() => executePlugin()}>
            <Text>Запуск плагина</Text>
        </TouchableOpacity>
    </View>)*/