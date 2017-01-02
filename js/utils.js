class Utils {
    static isNumeric (value) {
        return new RegExp('^((?:NaN|-?(?:(?:\\d+|\\d*\\.\\d+)(?:[E|e][+|-]?\\d+)?|Infinity)))$').test(String(value));
    }

    static toArray (value) {
        if (!value)
            return [];

        if (Array.isArray(value))
            return value;

        if (value instanceof window.NodeList || value instanceof window.HTMLCollection)
            return Array.prototype.slice.call(value);

        return [ value ];
    }


    static find (array, predicate) {
        return toArray(array).filter(predicate)[0];
    }
}