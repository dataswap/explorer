export function formatTitle(key: string): string {
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1)
    const finalTitle = formattedKey.replace(/([A-Z])/g, " $1")
    return finalTitle
}
