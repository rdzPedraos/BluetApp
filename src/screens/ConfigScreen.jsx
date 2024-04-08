import { Text, View } from "react-native";
import MainLayout from "@/layouts/MainLayout";

export default function ConfigScreen(props) {
    return (
        <MainLayout title="Configuración" {...props}>
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
