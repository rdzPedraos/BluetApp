import { Text, View } from "react-native";
import MainLayout from "@/layouts/MainLayout";

export default function BluetoothConfigScreen(props) {


    return (
        <MainLayout title="Conexión de Bluetooth" {...props}>
            <View style={styles.container}>
                <Text style={styles.title}>Config</Text>
            </View>
        </MainLayout>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
};
