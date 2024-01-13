import { Text } from 'react-native'
import { colors } from '../../utils/colors'


const CustomText = ({ color, size, fontFam, text, style, lineHeight }) => {
    return (
        <Text
            style={[
                {
                    color: color || colors.primary,
                    fontSize: size || 12,
                    fontFamily: fontFam || "SF-Compact-Text-Regular",
                }, style
            ]}
        >
            {text}
        </Text >
    )
}
export default CustomText
