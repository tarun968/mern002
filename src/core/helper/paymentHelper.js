import { API } from "../../backend";
export const getmetoken = (userId, token) => {
    console.log(userId, "Here is the token", token)
    return fetch(`${API}/india/payment/gettoken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(
        response => {
            return response.json()
        }
    ).catch
        (err => console.log(err))
}

export const processPayment = (userId, token, paymentInfo) => {
    console.log(userId, token, paymentInfo)
    return fetch(`${API}/payment/braintree/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(
        response => {
            return response.json()
    }
    ).catch
        (err => console.log(err))
}