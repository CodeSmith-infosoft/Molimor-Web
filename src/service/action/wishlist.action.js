import api from "../api"

export async function getWishlist() {
    try {
        const response = api.get(`/wishlist/getWishlist`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function addWishlist(id) {
    try {
        const response = api.post(`/wishlist/addWishlist`, { productId: id })

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function removeFromWishlist(id) {
    try {
        const response = api.delete(`/wishlist/removeFromWishlist/${id}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}