import { useRef, useState } from 'react';
import { joystickUtils } from '@/utils';

export function useJoystick(radius, addDebug = false) {
    const containerReference = useRef();
    const [debug, setDebug] = addDebug ? useState(null) : [null, null];
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMove = (event) => {
        // Get the coordinates of the joystick movement on the screen
        const position = {
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY
        };

        // Get the coordinates of the container on the screen
        containerReference.current.measure((_x, _y, width, height, pageX, pageY) => {
            // Calculate the coordinates relative to the center of the container (based in the screen)
            const center = {
                x: pageX + width / 2,
                y: pageY + height / 2
            };

            // Calculate the distance from the center of the circle
            const { x, y } = joystickUtils.normalizeCoordinates(position, center, radius);
            setPosition({ x, y });

            if (setDebug) setDebug({ position, width, height, pageX, pageY, center, x, y });
        });
    }

    const handleRelease = () => {
        setPosition({ x: 0, y: 0 });
        if (setDebug) setDebug(null);
    };

    return {
        position,
        debug,
        render: {
            ref: containerReference,
            onStartShouldSetResponder: () => true,
            onResponderMove: handleMove,
            onResponderRelease: handleRelease
        }
    };
}
