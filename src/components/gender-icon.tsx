import { ImageStyle } from "expo-image";
import { Image } from "./image";

export default (props: {
    name: number,
    style?: ImageStyle,
}) => {
    let icon = require('@/assets/icons/gender-unknown.svg');
    if (props.name == 1) {
        icon = require('@/assets/icons/gender-man.svg');
    } else if (props.name == 0) {
        icon = require('@/assets/icons/gender-woman.svg');
    }
    return <Image style={props.style} source={icon} />
}