// eslint-disable-next-line no-useless-escape
const replaceRegex = /\b(~~~~~)*(-?(0|[1-9]\d*)(\.\d+)?)(\\~~~~~)*\s*([\+\-\*\/])\s*(-?(0|[1-9]\d*)(\.\d+)?)/g;
const removePlaceholdersRegex = /(~~~~~)+(-?(0|[1-9]\d*)(\.\d+)?)(\\~~~~~)+/g;

/**
 * This function is called as the "replacer" function from a String.replace call.
 * Replaces a matched equation with the sum - surrounded by a "placeholder". .
 * @param  {[string]} args this comes from the replace function itself - each arg is a group in the match
 */
function doReplace(...args) {
    const originalString = args[0],
        num1 = parseFloat(args[2]),
        num2 = parseFloat(args[7]),
        op = args[6];
    if (isNaN(num1) || isNaN(num2) || (op === "/" && num2 === 0)) {
        return originalString;
    }
    let sum;
    switch (op) {
        case "+":
            sum = num1 + num2;
            break;
        case "-":
            sum = num1 - num2;
            break;
        case "*":
            sum = num1 * num2;
            break;
        case "/":
            sum = num1 / num2;
            break;
        default:
            return originalString;
    }
    //Replace the equation with the sum number -
    //surrounded by a temporary "mark" to identify where the replacements occurred at the end.
    //This is to allow us afterwards to surround the sum text with an html span.
    return `~~~~~${sum}\\~~~~~`;
}

/**
 * This function is also called as the "replacer" function from a String.replace call.
 * It is called after all the replacements are done on each single final sum - which are identified
 * by the placeholders inserted by the doReplace function.
 * This function replaces the placeholders with an html span with a class to allow formatting.
 * @param  {[string]} args this comes from the replace function itself - each arg is a group in the match
 */
function fixPlaceholders(...args) {
    const num = parseFloat(args[2]);
    if (!isNaN(num)) {
        //To avoid javascripts imprecision nonsense with floating point numbers,
        //we only return until the hundreths spot after the decimal.
        //Because we converted to floats and the sum may be an int,
        //we remove any "".00" at the end.
        return ` <span class="mathEquation">${num
            .toFixed(2)
            .replace(/[.,]00$/, "")}</span>`;
    } else {
        return args[0];
    }
}

/**
 * Gets an array of unique tags from all the items in the itemList
 * @param {*} itemList
 */
function getAllTags(itemList) {
    const allTags = itemList.map((i) => i.tags).flat();
    const list = [...new Set(allTags)];
    return list;
}

/**
 * Replaces simple mathematical equations with the calculated sum.
 * Also handles negative numbers and floating point numbers.
 * No parentheses are allowed within the equation.
 * Places the results in an html span with a class to allow styling.
 * NOTE: styling element will only work because we are allowing html tags in the "text" field.
 * @param {string} text
 */
function replaceMath(text) {
    while (true) {
        const replacement = text.replace(replaceRegex, doReplace);
        //If the original text was not changed by the replace call, there are no more equations to process.
        if (replacement === text) {
            return text.replace(removePlaceholdersRegex, fixPlaceholders);
        }
        text = replacement;
    }
}

export { getAllTags, replaceMath };
