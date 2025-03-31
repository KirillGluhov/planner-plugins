import { PathType } from "@/api/Types"
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { PluginInfoType } from "./Types";

interface PluginContextType
{
    addPath: (path: PathType, id: string) => void,
    addPlugin: (plugin: string, id: string) => void,
    addPluginInfo: (pluginAdditionalInfo: PluginInfoType, id: string) => void,

    getPluginInfo: (id: string) => PluginInfoType | undefined,
    getPath: (id: string) => PathType | undefined,
    getPlugin: (id: string) => string | undefined,
    getAllPluginInfos: () => PluginInfoType[],
    getAllPlugins: () => (string | undefined)[],
    getAllPaths: () => (PathType | undefined)[],
}

interface PluginProviderType
{
    children: ReactNode;
}

const PluginContext = createContext<PluginContextType | null>(null);

export const PluginProvider: FC<PluginProviderType> = ({children}) => {
    const [pluginInfo, setPluginInfo] = useState<Map<string, PluginInfoType>>(new Map());

    const addPlugin = (plugin: string, id: string) => {
        setPluginInfo(prev => {
            const newMap = new Map(prev);

            const path = newMap.get(id);
            newMap.set(id, {...path, plugin})
            
            return newMap;
        })
    }
    
    const addPath = (path: PathType, id: string) => {
        setPluginInfo(prev => {
            const newMap = new Map(prev);

            const plugin = newMap.get(id);
            newMap.set(id, {...plugin, path})
            
            return newMap;
        })
    }

    const addPluginInfo = (pluginAdditionalInfo: PluginInfoType, id: string) => {
        setPluginInfo(prev => {
            const newMap = new Map(prev);

            newMap.set(id, pluginAdditionalInfo);
            return newMap;
        })
    }

    const getPluginInfo = (id: string) => {
        return pluginInfo.get(id);
    }

    const getPath = (id: string) => {
        return getPluginInfo(id)?.path;
    }

    const getPlugin = (id: string) => {
        return getPluginInfo(id)?.plugin;
    }

    const getAllPluginInfos = () => {
        return [...pluginInfo.values()]
    }

    const getAllPlugins = () => {
        return getAllPluginInfos().map(pluginInfo => pluginInfo?.plugin)
    }

    const getAllPaths = () => {
        return getAllPluginInfos().map(pluginInfo => pluginInfo?.path)
    }
    

    return <PluginContext.Provider value={{
            addPlugin, addPath, addPluginInfo, getPluginInfo, getPath, getPlugin, getAllPluginInfos, getAllPlugins, getAllPaths
        }}>
        {children}
    </PluginContext.Provider>
}

export const usePlugins = () => {
    const context = useContext(PluginContext);
    if (!context) {
        throw new Error("Context doesn't exist");
      }
    return context;
}