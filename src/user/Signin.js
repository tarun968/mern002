import React, { useState } from "react";
import BASE from "../core/Base";
import { Navigate } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper";
import { Link } from "react-router-dom";
const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })
    const { email, password, error, loading, didRedirect } = values
    const  user  = isAuthenticated()
    console.log("here comes the user",{user})
    console.log("return of authenticated function =>",isAuthenticated())
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    console.log("data.error",data.error)
                    setValues({...values, error: data.error, loading: true })
                }
                else {
                    authenticate(data, () => {
                        console.log("data that we got is ",data)
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch()
    }

    const performRedirect = event => {
        if (didRedirect) {
            if(user.data==="Null"){
                console.log(user)
               return <p>Redirect to Hell</p>
            }
            if(user.user.role==="1"){
                console.log("user with the role",user)
                return <Navigate replace to="/admin" />   
            }
            else if(user){
                console.log(user)
                return <Navigate replace to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return (
                <Navigate to="/signin" replace={true} />
            )
        }
    }
    // const loadingMessage = () => {
    //     return (
    //         loading && (
    //             <div className="alert alert-info">
    //                 <h2>Loading...</h2>
    //             </div>
    //         )
    //     )
    // }
    const errorMessage = () => {
        return (
            <div>
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>
                    Sorry You can not login as your password\emailid is wrong
                    <Link to='/Forgotten-password'>Forgottent password?</Link>
                </div>
            </div>
        )
    }

    const signInForm = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form>
                            <div className="form-group">
                                <label className="text-light">eMail</label>
                                <input type="email"
                                    onChange={handleChange("email")}
                                    className="form-control"
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-light">pAssword</label>
                                <input type="password"
                                    onChange={handleChange("password")}
                                    className="form-control"
                                    value={password} />
                            </div>
                            <button onClick={onSubmit} className="mt-3 w-100 btn btn-success btn-block">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <BASE Title="Sign IN page" Description="A page for thee user to sign iN!">
            {
                errorMessage()
            }
            {
                signInForm()
            }
            {
                performRedirect()
            }
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </BASE>
    )
}
export default Signin