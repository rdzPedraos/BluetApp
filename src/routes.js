import BluetoothConfigScreen from "@/screens/BluetoothConfigScreen";
import DronControlScreen from "@/screens/DronControlScreen";
import CarControlScreen from "@/screens/CarControlScreen";
import { ICONS } from "@/constants";

const routes = [
    {
        name: 'DronControlScreen',
        component: DronControlScreen,
        options: {
            title: "Control para dron",
            drawerIcon: ({ color }) => <ICONS name="airplane-sharp" size={24} color={color} />,
        }
    },
    {
        name: "CarControlScreen",
        component: CarControlScreen,
        options: {
            title: "Manubrio para coche",
            drawerIcon: ({ color }) => <ICONS name="car-sport-sharp" size={24} color={color} />,
        }
    },
    {
        name: 'BluetoothConfigScreen',
        component: BluetoothConfigScreen,
        options: {
            title: "Configuración bluetooth",
            drawerIcon: ({ color }) => <ICONS name="bluetooth-sharp" size={24} color={color} />,
        }
    }
]

export default routes;
