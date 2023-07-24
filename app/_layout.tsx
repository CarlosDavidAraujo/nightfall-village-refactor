import { Slot, Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#222222",
        },
        headerTintColor: "#c7b299",
        headerTitleStyle: {
          fontFamily: "GermaniaOne_400Regular",
        },
      }}
    >
      <Slot />
    </Stack>
  )
}
