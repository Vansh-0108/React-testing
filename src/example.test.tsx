export const sumPositiveNumbers = (num1: number, num2: number) => {
    if(num1 < 0 || num2 <0)
        throw new Error ('Negative Numbers ')
    return num1+num2;
}

describe.skip ("test suite", () => {
    test('', () => {
        expect(sumPositiveNumbers(4,5)).toBe(9);
    })
})

describe.skip ("test suite 2", () => {
    test("error on negative number", () => {
        let error;
        try {
            sumPositiveNumbers(-1, 5);
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
    })
})