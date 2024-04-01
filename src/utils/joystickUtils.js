function normalizeCoordinates(position, center, radius) {
    // Get the distance from the center of the circle
    const distance = Math.sqrt((position.x - center.x) ** 2 + (position.y - center.y) ** 2);

    // Limit the distance to the circle radius
    const limitedDistance = Math.min(distance, radius);

    /**
     * If distance is equal to limitedDistance, then newX and newY will be equal to (position.x - center.x) and (position.y - center.y) respectively, which means the joystick is at the edge of the circle.
     * If distance is less than limitedDistance, the normalized coordinates will be closer to the center of the circle.
     * If distance is greater than limitedDistance, the normalized coordinates will be closer to the edge of the circle.
     */
    const newX = (position.x - center.x) * (limitedDistance / distance);
    const newY = (position.y - center.y) * (limitedDistance / distance) * -1;

    return { x: newX, y: newY, limitedDistance };
}

export const joystickUtils = {
    normalizeCoordinates
}
