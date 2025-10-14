export const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.nonggor.com/api/v1"
}