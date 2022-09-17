import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import BASE from "../core/Base";
import { gettinguserdetails } from "./UserAPI";
const UserProfile = () => {
    const [orders, setorders] = useState([])
    console.log(isAuthenticated())
    const { token, user: { username, email, role, _id,address } } = isAuthenticated()
    const preload = () => {
        gettinguserdetails(_id, token).then(data => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
            } else {
                setorders(data)
            }
        }
        )
    }
    useEffect(() => {
        preload()
    }, [])
    console.log("order is here as an array ", typeof orders)
    console.log("order is here ", orders)

    return (
        <BASE Title="User Profile" Description="The Below Are Your Details">
            <div className="card w-75 mx-auto">
                <h4 className="card-header bg-dark text-white text-center">
                    Your proFile
                </h4>
                <ul className="list-group">
                    <li className="list-group-item text-success text-center">
                        {username}
                    </li>
                    <li className="list-group-item text-success text-center">
                        {email}
                    </li>
                    <li className="list-group-item text-success text-center">
                        {address}
                    </li>
                    <li className="list-group-item text-success text-center">
                        {role}
                    </li>
                    <li className="list-group-item text-success text-center">
                        {_id}
                    </li>
                </ul>
            </div>
        </BASE>
    )
}
export default UserProfile