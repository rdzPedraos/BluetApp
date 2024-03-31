import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native';

export default function JoyStick({
    size = 100,
    color = '#000',
    debug = false,
}) {
    const styles = useMemo(() => generateStyles(size, color), [size, color]);
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
    const [info, setInfo] = useState(null);
    const containerRef = useRef();

    const handleMove = (_, gestureState) => {
        const { moveX, moveY } = gestureState;

        // Obtenemos las coordenadas del contenedor
        containerRef.current.measure((x, y, width, height, pageX, pageY) => {
            // Calculamos las coordenadas relativas al centro del contenedor
            const centerX = pageX + width / 2;
            const centerY = pageY + height / 2;

            // Calculamos la distancia desde el centro del círculo
            const distance = Math.sqrt((moveX - centerX) ** 2 + (moveY - centerY) ** 2);

            // Limitamos la distancia al radio del círculo (size)
            const limitedDistance = Math.min(distance, size / 2);

            // Calculamos las coordenadas normalizadas dentro del círculo
            const newX = (moveX - centerX) * (limitedDistance / distance);
            const newY = (moveY - centerY) * (limitedDistance / distance);

            setJoystickPosition({ x: newX, y: newY });

            if (debug) setInfo({ moveX, moveY, centerX, centerY, distance, limitedDistance, newX, newY });
        });
    };

    const handleRelease = () => {
        // Cuando se suelta el joystick, vuelve a la posición inicialr
        setJoystickPosition({ x: 0, y: 0 });
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handleMove,
        onPanResponderRelease: handleRelease, // Agregamos este manejador
    });

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            {/* Base del joystick */}
            <View style={styles.base} ref={containerRef} />

            {/* Joystick */}
            <View
                style={[
                    styles.joystick,
                    { transform: [{ translateX: joystickPosition.x }, { translateY: joystickPosition.y }] },
                ]}
            />

            {info && (
                <View style={{ position: 'absolute', backgroundColor: '#f0f0f055' }}>
                    <Text>{JSON.stringify(info, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

const generateStyles = (size, color) => {
    const baseSize = size;
    const joystickSize = size / 2;

    return StyleSheet.create({
        container: {
            /*backgroundColor: 'blue',*/
            position: 'relative',
        },
        base: {
            width: baseSize,
            height: baseSize,
            borderRadius: baseSize / 2,
            backgroundColor: color,
            opacity: 0.5,
        },
        joystick: {
            width: joystickSize,
            height: joystickSize,
            borderRadius: joystickSize / 2,
            position: 'absolute',
            top: baseSize / 4,
            left: baseSize / 4,
            backgroundColor: color,
        },
    });
}

