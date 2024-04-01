import { StyleSheet, View } from 'react-native';
import Joystick from '@/components/Joystick';
import ControlLever from '@/components/ControlLever';
import { COLORS } from '@/constants';
import { motorsUtils } from '@/utils';

export default function Control() {
    const onChangeCoordinantes = (vector) => {
        const values = motorsUtils.getMapByVector(vector, 100);
        console.log(values);
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <ControlLever />
            </View>

            <View style={[styles.section, { backgroundColor: COLORS.SECONDARY }]}>
                <Joystick radius={100} color={COLORS.PRIMARY} onMove={onChangeCoordinantes} />
            </View>
        </View>
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
