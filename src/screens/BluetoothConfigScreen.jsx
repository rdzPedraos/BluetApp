import { useCallback, useContext, useEffect, useState } from "react";
import { Text, View, Switch, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import MainLayout from "@/layouts/MainLayout";
import { FONT_SIZES, COLORS, ICONS } from "@/constants";
import BluetoothContext from '@/context/BluetoothContext';

export default function BluetoothConfigScreen(props) {
    const { activedBT, devices, device, enableBT, disableBT } = useContext(BluetoothContext);

    const toggleBTBtn = useCallback((value) => {
        if (value) enableBT();
        else disableBT();
    });

    return (
        <MainLayout title="Conexión de Bluetooth" {...props}>
            <View style={stylesList.switch}>
                <Text style={stylesList.switchText}>Escanear dispositivos</Text>
                <Switch value={activedBT} onValueChange={toggleBTBtn} ios_backgroundColor={COLORS.PRIMARY} />
            </View>

            {activedBT ? (
                <FlatList
                    data={devices}
                    renderItem={(element) => <Item {...element} />}
                />
            ) : (
                <Text>Para ver los dispositivos disponibles, primero active la opción</Text>
            )}
        </MainLayout>
    );
}

const Item = ({ item }) => {
    const { device, connectToDevice, disconnectDevice } = useContext(BluetoothContext);
    const { id, name } = item;

    const isActive = id === device?.id;

    const toogleBTBtn = () => {
        if (isActive) disconnectDevice(device)
        else connectToDevice(item)
    }

    return (
        <View style={stylesItem.container}>
            <View>
                <Text style={stylesItem.name}>{name}</Text>
                <Text style={stylesItem.description}>{id}</Text>
            </View>

            <TouchableOpacity onPress={toogleBTBtn}>
                <ICONS style={stylesItem.button} name={isActive ? 'times' : "bluetooth-b"} />
            </TouchableOpacity>
        </View>
    );

}

const stylesList = StyleSheet.create({
    switch: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },

    switchText: {
        fontSize: FONT_SIZES.LARGE,
        fontWeight: "bold"
    },
});

const stylesItem = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    name: {
        fontSize: FONT_SIZES.LARGE,
        fontWeight: 'bold'
    },

    description: {
        fontSize: FONT_SIZES.MEDIUM,
        color: COLORS.GRAY,
    },

    button: {
        fontSize: 30,
        color: COLORS.PRIMARY
    }
});
