
export const generateUUID = () => {
    const randomStr = () =>
        (
            Math.random()
                .toString()
                .substr(3) * 1
        ).toString(36)
    const timeStr = () => Date.now().toString(36)
    return `id_${randomStr()}_${randomStr()}_${timeStr()}`
}