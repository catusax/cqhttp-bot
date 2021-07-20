export function clone<T>(object: T): T {
    if (!object || typeof object != 'object') {
        return object
    }

    const cloneObj = (Array.isArray(object) ? [] : {}) as T

    for (const attr in object) {
        // tslint:disable-next-line: prefer-conditional-expression
        if (typeof object[attr] == 'object') {
            cloneObj[attr] = clone(object[attr])
        } else {
            cloneObj[attr] = object[attr]
        }
    }

    return cloneObj
}
