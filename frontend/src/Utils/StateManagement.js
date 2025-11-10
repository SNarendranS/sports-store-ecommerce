export const toggleBoolState = (setState) => {
    setState(prev => !prev)
}
export const handleChange = (e, setState) => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
}