export const urlValidation = (url: string) => {
    return RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi).test(url)
}

export const checkHttp = (url: string) => {
    return url.indexOf('http') > -1 || url.indexOf('https') > -1 ? url : `https://${url}`;
}