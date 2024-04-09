import { StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Joystick from '@/components/Joystick';
import ControlLever from '@/components/ControlLever';
import { COLORS } from '@/constants';
import { motorsUtils } from '@/utils';
import BluetoothContext from '@/context/BluetoothContext';
import MainLayout from '@/layouts/MainLayout';

export default function GameControlScreen(props) {
    const { device, sendByBT } = useContext(BluetoothContext);
    const [values, setValues] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (device && values) sendByBT(JSON.stringify(values) + "\n");
        }, 200);

        return () => {
            clearInterval(interval);
        }
    }, [device, values]);

    const onChangeCoordinantes = (vector) => {
        const values = motorsUtils.getMapByVector(vector, 100);
        setValues(values);
    }

    return (
        <MainLayout title="Mando de control" direction="horizontal" {...props}>
            <View style={styles.container}>
                <View style={styles.section}>
                    <ControlLever />
                </View>

                <View style={[styles.section, { backgroundColor: COLORS.SECONDARY }]}>
                    <Joystick radius={100} color={COLORS.PRIMARY} onMove={onChangeCoordinantes} />
                </View>
            </View>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },

    section: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
