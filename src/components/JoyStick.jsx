import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useJoystickHook } from '@/hooks';

export default function JoyStick({
    radius = 100,
    color = '#000',
    debug = true,
}) {
    const { containerReference, joystickPosition, panResponder, info } = useJoystickHook(radius, debug);
    const styles = useMemo(() => generateStyles(radius, color), [radius, color]);

    const movementStyles = useMemo(() => {
        return { transform: [{ translateX: joystickPosition.x }, { translateY: joystickPosition.y }] };
    }, [joystickPosition]);

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            {/* Base del joystick */}
            <View style={styles.base} ref={containerReference} />

            {/* Joystick */}
            <View style={[styles.joystick, movementStyles]} />

            {info && (
                <View style={{ position: 'absolute', backgroundColor: '#f0f0f055' }}>
                    <Text>{JSON.stringify(info, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

const generateStyles = (radius, color) => {
    const baseSize = radius * 2;
    const joystickSize = radius;

    return StyleSheet.create({
        container: {
            position: 'relative',
        },
        base: {
            width: baseSize,
            height: baseSize,
            borderRadius: baseSize,
            backgroundColor: color,
            opacity: 0.5,
        },
        joystick: {
            width: joystickSize,
            height: joystickSize,
            borderRadius: joystickSize,
            position: 'absolute',
            top: joystickSize / 2,
            left: joystickSize / 2,
            backgroundColor: color,
        },
    });
}

