import api from "../api"

export async function getAllInstaShop() {
    try {
        const response = api.get(`/media/getAllInstaShop`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}