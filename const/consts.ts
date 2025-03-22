import { Href } from "expo-router"

export interface MenuItemType {
    path: Href,
    icon?: string,
    text: string
}

export const menuItems: MenuItemType[] = [
    {path: "/", icon: '@/assets/icons/home.png', text: "Главная"},
    {path: '/profile', icon: '@/assets/icons/profile.png', text: "Профиль"},
    {path: '/plugins', icon: '@/assets/icons/plugin.png', text: "Плагины"}
]