export interface PathType
{
    path: `/plugin/${string}`,
    icon?: string,
    text?: string
}

export interface ManifestType
{
    id: string,
    name?: string | null,
    version?: string | null,
    files?: string[] | null,
    description?: string | null,
    entry?: string | null,
    menuItem?: PathType | null
}