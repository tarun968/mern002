import { API } from "../../backend"

export const signup = user => {
    console.log("user was here",user)
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("Signup Route")
            console.log("Signup Route", response)
            return response.text()
        })
        .catch(err => console.log(err))
}
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("Signin Route", response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        console.log("authneticate ka function", data)
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        console.log("retrning to base")
        return false;
    }
}

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next()
        return fetch(`${API}/signout`, {
            method: 'POST'
        })
            .then(response => console.log("Sign out successfully"))
            .catch(err => console.log("error in signout"))
    }
}