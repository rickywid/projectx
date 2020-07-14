export const truncate = (str: string, length: number) => {
    
    return `${str.slice(0, length)}...`;
}

export default truncate;