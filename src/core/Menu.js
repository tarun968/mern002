import React, { Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { signout } from "../auth/helper"
import { isAuthenticated } from "../auth/helper";
const Menu = () => {
    const userNavigate = useNavigate()
    return (<div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link
                    className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cart">
                    CART
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === "1"
                && (
                    <li>
                        <Link className="nav-link" to="/admin">
                            A.DASHBOARD
                        </Link>
                    </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role !== "1"
                && (
                    <li>
                        <Link className="nav-link" to="/user/dashboard">
                            U.DASHBOARD
                        </Link>
                    </li>
                )}


            {!isAuthenticated() && (
                <Fragment>
                    <li>
                        <Link className="nav-link" to="/signup">
                            SIGNUP
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="nav-link" to="/signin">
                            SIGNIN
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link text-warning"
                        onClick={() => {
                            signout(() => {
                                userNavigate("/")
                            })
                        }}
                    >
                        SIGNOUT
                    </span>
                </li>
            )}
        </ul>
    </div>)
}

export default Menu