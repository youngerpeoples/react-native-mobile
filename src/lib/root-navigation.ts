import { RootStackParamList } from "@/types";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: any, params?: any) {
    navigationRef.current?.navigate(name, params ?? {});
}
export function goBack() {
    navigationRef.current?.goBack();
}