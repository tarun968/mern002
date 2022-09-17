import React, { useEffect, useState } from "react";
import BASE from "../core/Base";
import { gettinguserdetails } from "./UserAPI";
import { changingorders } from "./UserAPI";
import { isAuthenticated } from "../auth/helper";

const UserOrder = () => {
    function refreshPage() {
        window.location.reload(false);
    }
    const [orders, setorders] = useState([])
    const { token, user: { username, email, role, _id } } = isAuthenticated()
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
    const UpdateOrderStatus = (product_ID) => {
        changingorders(_id, product_ID, token).then(data => {
            if (data.error) {
            } else {
                console.log(data)
                refreshPage()
            }
        })
    }
    useEffect(() => {
        preload()
    }, [])
    return (
        <BASE Title="User Profile" Description="The Below Are Your Details">
            <div className="card w-75 mx-auto">
                <h4 className="mt-3 card-header bg-success text-white text-center">
                    Your orders
                </h4>
                {
                    orders.map((order, index) => {
                        console.log(order)
                        return (
                            <ul className="list-group">
                                <li className="bg-dark list-group-item text-primary text-center">
                                    {order.transaction_id}
                                </li><li className="bg-dark list-group-item text-primary text-center">
                                    {order._id}
                                </li>
                                <li className="list-group-item text-success text-center">
                                    {order.status}
                                </li>
                                <li className="list-group-item text-success text-center">
                                    Ordered On{order.createdAt.substring(0, 10)}
                                </li>
                                <li className="list-group-item text-success text-center">
                                    Updated on:{order.updatedAt.substring(0, 10)}
                                </li>
                                <li className="list-group-item text-success text-center">
                                    Address: {order.address}
                                </li>
                                <li className="list-group-item text-success text-center">
                                    Status: {order.status}
                                </li>
                                <li className="list-group-item text-success text-center">
                                    <h4>Products in this order</h4>
                                    {order.products.map((products, secondindex) => {
                                        return (
                                            <div>
                                                <ul className="list-group">
                                                    <li className="list-group-item text-success text-center">
                                                        Name : {products.name}
                                                    </li>
                                                    <li className="list-group-item text-success text-center">
                                                        Sold : {products.sold}
                                                    </li>
                                                    <li className="list-group-item text-success text-center">
                                                        Category : {products.category}
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                    }
                                </li>
                                {
                                    order.status !== "Cancelled" ?

                                        <button
                                            type="submit"
                                            onClick={() => {
                                                UpdateOrderStatus(order._id);
                                            }}
                                            className="btn btn-outline-danger mb-3"
                                        >
                                            Cancel Order
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            className="btn btn-outline-danger mb-3"
                                        >
                                          Already Cancelled Order
                                        </button>
                                }
                            </ul>
                        )
                    })
                }
            </div>
        </BASE>
    )
}

export default UserOrder