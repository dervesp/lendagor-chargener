export function assert(assertion, failMessage) {
    if (!Boolean(assertion)) {
        console.error(failMessage);
    }
}

export function assertEqualNumber(value1: number, value2: number, failMessage) {
    if (Math.abs(value1 - value2) > 0.001) {
        console.error(failMessage);
    }
}