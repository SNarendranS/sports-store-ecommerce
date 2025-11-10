export const capitalize = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}
export const capitalizeEach = (arr) => {
    const arrSplit = arr.split(' ')
    arrSplit.map((ele) => capitalize(ele)).join(' ')
    return arrSplit.map((ele) => capitalize(ele)).join(' ')

}