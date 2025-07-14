import { getParamString } from "@/utils/index.js";
import api from "../api";

export async function getAllProduct(payload) {
    try {
        const id = localStorage.getItem('_id')
        const response = api.get(`/product/getAllProductsList?${getParamString({...payload, userId: id})}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function getProductByID(id, subId) {
    try {
        const userid = localStorage.getItem('_id')
        const response = api.get(`/product/getProduct?${getParamString({userId: userid, productId: id, subCategoryId: subId})}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}

export async function getProductByName(name) {
    try {
        const id = localStorage.getItem('_id')
        const response = api.get(`/product/searchProduct?${getParamString({searchProduct: name,userId: id})}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}
export async function getPopularProductList() {
    try {
        const id = localStorage.getItem('_id')
        const response = api.get(`/product/getPopularProductList?${getParamString({userId: id})}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}
export async function getBigSalesProducts() {
    try {
        const id = localStorage.getItem('_id')
        const response = api.get(`/product/getBigSalesProducts?${getParamString({userId: id})}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }
}