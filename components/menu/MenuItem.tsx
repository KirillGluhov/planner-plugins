import { getIconSource } from "@/helpers/functions"
import { Pressable, TouchableOpacity, Image, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { MenuItemType } from "@/const/consts"

export const MenuItem = ({item}: {item: MenuItemType}) => {
    const router = useRouter();

    return (
        <Pressable
            style={({pressed, hovered}) => [
                hovered && styles.hover,
                pressed && styles.pressed,
                styles.item
            ]}
            onPress={() => router.push(item.path)}
        >
            <TouchableOpacity onPress={() => router.push(item.path)} style={styles.menuItem}>
                <Image style={styles.image} source={getIconSource(item.icon)}/>
                <Text style={styles.text}>{item.text}</Text>
            </TouchableOpacity>
        </Pressable>
    )
}

export const styles = StyleSheet.create({
    item: {
        boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
        borderRadius: 16,
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    menuItem: {
        marginLeft: 16,
        marginTop: 12,
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
    },
    text: {
        fontFamily: "GothamPro",
        fontSize: 16,
    },
    hover: {
        boxShadow: "inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff",
    },
    pressed: {
        backgroundColor: 'white'
    }
});