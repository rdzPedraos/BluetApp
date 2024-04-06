/**
 * Return a map with {rightUp, rightDown, leftUp, leftDown} values in the scale 1 to 100 for the motors to move the dron
 * @param {x:int, y:int} vector 
 * @param {int} radius
 * @return {rightUp:int, rightDown:int, leftUp:int, leftDown:int} 
 */
function getMapByVector(vector, radius) {
    const { x, y } = vector;

    const change = .5;
    let changeInX = change * Math.abs(x) / radius;
    let changeInY = change * Math.abs(y) / radius;

    if (x > 0) changeInX *= -1;
    if (y > 0) changeInY *= -1;


    const aux = 1 / Math.sqrt(2);
    const values = {
        leftUp: .5 + (-changeInX + changeInY) * change / aux,
        leftDown: .5 + (-changeInX - changeInY) * change / aux,
        rightUp: .5 + (changeInX + changeInY) * change / aux,
        rightDown: .5 + (changeInX - changeInY) * change / aux,
    }

    return values;
}


export const motorsUtils = {
    getMapByVector
}
