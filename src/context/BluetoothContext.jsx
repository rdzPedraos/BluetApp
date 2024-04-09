import { createContext, useEffect, useState } from "react";
import { permissions } from "@/utils";
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default BluetoothContext = createContext(null);

export const BluetoothProvider = ({ children }) => {
    const [scanningBT, setScanningBT] = useState(false);
    const [activedBT, setActivedBT] = useState(false);
    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState(null);

    useEffect(() => {
        console.log("changing device", device);
    }, [device])

    const enableBT = async () => {
        if (activedBT) return;

        const isPermissionGranted = await permissions.valid();
        if (!isPermissionGranted) throw new Error('Permission not granted');

        setActivedBT(true);
        setScanningBT(true);

        try {
            const unpaired = await RNBluetoothClassic.startDiscovery();
            setDevices([...unpaired]);
        } catch (error) {
            console.error(error);
        } finally {
            setScanningBT(false);
        }
    }

    const disableBT = async () => {
        if (!activedBT) return;

        await RNBluetoothClassic.cancelDiscovery();
        setActivedBT(false);
        setDevices([]);
    }

    const connectToDevice = async (newDevice) => {
        if (device) {
            await device.disconnect();
        }

        await newDevice.connect();
        setDevice(newDevice);
    }

    const disconnectDevice = async () => {
        if (!device) return;

        await device.disconnect();
        setDevice(null);
    }

    const sendByBT = async (msj) => {
        if (!device) {
            console.error("First need to associated to device");
            return;
        }

        RNBluetoothClassic.writeToDevice(device.address, msj);
    }

    return (
        <BluetoothContext.Provider value={{
            activedBT,
            devices,
            device,
            scanningBT,
            enableBT,
            disableBT,
            connectToDevice,
            disconnectDevice,
            sendByBT
        }}>
            {children}
        </BluetoothContext.Provider>
    );
}
