import api from "../api"

export async function addContactUs(payload) {
    try {
        const response = api.post(`/contact/addContactUs`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}