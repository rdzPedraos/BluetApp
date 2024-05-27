import { useCallback, useContext } from "react";
import { Text, View, Switch, StyleSheet, FlatList } from "react-native";

import Item from './partials/Item';
import MainLayout from "@/layouts/MainLayout";
import { FONT_SIZES, COLORS } from "@/constants";
import useBluetoothContext from '@/context/BluetoothContext';

export default function BluetoothConfigScreen(props) {
    const { activedBT, devices, enableBT, disableBT } = useBluetoothContext();

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
