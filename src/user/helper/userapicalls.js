import { API } from "../../backend";

export const updateCategory = (userId,token,categoryId,name) =>{
    console.log(userId, token, categoryId,name)
    return fetch(`${API}/cri/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(name)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))    
}

export const deleteCategory = (userId,categoryId,token) =>{
    console.log(userId,categoryId,token)
    return fetch(`${API}/cri/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
           "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        ///body: JSON.stringify(categoryId)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))    
}
export const createCategory = (userId, token, category) => {
    console.log(userId, token, category)
    return fetch(`${API}/cr/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    })
        .catch(err => console.log(err))
}
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    })
        .catch(err => console.log(err))
}
export const createProduct = (userId, token, category) => {
       return fetch(`${API}/pr/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            //"Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: category
    }).then(response => {
        console.log(response)
        return response.json()
    }).catch(error => console.log(error))
}
export const updateProduct = (productId, userId, token,category) => {
    console.log("prodcut id ",productId,"user id ", userId,"token id ")
    return fetch(`${API}/pr/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
        //    "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: category
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}
export const getProduct = productId => {
    console.log(productId)
    return fetch(`${API}/pr/${productId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    })
        .catch()
}
export const deleteProduct = (productId, userId, token) => {
    console.log(productId, userId, token)
    return fetch(`${API}/pr/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
           "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response
    }).catch(error => console.log(error))
}