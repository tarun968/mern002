import React, { useState } from "react";
import BASE from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

const  Signupbyadmin = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        address:"",
        role:"1",
        error: "",
        success: false,
    })
    const { name, email, password, address,role, error, success } = values
    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    //event is triggered when values are entered in the input. 
    //This fires a function handleChange(), 
    //that is used to set a new state for the input.
    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values,role:"1",error:false})
        //This function would set values as per the given format
        signup({name,email,password,address,role})
        .then(data =>{
            if(data.error){
                console.log("data error is the following",data.error)
                setValues({...values,error:data.error,success:false})
            }
            else{
                console.log("j",data)
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    address:"",
                    role:"1",
                    error: "",
                    success: true,
                })
            }
        })
        .catch(error=>console.log(error))
    }

    const signUpForm = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form>
                            <div className="form-group">
                                <label className="text-light">Name</label>
                                <input type="text"
                                 className="form-control"
                                 onChange={handleChange("name")} 
                                 value={name}
                                 />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Address</label>
                                <input type="text"
                                 className="form-control"
                                 onChange={handleChange("address")} 
                                 value={address}
                                 />
                            </div>
                            <div className="form-group">
                                <label className="text-light">Role</label>
                                <input type="text"
                                 className="form-control"
                                //  onChange={handleChange("role")} 
                                 value={role}
                                 />
                            </div>
                            <div className="form-group">
                                <label className="text-light">eMail</label>
                                <input type="email" 
                                className="form-control"
                                onChange={handleChange("email")} 
                                value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-light">pAssword</label>
                                <input type="password" 
                                className="form-control"
                                onChange={handleChange("password")} 
                                value={password}
                                />
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

    const sucessMessage = () =>{
        return(
            <div>
                <div className="alert alert-success"
                style={{display:success?"":"none"}}>
                New Admin has been added successfully.
                </div>
            </div>
        )
    }
    const errorMessage = () =>{
        console.log(error)
        return(
            <div>
                <div className="alert alert-danger"
                style={{display:error?"":"none"}}>
                New account couldn't be added successfully
                </div>
            </div>
        )
    }
    return (
        <BASE Title="Sign UP page" Description="A page for thee user to sign uP!">
            {
                errorMessage()
            }
            {
                sucessMessage()
            }
            {
                signUpForm()
            }
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </BASE>
    )
}

export default Signupbyadmin