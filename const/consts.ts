import { Href } from "expo-router"

export interface MenuItemType {
    path: Href,
    icon?: string,
    text: string
}

export const menuItems: MenuItemType[] = [
    {path: "/", icon: '@/assets/icons/home.svg', text: "Главная"},
    {path: '/profile', icon: '@/assets/icons/profile.svg', text: "Профиль"}
]