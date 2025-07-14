import axios from "axios";
import api from "../api"

export async function placeOrder(payload) {
    try {
        const response = api.post(`/order/placeOrder`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        if (error.status === 401) {
            return { message: "Please Login!" }
        }
        return error?.response?.data
    }
}
export async function getAllUserOrders() {
    try {
        const response = api.get(`/order/getAllUserOrders`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function getOrderById(id) {
    try {
        const response = api.get(`/order/getOrderById/${id}`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function validateCoupon(payload) {
    try {
        const response = api.post(`/coupon/validateCoupon`, payload)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function fetchCountries() {
    try {
        const response = axios.get(`https://api.countrystatecity.in/v1/countries`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function fetchStates(country) {
    try {
        const response = axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`)

        return (await response).data
    } catch (error) {
        console.log(error)
        return error
    }
}