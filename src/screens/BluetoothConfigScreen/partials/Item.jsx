import { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { FONT_SIZES, COLORS, ICONS } from "@/constants";
import BluetoothContext from '@/context/BluetoothContext';

export default function Item({ item }) {
    const { device, connectToDevice, disconnectDevice, isConnected, connecting } = useContext(BluetoothContext);
    const isActive = item.id === device?.id;
    const isConnecting = item.id === connecting;
    const disabled = (isConnected && !isActive) || connecting;

    const toogleBTBtn = () => {
        if (disabled) return;

        if (isActive) disconnectDevice(device);
        else connectToDevice(item);
    }

    return (
        <View style={stylesItem.container}>
            <View>
                <Text style={stylesItem.name}>{item.name}</Text>
                <Text style={stylesItem.description}>{item.id}</Text>
            </View>


            {isConnecting
                ? <ActivityIndicator size={28} color={COLORS.PRIMARY} />
                : (
                    <TouchableOpacity onPress={toogleBTBtn}>
                        {isActive
                            ? <ICONS size={28} name="close-circle-outline" color="red" />
                            : <ICONS size={28} name="bluetooth-sharp" color={disabled ? COLORS.GRAY : COLORS.PRIMARY} />
                        }
                    </TouchableOpacity>
                )
            }
        </View>
    );
}

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
});
