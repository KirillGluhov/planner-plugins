import menuItemIconPath  from '@/assets/icons/menu-item.svg';
import icons from '@/const/icons';

export const getIconSource = (iconPath?: string) => {
    
    if(!iconPath)
    {
        return menuItemIconPath
    }

    if (iconPath.match(/http/))
    {
        return {uri: iconPath}
    }

    const iconKey = iconPath.split("/").pop()?.replace(".svg", "");

    if (iconKey && icons[iconKey])
    {
        return icons[iconKey];
    }

    return menuItemIconPath;
}