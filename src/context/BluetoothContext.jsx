import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { permissions } from "@/utils";
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const BluetoothContext = createContext(null);

export const BluetoothProvider = ({ children }) => {
    const [activedBT, setActivedBT] = useState(false);
    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState(null);
    const [connecting, setConnecting] = useState(false);

    const isConnected = useMemo(() => device !== null, [device]);

    useEffect(() => {
        RNBluetoothClassic.onDeviceDiscovered((device) => {
            setDevices((devices) => {
                if (!devices.find(d => d.id == device.id)) {
                    return [...devices, {
                        name: device.name,
                        id: device.address
                    }];
                }
                return devices;
            });
        });
    }, []);

    const enableBT = async () => {
        if (activedBT) return;

        const isPermissionGranted = await permissions.valid();
        if (!isPermissionGranted) throw new Error('Permission not granted');

        RNBluetoothClassic.startDiscovery();
        setActivedBT(true);
    }

    const disableBT = async () => {
        if (!activedBT) return;
        await RNBluetoothClassic.cancelDiscovery();
        if (device) {
            disconnectDevice();
            setDevice(null);
        }
        setDevices([]);
        setActivedBT(false);
    }

    const connectToDevice = async (newDevice) => {
        if (device) disconnectDevice();

        setConnecting(newDevice.id);
        const _device = await RNBluetoothClassic.connectToDevice(newDevice.id);
        setDevice(_device);
        setConnecting(null);
    }

    const disconnectDevice = async () => {
        await RNBluetoothClassic.disconnectFromDevice(device.id);
        setDevice(null);
    }

    const sendByBT = async (msj) => {
        if (!device) {
            console.error("First need to associated to device");
            return;
        }

        RNBluetoothClassic.writeToDevice(device.id, msj);
    }

    return (
        <BluetoothContext.Provider value={{
            activedBT,
            devices,
            device,
            isConnected,
            connecting,
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

export default useBluetoothContext = () => useContext(BluetoothContext);
