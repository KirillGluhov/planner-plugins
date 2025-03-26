import CustomDrawerContent from "@/components/menu/CustomDrawerContent";
import { useFonts } from "expo-font";
//import { SplashScreen } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import {Drawer} from "expo-router/drawer";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'GothamPro': require('../assets/fonts/gothampro.ttf'),
    'GothamPro-Bold': require("../assets/fonts/gothampro_bold.ttf")
  })

  useEffect(() => {
    if (loaded || error)
    {
      SplashScreen.hideAsync();
    }
  },[loaded, error])

  if (!loaded && !error)
  {
    return null;
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props}/>}
        screenOptions={{
          drawerStyle: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }
        }}
      >
        <Drawer.Screen name="profile" options={{title: "Профиль"}}/>
        <Drawer.Screen name="index" options={{title: "Главная"}}/>
        <Drawer.Screen name="plugins" options={{title: "Плагины"}}/>
      </Drawer>
    </GestureHandlerRootView>
  );
}
