import GameControlScreen from "@/screens/GameControlScreen";
import BluetoothConfigScreen from "@/screens/BluetoothConfigScreen";
import { ICONS } from "@/constants";

const routes = [
    {
        name: 'GameControlScreen',
        component: GameControlScreen,
        options: {
            title: "Mando de control",
            drawerIcon: ({ color }) => <ICONS name="gamepad" size={24} color={color} />,
        }
    },
    {
        name: 'BluetoothConfigScreen',
        component: BluetoothConfigScreen,
        options: {
            title: "Configuración Bluetooth",
            drawerIcon: ({ color }) => <ICONS name="bluetooth" size={24} color={color} />,
        }
    }
]

export default routes;
