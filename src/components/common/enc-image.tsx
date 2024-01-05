import { Image as ExpoImage, ImageProps } from "expo-image"
import fileService from "@/service/file.service";
import { useCallback, useEffect, useState } from "react";
import mime from 'mime/dist/src/index_lite';
export interface EncImageProps extends ImageProps {
    enc_key: string;
}
export default (props: EncImageProps) => {
    const [data, setData] = useState<any>();
    const getSource = useCallback(async (source: any) => {
        if (typeof source != 'string') {
            return source;
        }
        if (source.startsWith('http')) {
            return source;
        }
        if (source.startsWith('file://')) {
            return source;
        }
        const base64 = await fileService.getEnFileContent(source, props.enc_key);
        const mimeType = mime.getType(source);
        return `data:${mimeType};base64,${base64}`;
    }, []);
    useEffect(() => {
        getSource(props.source).then((data) => {
            setData(data);
        });
    }, [props.source]);
    return (data ? <ExpoImage {...props} source={data} cachePolicy="memory-disk" /> : null)
}