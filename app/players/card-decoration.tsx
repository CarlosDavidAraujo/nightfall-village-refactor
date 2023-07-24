import { View } from "react-native"

type CardDecorationProps = {
  tl?: boolean
  tr?: boolean
  br?: boolean
  bl?: boolean
}

export function CardDecoration({ tl, tr, br, bl }: CardDecorationProps) {
  return (
    <>
      {tl && (
        <View className="bg-primary-foreground h-3 w-3 self-start rounded-br-full absolute -top-1 -left-1" />
      )}
      {tr && (
        <View className="bg-primary-foreground h-3 w-3 self-start rounded-bl-full absolute -top-1 -right-1" />
      )}
      {br && (
        <View className="bg-primary-foreground h-3 w-3 self-start rounded-tl-full absolute -bottom-1 -right-1" />
      )}
      {bl && (
        <View className="bg-primary-foreground h-3 w-3 self-start rounded-tr-full absolute -bottom-1 -left-1" />
      )}
    </>
  )
}
