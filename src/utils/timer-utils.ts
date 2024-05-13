export const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const seg = time % 60
    return `${min < 10 ? "0" : ""}${min}:${seg < 10 ? "0" : ""}${seg}`
};

export const formatDate = (dateToFormat: Date) => {
    const date = new Date(dateToFormat);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}