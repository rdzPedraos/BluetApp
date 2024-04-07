import { useMemo, useState } from "react";
import { BleManager } from "react-native-ble-plx";
import { permissions } from "@/utils";

export default function useBluetoothClassic() {
    const bleManager = useMemo(() => new BleManager(), []);
    const [isScannging, setIsScanning] = useState(false);
    const [allDevices, setAllDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);

    const scanDevices = async () => {
        if (isScannging) return;

        const isPermissionGranted = await permissions.valid();
        if (!isPermissionGranted) throw new Error('Permission not granted');

        setAllDevices([]);
        setIsScanning(true);
        await bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                return;
            }
            setAllDevices(devices => {
                return devices.some(d => d.id === device.id) ? devices : [...devices, device];
            })
        });
    }

    const stopScanDevices = () => {
        bleManager.stopDeviceScan();
        setIsScanning(false);
    }

    const connectToDevice = async (device) => {
        try {
            const deviceConnection = await bleManager.connectToDevice(device.id);
            setConnectedDevice(deviceConnection);
            await deviceConnection.discoverAllServicesAndCharacteristics();
            stopScanDevices();
        } catch (error) {
            console.error(error);
        }
    }

    const disconnectDevice = async () => {
        if (connectedDevice) {
            await connectedDevice.cancelConnection();
            setConnectedDevice(null);
        }
    }

    return {
        allDevices,
        connectedDevice,
        isScannging,
        scanDevices,
        stopScanDevices,
        connectToDevice,
        disconnectDevice,
    }
}
