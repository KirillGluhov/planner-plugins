import { ManifestType } from "./Types";

const baseUrl = "http://81.31.247.55";
const pluginStorageServiceUrl = `${baseUrl}:8080/`;
const pluginTranspileServiceUrl = `${baseUrl}:5050/`;

export async function getPluginNames(): Promise<string[]>
{
    try {
        const response = await fetch(`${pluginStorageServiceUrl}plugins/`)
        return response.json();
    } catch (error) {
        return [];
    }
}

export async function getManifest(name: string): Promise<ManifestType>
{
    try {
        const response = await fetch(`${pluginStorageServiceUrl}plugins/manifest/${name}`)
        return response.json();
    } catch (error) {
        return {id: ''};
    }
}

export async function getPluginFile(pluginName: string): Promise<string>
{
    try {
        const response = await fetch(`${pluginTranspileServiceUrl}plugins/${pluginName}`);
        return response.text();
    } catch (error) {
        return '';
    }
}