import { API } from "../backend";

export const updateuserdetails = (userId,token,values) => {
    console.log(userId,values)
    return fetch(`${API}/users/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(values)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

export const gettinguserdetails = (userId,token) => {
    console.log(userId)
    return fetch(`${API}/users/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

export const gettingproductdetails = (productId,token) => {
    console.log(productId)
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}
export const gettingorders = (userId,token) => {
    console.log(userId)
    return fetch(`${API}/orders/users/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}


export const changingorders = (userId,orderId,token) => {
    console.log(orderId,userId,token)
    return fetch(`${API}/order/${userId}/${orderId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.text()
    }).catch(error => console.log(error))
}