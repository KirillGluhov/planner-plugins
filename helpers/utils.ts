import menuItemIconPath  from '@/assets/icons/menu-item.png';
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

    const iconKey = iconPath.split("/").pop()?.replace(".png", "");

    if (iconKey && icons[iconKey])
    {
        return icons[iconKey];
    }

    return menuItemIconPath;
}