
export const onLocalStorageChange = () => {
    window.addEventListener("storage", (e) => {
        console.log(e)
    })
}