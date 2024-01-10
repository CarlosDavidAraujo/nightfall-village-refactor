import { View, ViewProps } from "react-native"
import { Typography } from "../typography/Typography"

interface IconNumberProps extends ViewProps {
  number: number
}

export const IconNumber = ({ number, className, ...rest }: IconNumberProps) => {
  return (
    <View
      className={"bg-primary-foreground rounded-full p-1 " + className}
      {...rest}
    >
      <Typography color="primary">{number}</Typography>
    </View>
  )
}
