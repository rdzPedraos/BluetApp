import { useEffect, useMemo, useState } from "react";
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { permissions } from "@/utils";

function useBluetoothClassic() {
    const [isScannging, setIsScanning] = useState(false);
    const [allDevices, setAllDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);

    useEffect(() => {
        console.log('connectedDevice', connectedDevice);
        if (connectedDevice) {
            RNBluetoothClassic.writeToDevice(connectedDevice.address, 'Hello World!');
        }
    }, [connectedDevice])

    const scanDevices = async () => {
        if (isScannging) return;

        const isPermissionGranted = await permissions.valid();
        if (!isPermissionGranted) throw new Error('Permission not granted');

        setIsScanning(true);
        const devices = [...allDevices];

        try {
            let unpaired = await RNBluetoothClassic.startDiscovery();

            let index = devices.findIndex(d => !d.bonded);
            if (index >= 0) { devices.splice(index, devices.length - index, ...unpaired); }
            else { devices.push(...unpaired); }
        } finally {
            setAllDevices(devices);
            setIsScanning(false);
        };
    }

    const stopScanDevices = async () => {
        if (!isScannging) return;

        await RNBluetoothClassic.cancelDiscovery();
        setIsScanning(false);
    }

    const connectToDevice = async (device) => {
        if (connectedDevice) {
            await device.disconnect();
            setConnectedDevice(null);
        }

        await device.connect()
        setConnectedDevice(device);
    }

    const disconnectDevice = async () => {
        if (!connectedDevice) return;

        await RNBluetoothClassic.disconnect();
        setConnectedDevice(null);
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

export {
    useBluetoothClassic
}
