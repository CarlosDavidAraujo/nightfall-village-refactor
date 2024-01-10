import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"

interface ButtonProps extends TouchableOpacityProps {
  inverted?: boolean
  title: string
}

export function Button({ title, inverted, disabled, ...rest }: ButtonProps) {
  const background = inverted ? "bg-primary-foreground" : "bg-primary"
  const color = inverted ? "text-primary" : "text-primary-foreground"
  const border = inverted ? "border-primary" : "border-primary-foreground"
  const disabledStyled = disabled ? "opacity-60" : ""
  return (
    <TouchableOpacity
      className={`${background} p-2 rounded border-sm ${border} ${disabledStyled}`}
      disabled={disabled}
      {...rest}
    >
      <Text
        style={{ fontFamily: "GermaniaOne_400Regular" }}
        className={`text-lg ${color} text-center`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}
