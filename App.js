import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import routes from '@/routes';
import Sidebar from '@/components/Sidebar';
import { COLORS } from '@/constants';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                defaultStatus='open'
                initialRouteName='BluetoothConfigScreen'
                screenOptions={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerActiveTintColor: COLORS.PRIMARY,
                }}
                drawerContent={Sidebar}
            >
                {routes.map((route, index) => (
                    <Drawer.Screen key={index} {...route} />
                ))}
            </Drawer.Navigator>
        </NavigationContainer>
    );

}
