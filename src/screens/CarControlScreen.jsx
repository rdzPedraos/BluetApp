import { StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Joystick from '@/components/Joystick';
import { COLORS } from '@/constants';
import { motorsUtils } from '@/utils';
import BluetoothContext from '@/context/BluetoothContext';
import MainLayout from '@/layouts/MainLayout';

export default function CarControlScreen(props) {
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
        <MainLayout title="Mando de carro" {...props}>
            <View style={[styles.container, { backgroundColor: COLORS.SECONDARY }]}>
                <Joystick radius={100} color={COLORS.PRIMARY} onMove={onChangeCoordinantes} />
            </View>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },
});
