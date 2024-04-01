function normalizeCoordinates(moveX, moveY, centerX, centerY, radius) {
    // Get the distance from the center of the circle
    const distance = Math.sqrt((moveX - centerX) ** 2 + (moveY - centerY) ** 2);
    // Limit the distance to the circle radius
    const limitedDistance = Math.min(distance, radius);

    /**
     * If distance is equal to limitedDistance, then newX and newY will be equal to (moveX - centerX) and (moveY - centerY) respectively, which means the joystick is at the edge of the circle.
     * If distance is less than limitedDistance, the normalized coordinates will be closer to the center of the circle.
     * If distance is greater than limitedDistance, the normalized coordinates will be closer to the edge of the circle.
     */
    const newX = (moveX - centerX) * (limitedDistance / distance);
    const newY = (moveY - centerY) * (limitedDistance / distance);

    return { x: newX, y: newY, limitedDistance };
}

export const joystickUtils = {
    normalizeCoordinates
}
