export const formatTimeOfNumber = (time: number) => {
    const min = Math.floor(time / 60)
    const seg = time % 60
    return `${min < 10 ? "0" : ""}${min}:${seg < 10 ? "0" : ""}${seg}`
};

export const formatTimer = (time: number) => {
    let inputString = time.toString().padStart(4, '0');
    let seconds = inputString.slice(-2);
    let minutes = inputString.slice(0, -2);
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};


export const formatDateTime = (dateToFormat: Date) => {
    const date = new Date(dateToFormat)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear()

    return `${day}/${month}/${year} - ${formatTime(date)}`;
}

export const formatTime = (dateToFormat: Date) => {
    const date = new Date(dateToFormat)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}