import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import { BRAND_LOGO, COLORS } from '@/constants';
import { Image, StyleSheet } from 'react-native';

export default function Sidebar(props) {
    return (
        <DrawerContentScrollView
            {...props}
        >
            <Image source={BRAND_LOGO} style={styles.logo} />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        objectFit: 'contain',
        height: 45,
        width: '80%',
        marginStart: 15,
        marginTop: 5,
        marginBottom: 20,
    }
});
