type ComponentType = "component" | "page";
type LocationType = "sidemenu" | "page";

export interface ManifestType
{
    name?: string | null,
    version?: string | null,
    files?: string[] | null,
    description?: string | null,
    entry?: string,
    type?: ComponentType | null,
    location?: LocationType | null
}