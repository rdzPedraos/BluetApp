import Slider from '@react-native-community/slider';
import { View } from 'react-native'
import PalancaImg from '@/assets/palanca.png';
export default function ControlLever({ onMove, value, color }) {
    return (
        <View>
            <Slider
                style={{ width: 250, transform: [{ rotate: '-90deg' }, { scaleY: 5}] }}
                minimumValue={0}
                maximumValue={100}
                value={value}
                onValueChange={(value) => onMove(value)}
                minimumTrackTintColor={color}
                thumbImage={PalancaImg}
            />
        </View>
    )
}
