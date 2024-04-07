import { useMemo, useState } from "react";
import { BleManager } from "react-native-ble-plx";
import { permissions } from "@/utils";

function useBluetoothLowEnergy() {
    const bleManager = useMemo(() => new BleManager(), []);
    const [allDevices, setAllDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);

    const scanDevices = async () => {
        const isPermissionGranted = await permissions.requestPermissions();

        if (!isPermissionGranted) {
            console.log('Permission not granted');
            return;
        }

        setAllDevices([]);
        bleManager.startDeviceScan(null, null, (error, device) => {
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
        scanDevices,
        stopScanDevices,
        connectToDevice,
        disconnectDevice,
    }
}


export {
    useBluetoothLowEnergy
};
