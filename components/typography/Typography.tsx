import { Text } from "react-native"
import { TextProps } from "react-native"

interface TypographyProps extends TextProps {
  align?: "start" | "end" | "center" | "right" | "left" | "justify"
  color?: string
  variant?: "header" | "title" | "body" | "small"
}

const variantStyles = {
  header: "text-4xl",
  title: "text-2xl",
  body: "text-lg",
  small: "text-lg",
}

export function Typography({
  children,
  color = "primary-foreground",
  align = "start",
  variant = "body",
  className,
  ...rest
}: TypographyProps) {
  return (
    <Text
      style={{
        fontFamily:
          variant === "small"
            ? "Balthazar_400Regular"
            : "GermaniaOne_400Regular",
      }}
      className={
        `flex-shrink
      ${variantStyles[variant]} 
      text-${color} text-${align} ` + className
      }
      {...rest}
    >
      {children}
    </Text>
  )
}
