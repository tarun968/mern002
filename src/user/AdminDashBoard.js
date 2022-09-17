import React from "react"
import BASE from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
    const { user: { username, email} } = isAuthenticated()
    console.log(isAuthenticated())
    const adminLeftside = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    AdminNavgation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="create/category" className="nav-link text-success">
                            Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="admin/category" className="nav-link text-success">
                           Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="create/product" className="nav-link text-success">
                            Add product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="manage/product" className="nav-link text-success">
                            Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="manage/order" className="nav-link text-success">
                            Manage Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="add/admin" className="nav-link text-success">
                         Add another Admin
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightside = () => {
        return (
            <div className="card mb-4 bg-dark border-light">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className=" border-white list-group-item bg-dark text-light">
                        <span className="badge badge-sucess mr-2">Name:</span>{username}
                    </li>
                    <li className=" border-white list-group-item bg-dark text-light">
                        <span className="badge badge-sucess mr-2">Email:</span>{email}
                    </li>
                </ul>
            </div>
                )
    }
    return (
        <BASE Title="AdminDashboard page" Description="Manage the products ony here">
            <div className="row">
                <div className="col-3">
                    {adminLeftside()}
                </div>
                <div className="col-9">
                    {adminRightside()}
                </div>
            </div>
        </BASE>
    )
}
export default AdminDashboard