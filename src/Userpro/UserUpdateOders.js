import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { OrderStatusFetch } from "../admin/helper/adminapicall";
import { OrderStatusUpdate } from "../admin/helper/adminapicall";
import BASE from "../core/Base"
import { useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom'

const UserUpdateOders = () => {
    const [name, setName] = useState("")    
    const [status, setStatus] = useState("")
    let navigate  = useNavigate()

    const handleChange = event => {
        console.log(event)
        setStatus(event.target.value)
        console.log(status)
    }
    const { user: { _id }, token } = isAuthenticated()
    console.log(_id, token)
    console.log(status)
    const Update = event => {
        event.preventDefault();
        OrderStatusUpdate(orderId,_id,token,{status}).then(
            data => {
                if(data.error){
                    console.log(data.error)
                }
                else{
                    setStatus("")
                    navigate("/admin/manage/order")
                    console.log(data)
                }
            }
        )
    }

    const { orderId } = useParams()
    console.log(orderId)
    const OrdersStatusUpdate = () => {
        OrderStatusFetch(_id, token).then(
            data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    data.shift()
                    setName(data)
                    console.log(data)
                }
            }
        )
    }

    useEffect(() => {
        OrdersStatusUpdate()
    }, [])
    console.log(name)
    return (
        <BASE Title="Update"
            Description="Update The Status of the Orders">
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2 h-75">
                    <form>
                        <div className="mt-4 form-group">
                            <select
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Category"
                                value={name}
                            >
                                <option>Select</option>
                                {
                                    name && name.map((cate, index) => (
                                        <option key={index} value={cate}>
                                            {cate}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <button
                            type="submit"
                            onClick={Update}
                            className="mt-5 btn btn-outline-success mb-3"
                        >
                            Update The Order
                        </button>
                    </form>
                </div>
            </div>
        </BASE>
    )
}

export default UserUpdateOders