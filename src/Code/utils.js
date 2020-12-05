/**
 * Gets an array of unique tags from all the items in the itemList
 * @param {*} itemList
 */
export function getAllTags(itemList) {
    const allTags = itemList.map((i) => i.tags).flat();
    const list = [...new Set(allTags)];
    return list;
}
/**
 * Replaces simple mathematical equations with the calculated sum.
 * Also handles negative numbers and floating point numbers.
 * No parenthases are allowed within the equation.
 * Places the results in an html span with a class to allow styling.
 * NOTE: styling elemnt will only work because we are allowing html tags in the "text" field.
 * @param {string} text
 */
export function replaceMath(text) {
    /*The regex looks for all instances of:
        1. a space or an opening parethases character
        2. an optional minus sign
        3. a valid integer - 085 is also OK
        4. an optional decimal point followed by at least one valid number.
        5. an optional space
        6. a mathematical operator +, - ,* or /
        7. an optional space
        8. another number in the exact same format as steps 2 - 4
    */
    // eslint-disable-next-line no-useless-escape
    const regex = /[ \()](-?(0|[1-9]\d*)(\.\d+)?) *([\+\-\*\/]) *(-?(0|[1-9]\d*)(\.\d+)?)/g;
    return text.replace(regex, function (...args) {
        const orig = args[0],
            num1 = parseFloat(args[1]),
            num2 = parseFloat(args[6]),
            op = args[4];
        if (isNaN(num1) || isNaN(num2) || (op === "/" && num2 === 0)) {
            return orig;
        }
        let sum;
        if (op === "+") {
            sum = num1 + num2;
        } else if (op === "-") {
            sum = num1 - num2;
        } else if (op === "*") {
            sum = num1 * num2;
        } else if (op === "/") {
            sum = num1 / num2;
        } else {
            return orig;
        }
        //To avoid javascripts imprecision nonsense with floating point numbers,
        //we only return until the hundreths spot after the decimal.
        //Because we converted to floats and the sum may be an int,
        //we remove any "".00" at the end.
        sum = sum.toFixed(2).replace(/[.,]00$/, "");

        return ` <span class="mathEquation">${sum}</span>`;
    });
}
