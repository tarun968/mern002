import React from "react"
import BASE from "../core/Base"
import { Link } from "react-router-dom"
const  UserDashboard = () => {
    
    return (
        <BASE Title="UserDashboard page">
            <div className="card w-75 mx-auto">
                <h4 className="card-header bg-dark text-white text-center">
                    UserDashboard
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/profile" className="text-center nav-link text-success">
                            sEe yOur proFile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/edit/profile" className="nav-link text-center text-success">
                        eDit yOur proFile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/order" className="nav-link text-success text-center">
                            sEe And edit yOur orDers
                        </Link>
                    </li>
                    {/* <li className="list-group-item">
                        <Link to="user/edit/orders" className="nav-link text-success text-center">
                        upDate yOur orDers
                        </Link>
                    </li> */}
                </ul>
            </div>
        </BASE>
    )
}

export default UserDashboard