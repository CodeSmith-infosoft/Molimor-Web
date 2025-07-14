import api from "../api"

export async function addToCart(payload) {
    try {
        const response = api.post(`/cart/addToCart`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        if (error.status === 401) {
            return { message: "Please Login!" }
        }
        return error?.response?.data
    }
}

export async function updateCartByProductId(payload, id) {
    try {
        const response = api.put(`/cart/updateCartByProductId/${id}`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getUserCart() {
    try {
        const response = api.get(`/cart/getUserCart`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function deleteCart(id) {
    try {
        const response = api.delete(`/cart/deleteCartByProductId/${id}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}


export async function getUserCartAndWishListCount() {
    try {
        const response = api.get(`/cart/getUserCartAndWishListCount`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}