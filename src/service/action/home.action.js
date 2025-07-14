import api from "../api"

export async function getAllBanner() {
    try {
        const response = api.get(`/banner/getAllBanner`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getAllBannerForShopNow() {
    try {
        const response = api.get(`/banner/getAllBannerForShopNow`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getAllCertificate() {
    try {
        const response = api.get(`/certificate/getAllCertificate`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getAllMedia(type: string) {
    try {
        const response = api.get(`/media/getAllMedia/${type}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getCompanyinfo() {
    try {
        const response = api.get(`/contact/getCompanyinfo`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getMarketPlace() {
    try {
        const response = api.get(`/media/getMarketPlace`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getAbout() {
    try {
        const response = api.get(`/about/getAbout`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function addSubscribeUser(email: string) {
    try {
        const response = api.post(`/user/addSubscribeUser`, { email })

        return (await response).data
    } catch (error: any) {
        console.log(error)
        return error?.response?.data
    }
}