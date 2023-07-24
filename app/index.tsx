import AppLoading from "expo-app-loading"
import {
  useFonts,
  GermaniaOne_400Regular,
} from "@expo-google-fonts/germania-one"

import { Balthazar_400Regular } from "@expo-google-fonts/balthazar"

import { Home } from "./Home"

export default function App() {
  let [fontsLoaded] = useFonts({
    GermaniaOne_400Regular,
    Balthazar_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <Home />
}
