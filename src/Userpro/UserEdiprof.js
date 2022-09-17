import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { signout } from "../auth/helper";
import BASE from "../core/Base";
import { gettinguserdetails } from "./UserAPI";
import { updateuserdetails } from "./UserAPI";
import { useNavigate } from "react-router-dom";
const UserEditProfile = () => {
    const navigate = useNavigate()
    const [orders, setorders] = useState([])
    const { token, user: { username, email, role, _id, address, password } } = isAuthenticated()
    const [values, setValues] = useState({
        name: username,
        emailid: email,
        addressuser: address,
        passworduser: password,
        error: "",
        success: false,
    })
    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        updateuserdetails(_id, token, values)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    signout(() => {
                   navigate("/signin")
                    })
                }
            })
            .catch(error => console.log(error))
    }
    const { name, emailid, passworduser, addressuser, success } = values
    const handleChange = name => event => {
            setValues({...values,error:false,[name]:event.target.value})
    }
    const preload = () => {
        gettinguserdetails(_id, token).then(data => {
            if (data.error) {
            } else {
                setorders(data)
            }
        }
        )
    }

    useEffect(() => {
        preload();
    }, [])

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
            <div>
                <div className="w-75 mt-5 mx-auto">
                    <h1 className="text-light"> Edit your Profile</h1>
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <p className="lead">
                                <input type="text"
                                    className="form-control my-3"
                                    onChange={handleChange('name')}
                                    value={name}
                                    autoFocus
                                    required
                                    placeholder="For Ex.Summer"
                                />
                            </p>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <p className="lead">
                                <input type="text"
                                    className="form-control my-3"
                                    onChange={handleChange('passworduser')}
                                    value={passworduser}
                                    autoFocus
                                    required
                                    placeholder="For Ex.Summer"
                                />
                            </p>
                        </div>
                        <div className="form-group">
                            <label className="text-light">email ID</label>
                            <p className="lead">
                                <input type="email"
                                    className="form-control my-3"
                                    onChange={handleChange('emailid')}
                                    value={emailid}
                                    autoFocus
                                    required
                                    placeholder="For Ex.Summer"
                                />
                            </p>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Address</label>
                            <p className="lead">
                                <input type="text"
                                    className="form-control my-3"
                                    onChange={handleChange('addressuser')}
                                    value={addressuser}
                                    autoFocus
                                    required
                                    placeholder="For Ex.Summer"
                                />
                                <button onClick={onSubmit} className="btn btn-outline-info">Update</button>
                            </p>
                        </div>
                    </form>
                </div>
                <p className="text-white text-center">{JSON.stringify(values)}</p>
            </div>
        </BASE>
    )
}

export default UserEditProfile