import { ManifestType } from "./Types";

export const baseUrl = "http://81.31.247.55:8080/";

export async function getPluginNames(): Promise<string[]>
{
    try {
        const response = await fetch(`${baseUrl}plugins/`)
        return await response.json();
    } catch (error) {
        return [];
    }
}

export async function getManifest(name: string): Promise<ManifestType>
{
    try {
        const response = await fetch(`${baseUrl}plugins/manifest/${name}`)
        return await response.json();
    } catch (error) {
        return {};
    }
}