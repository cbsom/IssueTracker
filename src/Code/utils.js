export function getAllTags(itemList) {
    const allTags = itemList.map((i) => i.tags).flat();
    const list = [...new Set(allTags)];
    return list;
}
/**
 * Replaces simple mathimatical equations (addition or subtraction) with the calculated sum
 * Places the results in an html span with a class to alloow formatting.
 * @param {string} text
 */
export function replaceMath(text) {
    // eslint-disable-next-line no-useless-escape
    const regex = /([\d\.]+) *([\+\-]) *([\d\.])/g;
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
    });
}
