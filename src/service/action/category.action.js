import api from "../api"

export async function getCategoryList() {
    try {
        const response = api.get(`/category/getCategoryList`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getActiveSubCategoryList() {
    try {
        const response = api.get(`/subCategory/getActiveSubCategoryList`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}