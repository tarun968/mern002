import { API } from "../../backend";
export const OrderStatusUpdate = (orderId,userId,token,status) => {
    console.log(orderId,userId,token,status)
    return fetch (`${API}/order/${orderId}/status/${userId}`,{
        method:'PUT',
        headers :{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        },
    body: JSON.stringify({status,orderId})
    }).then(
        res => {
            //console.log(res)
            return res.json()
        }).catch(error => console.log(error))
}

export const OrderStatusFetch = (userId,token) => {
    console.log(userId,token)
    return fetch (`${API}/order/status/admin/${userId}`,{
        method:'GET',
        headers :{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(
        res => {
            return res.json()
        }).catch(error => console.log(error))
}

const OrdersFetch = (userId,token) => {
    console.log(userId,token)
    return fetch (`${API}/order/status/${userId}`,{
        method:'GET',
        headers :{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(
        res => {
            return res.json()
        }).catch(error => console.log(error))
}

export default OrdersFetch