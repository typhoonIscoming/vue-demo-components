
export const curry = (fn) => {
    const length = fn.length;
    let args = [];
    return function curryFn() {
        const curryArray = Array.prototype.slice.call(arguments);
        args = args.concat(curryArray);
        if (args.length > length) {
            throw new Error('arguments length error')
        }
        if (args.length === length) {
            return fn.apply(null, args);
        }
        return curryFn
    }
}