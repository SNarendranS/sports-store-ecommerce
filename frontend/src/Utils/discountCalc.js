export const calcDiscountedPrice = (price,discount) => {
    return Math.ceil(price - (discount / 100) * price)
}
