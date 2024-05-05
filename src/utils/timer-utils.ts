export const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const seg = time % 60
    return `${min < 10 ? "0" : ""}${min}:${seg < 10 ? "0" : ""}${seg}`
};