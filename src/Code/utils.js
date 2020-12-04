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
 * Replaces simple mathematical equations (addition or subtraction) with the calculated sum
 * Places the results in an html span with a class to allow styling.
 * NOTE: styling elemnt will only work because we are allowing html tags in the "text" field.
 * @param {string} text
 */
export function replaceMath(text) {
    // eslint-disable-next-line no-useless-escape
    const regex = /([\d\.]+) *([\+\-\*\/]) *([\d\.]+)/g;
    return text.replace(regex, (str, n1, op, n2) => {
        if (op === "+") {
            return `<span class="mathEquation">${
                parseFloat(n1) + parseFloat(n2)
            }</span>`;
        } else if (op === "-") {
            return `<span class="mathEquation">${
                parseFloat(n1) - parseFloat(n2)
            }</span>`;
        }
        else if (op === "*") {
            return `<span class="mathEquation">${
                parseFloat(n1) * parseFloat(n2)
            }</span>`;
        }
        else if (op === "/" && parseFloat(n2) !== 0) {
            return `<span class="mathEquation">${
                parseFloat(n1) / parseFloat(n2)
            }</span>`;
        }
    });
}
