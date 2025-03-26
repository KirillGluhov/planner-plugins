import { menuItems } from "@/const/consts";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerNavigationHelpers, DrawerDescriptorMap } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import { JSX } from "react";
import { View, StyleSheet, Image } from "react-native";
import { MenuItem } from "./MenuItem";

const CustomDrawerContent = (props: JSX.IntrinsicAttributes & { state: DrawerNavigationState<ParamListBase>; navigation: DrawerNavigationHelpers; descriptors: DrawerDescriptorMap; }) => {
    
    return <DrawerContentScrollView style={styles.wrapper}>
        <View style={styles.logo}>
            <Image source={require('@/assets/images/logo.png')}/>
        </View>
        <View style={styles.menu}>
            {menuItems.map((item) => (
                <MenuItem item={item} key={item.text}/>
            ))}
        </View>
        
        
    </DrawerContentScrollView>
}

export const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 0,
        paddingRight: 0
    },
    logo: {
        marginTop: 24, 
        marginBottom: 32, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menu: {
        display: 'flex',
        gap: 8
    }
});

export default CustomDrawerContent;