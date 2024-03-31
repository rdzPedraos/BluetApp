import { SafeAreaView, Text, StyleSheet } from 'react-native';
import JoyStick from '@components/JoyStick';

export default function Control() {
    return (
        <SafeAreaView style={styles.container}>
            <JoyStick />
            <Text style={styles.section}>Div 2</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },

    section: {
        flex: 1,
        flex: 1,
    },
});
