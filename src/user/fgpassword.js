import React, { useState, useEffect } from "react";
import BASE from "../core/Base";
import { Navigate } from "react-router-dom";
import { sendOtp,verifyOtp } from "./helper/forgottenpasword";
import { Link } from "react-router-dom";
const Fgpassword = () => {
    const [values, setValues] = useState({
        email: "",
        error: "",
        formData: "",
        loading: false,
        didRedirect: false
    })


    const preload = () => {
        setValues({ ...values, formData: new FormData() })
        setValues2({ ...values2, formData2: new FormData() })
    }

    useEffect(() => {
        preload()
    }, [])

    const { email, formData,error, loading, didRedirect } = values
    const [values2, setValues2] = useState({
        password: "",
        otp: "",
        formData2:""
    })
    const { password, otp,formData2 } = values2

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        console.log(event)
        console.log(name)
        setValues({ ...values, [name]: value })

    }

    const handleChange2 = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData2.set(name, value)
        console.log(event)
        console.log(name)
        setValues2({ ...values2, [name]: value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        sendOtp(formData)
            .then(data => {
                if (data.error) {
                    console.log("data.error", data.error)
                    setValues({ ...values,formData:"" })
                }
                else {
                    setValues({
                        ...values,
                        formData: "",
                    })
                }
            })
            .catch(err => { console.log(err) })
    }


    const onReset = event => {
        event.preventDefault();
        setValues2({ ...values2, error: false, loading: true })
        verifyOtp(formData2)
            .then(data => {
                if (data.error) {
                    console.log("data.error", data.error)
                    setValues2({ ...values2})
                }
                else {
                    setValues2({
                        ...values2,
                        formData2: "",
                    })
                }
            })
            .catch(err => { console.log(err) })
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
                            <button onClick={onSubmit} className="mt-3 w-100 btn btn-success btn-block">
                                Send OTP
                            </button>
                        </form>

                        <form className="mt-5">
                            <div className="form-group">
                                <label className="text-light">New Password</label>
                                <input type="password"
                                    onChange={handleChange2("password")}
                                    className="form-control"
                                    value={password} />
                            </div>
                            <div className="form-group">
                                <label className="text-light">eMail</label>
                                <input type="email"
                                    // hidden
                                    onChange={handleChange("email")}
                                    className="form-control"
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-light">OTP</label>
                                <input type="number"
                                    onChange={handleChange2("otp")}
                                    className="form-control"
                                    value={otp} />
                            </div>
                            <button onClick={onReset} className="mt-3 w-100 btn btn-success btn-block">
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
                signInForm()
            }
        </BASE>
    )
}
export default Fgpassword