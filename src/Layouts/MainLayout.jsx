import { useContext } from 'react';
import { StyleSheet, SafeAreaView, Image, View, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import BluetoothContext from '@/context/BluetoothContext';
import { LOGO, ICONS, FONT_SIZES } from '@/constants';

export default function MainLayout({ title, navigation, direction = "vertical", children }) {
    const { isConnected } = useContext(BluetoothContext);

    useFocusEffect(() => {
        const directionLock = direction === "vertical"
            ? ScreenOrientation.OrientationLock.PORTRAIT
            : ScreenOrientation.OrientationLock.LANDSCAPE;

        ScreenOrientation.lockAsync(directionLock);
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.header}>
                <View style={styles.title}>
                    <Image source={LOGO} style={styles.titleImg} />
                    <Text style={styles.titleTxt}>{title}</Text>
                    {isConnected
                        ? <ICONS name="checkmark-circle" size={24} color="green" />
                        : <ICONS name="close-circle" size={24} color="red" />
                    }
                </View>

                <TouchableOpacity onPress={navigation.openDrawer}>
                    <ICONS name="menu-sharp" size={FONT_SIZES.EXTRA_LARGE} />
                </TouchableOpacity>
            </View>

            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 80,
        paddingHorizontal: 20,
    },

    header: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 999,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        padding: 20,
    },

    title: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    titleImg: {
        width: 20,
        height: 30,
        objectFit: 'contain',
    },

    titleTxt: {
        fontSize: FONT_SIZES.EXTRA_LARGE,
        fontWeight: 'bold',
    }
});
