import { Typography } from "@/components/typography/Typography"
import { useEffect, useRef } from "react"
import { View, Animated, Easing } from "react-native"

export function Clock() {
  const rotationValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 120000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }, [])

  const rotateHand = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View className="border-md border-primary-foreground rounded-full">
      <View className="border-md border-primary rounded-full">
        <View className="relative items-center justify-center w-60 h-60 border-md border-primary-foreground rounded-full">
          <View className="w-3 h-3 bg-primary-foreground rounded-full" />

          <ClockMark mark="120s" align="top" />
          <ClockMark mark="30s" align="right" />
          <ClockMark mark="60s" align="bottom" />
          <ClockMark mark="90s" align="left" />

          <Animated.View
            className="absolute w-2 h-32"
            style={{
              transform: [{ rotate: rotateHand }],
            }}
          >
            <View className="w-full h-1/2 bg-primary-foreground" />
            <View className="w-full h-1/" />
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

type ClockMarkProps = {
  mark: string
  align: "top" | "bottom" | "left" | "right"
}

const alignClasses = {
  top: "top-0 mt-2",
  bottom: "bottom-0 mb-2",
  left: "left-0 ml-2",
  right: "right-0 mr-2",
}

function ClockMark({ mark, align }: ClockMarkProps) {
  return (
    <View className={`absolute ${alignClasses[align]}`}>
      <Typography>{mark}</Typography>
    </View>
  )
}
