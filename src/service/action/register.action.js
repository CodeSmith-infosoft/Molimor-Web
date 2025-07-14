import api from "../api"

export async function register(payload) {
    try {
        const response = api.post(`/user/register`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function login(payload) {
    try {
        const response = api.post(`/user/login`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

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

export async function getGoogleURL() {
    try {
        const response = api.get(`/user/getGoogleOAuthUrl`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function getGoogleLogin(code) {
    try {
        const response = api.post(`/user/googleOAuthLogin`, {code})

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function getFacebookURL() {
    try {
        const response = api.get(`/user/getFacebookOAuthUrl`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function getFacebookLogin() {
    try {
        const response = api.get(`/user/facebookOAuthLogin`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}