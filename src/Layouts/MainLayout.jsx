import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { BRAND_LOGO } from '@/constants';

export default function MainLayout({ children }) {
    useEffect(() => {
        //Screen in horizontal.
        ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Image source={BRAND_LOGO} style={styles.logo} />

            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },

    logo: {
        width: 100,
        height: 20,
        position: 'absolute',
        top: 10,
        left: 10,
        objectFit: 'contain',
        marginVertical: 20,
    }
});
