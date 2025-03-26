import { baseUrl, getManifest } from "@/api/methods";
import { ManifestType } from "@/api/Types";
import { colors } from "@/const/colors";
import { ElementType, FC, ReactNode, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system";

interface PluginCardType 
{
    pluginName: string
}

export const PluginCard: FC<PluginCardType> = ({pluginName}) => {
    const [manifest, setManifest] = useState<null | ManifestType>(null);

    const [CalendarComponent, setComponent] = useState<ElementType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const moduleCache: {[x: string]: any} = {};
    
    useEffect(() => {
        const handleManifest = async () => {
            const names = await getManifest(pluginName);
            setManifest(names);
        }
        
        handleManifest();
    },[])

    function requireModule(fileName: string, files: {[x: string]: any}) {
        if (moduleCache[fileName]) return moduleCache[fileName];

        const code = files[fileName];
        if (!code) throw new Error(`Файл ${fileName} не найден`);

        const module = { exports: {} };
        const require = (importName: string) => requireModule(importName, files);

        eval(code);

        moduleCache[fileName] = module.exports;

        return module.exports;
      }

    const downloadPlugin = async () => {
        if (manifest && manifest?.files && manifest?.entry)
        {
           try 
            {
                let files: {[x: string]: any} = {};

                if (Platform.OS === 'web')
                {
                    console.log("Начало загрузки")
                    for (const file of manifest?.files)
                    {
                        const response = await fetch(`${baseUrl}plugins/${pluginName}/${file}`);
                        files[file] = await response.text();
                    }
                }
                else
                {
                    Alert.alert("Загрузка плагина");

                    const pluginPath = `${FileSystem.documentDirectory}${pluginName}/`;
                    const dirInfo = await FileSystem.getInfoAsync(pluginPath);

                    if (!dirInfo.exists)
                    {
                        await FileSystem.makeDirectoryAsync(pluginPath, {intermediates: true});
                    }

                    for (const file of manifest?.files)
                    {
                        const localPath = `${pluginPath}${file}`;
                        const fileInfo = await FileSystem.getInfoAsync(localPath);
                        if (!fileInfo.exists)
                        {
                            Alert.alert(`Скачивание ${file}`);
                            await FileSystem.downloadAsync(`${baseUrl}plugins/${pluginName}/${file}`, localPath);
                        }
                        files[file] = await FileSystem.readAsStringAsync(localPath);
                    }
                }

                const Component = requireModule(manifest?.entry, files);
                setComponent(() => Component.default);
            }
            catch (e)
            {
                console.log("Ошибка загрузки", e);
                Alert.alert("Ошибка загрузки", `${e}`);
            }
            finally
            {
                setLoading(false);
            }

        }
    }

    return <View>
        {manifest ? <View><View style={styles.card}>
        <View style={styles.nameAndVersion}>
            <Text style={styles.name}>{manifest?.name}</Text>
            <Text style={styles.version}>{manifest?.version}</Text>
        </View>
        <Text style={styles.description}>
            {manifest?.description}
        </Text>
        <TouchableOpacity style={styles.download} onPress={() => downloadPlugin()}>
            <Text style={styles.buttonText}>Скачать</Text>
        </TouchableOpacity>
    </View>
    {
        loading ? <Text>Загрузка</Text> : CalendarComponent ? <CalendarComponent/> : null
    }
    </View> : null}
    </View>
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        padding: 12,
        gap: 8,
        backgroundColor: colors.white,
        boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
        borderRadius: 16,
        width: '75%',
        marginTop: 8
    },
    nameAndVersion: {
        flexDirection: "row",
        gap: 8
    },
    name: {
        fontSize: 16,
        fontFamily: "GothamPro-Bold",
        color: colors.red
    },
    version: {
        fontSize: 16,
        fontFamily: "GothamPro-Bold",
    },
    description: {
        fontSize: 16,
        fontFamily: "GothamPro",
    },
    download: {
        backgroundColor: colors.red,
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start'
    },
    buttonText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: "GothamPro"
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