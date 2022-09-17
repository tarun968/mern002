import { API } from "../../backend";

export const getAllproducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch(
        err => {
            console.log(err)
        }
    )
}