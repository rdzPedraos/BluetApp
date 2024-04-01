import { useRef, useState } from 'react';
import { PanResponder } from 'react-native';
import { joystickUtils } from '@/utils';

export function useJoystickHook(radius, debug) {
    const containerReference = useRef();
    const [info, setInfo] = debug ? useState(null) : [null, null];
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

    const handleMove = (_, gestureState) => {
        // Get the coordinates of the joystick movement on the screen
        const { moveX, moveY } = gestureState;

        // Get the coordinates of the container
        containerReference.current.measure((x, y, width, height, pageX, pageY) => {
            // Calculate the coordinates relative to the center of the container (based in the screen)
            const centerX = pageX + width / 2;
            const centerY = pageY + height / 2;

            // Calculate the distance from the center of the circle
            const { x: newX, y: newY } = joystickUtils.normalizeCoordinates(moveX, moveY, centerX, centerY, radius);
            setJoystickPosition({ x: newX, y: newY });

            if (setInfo) setInfo({ moveX, moveY, width, height, pageX, pageY, centerX, centerY, newX, newY });
        });
    }

    const handleRelease = () => {
        setJoystickPosition({ x: 0, y: 0 });
        if (setInfo) setInfo(null);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: handleMove,
        onPanResponderRelease: handleRelease,
    });

    return { containerReference, joystickPosition, panResponder, info };
}
