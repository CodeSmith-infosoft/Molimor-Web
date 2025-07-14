import api from "../api"

export async function addReview(payload) {
    try {
        const response = api.post(`/review/addReview`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function getAllReviewByProductId(id) {
    try {
        const response = api.get(`/review/getAllReviewByProductId/${id}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}