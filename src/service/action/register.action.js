import api from "../api"

export async function getProfile() {
    try {
        const response = api.get(`/user/profile`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function updateProfile(payload) {
    try {
        const response = api.put(`/user/updateProfile`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}
