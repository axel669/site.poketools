import { writable } from "svelte/store"

const theme = writable(localStorage.theme ?? "dark")

theme.subscribe(
    next => localStorage.theme = next
)

export default theme
