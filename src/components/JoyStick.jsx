import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useJoystick } from '@/hooks';

export default function JoyStick({
    radius = 100,
    color = '#000',
    addDebug = false,
}) {
    const { position, debug, render } = useJoystick(radius, addDebug);
    const styles = useMemo(() => generateStyles(radius, color), [radius, color]);

    const movementStyles = useMemo(() => {
        return { transform: [{ translateX: position.x }, { translateY: position.y }] };
    }, [position]);

    return (
        <View style={styles.base} {...render}>
            <View style={[styles.joystick, movementStyles]} />

            {debug && (
                <View style={{ position: 'absolute', backgroundColor: '#f0f0f055' }}>
                    <Text>{JSON.stringify(debug, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

const generateStyles = (radius, color) => {
    const baseSize = radius * 2;
    const joystickSize = radius;

    return StyleSheet.create({
        base: {
            position: 'relative',
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

