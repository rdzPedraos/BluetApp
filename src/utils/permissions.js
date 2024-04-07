import * as ExpoDevice from "expo-device";
import { PermissionsAndroid, Platform } from "react-native";

const requestAndroidPermissions = async () => {
    const permissions = {};

    if (ExpoDevice.platformApiLevel > 31) {
        permissions.bluetoothScan = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Bluetooth Scan Permission",
                message: "App needs access to bluetooth scan",
                buttonPositive: "OK",
            }
        );

        permissions.bluetoothConnect = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Bluetooth Connect Permission",
                message: "App needs access to bluetooth connect",
                buttonPositive: "OK",
            }
        );
    }

    permissions.fineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Fine Location Permission",
            message: "App needs access to fine location",
            buttonPositive: "OK",
        }
    );

    return Object.values(permissions).every((permission) => permission === "granted");
}

const requestPermissions = async () => {
    return Platform.OS === "android" ? await requestAndroidPermissions() : true;
}


export const permissions = {
    valid: requestPermissions
}
