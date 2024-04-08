import GameControlScreen from "@/screens/GameControlScreen";
import ConfigScreen from "@/screens/ConfigScreen";
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
        component: ConfigScreen,
        options: {
            title: "Configuración Bluetooth",
            drawerIcon: ({ color }) => <ICONS name="bluetooth" size={24} color={color} />,
        }
    }
]

export default routes;
