import React, { useState, useEffect, useContext } from 'react'
import '../styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { addItemtoCart } from './helper/carHelper';
import { removeitemfromCart } from './helper/carHelper';

const Card = (
    {
        product,
        addtocart = true,
        removefromcart = false,
        setreload = f => f,
        reload = undefined }
) => {
    const [redirect, setredirect] = useState(false);
    const addTocart = () => {
        addItemtoCart(product, () => setredirect(true))
    }
    const getreDirect = (redirect) => {
        if (redirect) {
            return (
                <Route path="/" element={<Navigate to="/cart" />}></Route>
            )
        }
    }
    const showaddtocart = (addtocart) => {
        return (addtocart && (
            <button
                className="btn btn-block w-100 btn-outline-success mt-2 mb-2"
                onClick={addTocart}
            >
                Add to Cart
            </button>
        )
        )
    }
    const removecart = (removefromcart) => {
        return (
            removefromcart && (
                <button
                    className="btn btn-block w-100 mt-2 mb-2 btn-outline-light"
                    onClick={
                        () => {
                            removeitemfromCart(product._id)
                            setreload(!reload)
                        }
                    }
                >
                    Remove from Cart
                </button>
            )
        )
    }
    return (<div className="card-header bg-dark lead">
        <div className="card-body bg-dark border border-4 border-success ">
            {getreDirect}
            <p className="border btn text-success rounded btn-sm px-4 w-100">
                {product.name}
            </p>
            <p className="border btn text-success rounded btn-sm px-4 w-100">
                {
                    product.description.substring(0, 35)
                }............
            </p>
            <Link to={`product/${product._id}`}>
                <p className="border border-4 border-success btn text-success rounded btn-sm px-4 w-100">
                    {
                        product._id
                    }
                </p>
            </Link>
            {product.count !== 0
                && (
                    <p className="btn text-success rounded btn-sm px-4 w-100">
                        {product.count}
                    </p>

                )
            }
            <p className="btn text-success rounded btn-sm px-4 w-100">
                $ {product.price}
            </p>
            <div className="row">
                <div className="col-12">
                    {
                        showaddtocart(addtocart)
                    }
                </div>
                <div className="col-12">
                    {
                        removecart(removefromcart)
                    }
                </div>
            </div>
        </div>
    </div>
    )
}
export default Card