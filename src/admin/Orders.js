import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import BASE from "../core/Base";
import OrdersFetch from "./helper/adminapicall";
import { Link } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const { token, user } = isAuthenticated()

    const Orderfetcher = () => {
        OrdersFetch(user._id, token).then(
            data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setOrders(data)
                }
            }
        )
    }

    useEffect(() => {
        Orderfetcher()
    }, [])
    return (
        <BASE Title="Orders Management Page" Description="Updateing the orders of the Products">
            <div className="card w-75 mx-auto">
                <h4 className="mt-3 card-header bg-success text-white text-center">
                    oRders
                </h4>
                {
                    orders.map((order, index) => {
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
                                                    <li className="list-group-item text-success text-center">
                                                        Id : {products._id}
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                    }
                                </li>
                                {
                                    order.status !== "Cancelled" ?
                                        <Link
                                            className="btn btn-success"
                                            to={`/order/update/${order._id}`}
                                        >
                                            <span className="">Update</span>
                                        </Link>
                                        : <Link
                                            className="btn btn-danger disabledCursor" 
                                            onClick={ (event) => event.preventDefault() }
                                            to={`/order/update/${order._id}`}
                                        >
                                            <span className="">Cancelled order</span>
                                        </Link>
                                }

                            </ul>
                        )
                    })
                }
            </div>
        </BASE>
    )
}

export default Orders;