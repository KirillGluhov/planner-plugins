import { getManifest, getPluginFile } from "@/api/methods";
import { ManifestType, PathType } from "@/api/Types";
import { colors } from "@/const/colors";
import { ElementType, FC, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { usePlugins } from "@/providers/PluginProvider";
import { LoadingType } from "./Types";

interface PluginCardType 
{
    pluginName: string
}

export const PluginCard: FC<PluginCardType> = ({pluginName}) => {
    const [loading, setLoading] = useState<LoadingType>(LoadingType.NOTLOADING);
    const [manifest, setManifest] = useState<null | ManifestType>(null);
    const [id, setId] = useState<string | null>(null);

    const {addPluginInfo} = usePlugins();

    const loadComponent = async () => {
        setLoading(LoadingType.LOADING);

        const plugin = await getPluginFile(pluginName);
        const path = manifest?.menuItem;

        if (id && path)
        {
            addPluginInfo({path, plugin}, id);
            setLoading(LoadingType.LOADED);
        }
        
    };

    useEffect(() => {
        const handleManifest = async () => {
            const manifestInfo = await getManifest(pluginName);

            setManifest(manifestInfo);

            if (manifestInfo?.menuItem?.path)
            {
                setId(manifestInfo?.id)
            }
        }
        
        handleManifest();
    },[])

    return <View style={styles.wrapper}>
        {manifest ? <View style={styles.card}>
        <View style={styles.nameAndVersion}>
            <Text style={styles.name}>{manifest?.name}</Text>
            <Text style={styles.version}>{manifest?.version}</Text>
        </View>
        <Text style={styles.description}>
            {manifest?.description}
        </Text>
        {
            loading === LoadingType.NOTLOADING ? 
            <TouchableOpacity style={styles.download} onPress={() => loadComponent()}>
                <Text style={styles.buttonText}>Скачать</Text>
            </TouchableOpacity> : 
            loading === LoadingType.LOADING ? 
            <Text style={styles.loadingText}>Загрузка...</Text> : 
            <Text style={styles.loadingText}>Загружено</Text>
        }
    </View> : null}
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        alignItems: "center"
    },
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
    },
    loadingText: {
        fontSize: 12,
        fontFamily: "GothamPro",
        color: colors.red
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

        /*const loadComponent = async () => {
        setLoading(true);
        try {
            const component = await import('../../components/test/Test');
            setComponent(() => component.default);
        }
        catch (e)
        {
            console.error("Ошибка");
            Alert.alert("Ошибка")
        }
        finally
        {
            setLoading(false)
        }
    }*/
    /*

    const [CalendarComponent, setComponent] = useState<ElementType | null>(null);
   
    const moduleCache: {[x: string]: any} = {};
    
    

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
    }*/