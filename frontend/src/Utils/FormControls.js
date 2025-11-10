import { handleChange } from "./StateManagement"

export const handleLengthCheckHelper = (e, num) => {
    return (e.target.value.length <= num)
}
export const handleCharacterCheckHelper = (e, char) => {
    return (e.target.value.contains(char))
}
export const handlePhoneChangeHelper = (e, setState) => {
    if (handleLengthCheckHelper(e, 10)) {
        handleChange(e, setState)
    }
}

