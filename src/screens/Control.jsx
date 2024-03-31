import { StyleSheet, View } from 'react-native';
import JoyStick from '@/components/JoyStick';
import ControlLever from '@/components/ControlLever';
import { COLORS } from '@/constants';

export default function Control() {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                {/*<ControlLever />*/}
                <JoyStick size={200} color={COLORS.SECONDARY} />

            </View>

            <View style={{ ...styles.background, ...styles.section }}>
                <JoyStick size={200} color={COLORS.PRIMARY} />
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
    },

    background: {
        backgroundColor: '#f0f0f0',
    }
});
