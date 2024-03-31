import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Control from '@screens/Control';

export default function App() {
    useEffect(() => {
        //Screen in horizontal.
        ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Control />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});
