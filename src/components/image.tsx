import {Image as ExpoImage, ImageProps } from "expo-image"
import fileService from "../service/file.service";
const getFullUrl = (url: any) => {
    return typeof url === 'string' && url.startsWith('upload') ? fileService.getFullUrl(url) :url;
}
export const Image = (props: ImageProps) => {
    return <ExpoImage {...props} source={getFullUrl(props.source)} cachePolicy="disk" />
}