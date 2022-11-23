import { API } from "../../backend"
export const sendOtp = (formData) => {
    return fetch(`${API}/sendOTP`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: (formData)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}


export const verifyOtp = (formData) => {
    return fetch(`${API}/verifyOTP`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: (formData)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}
