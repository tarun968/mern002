import React, { useState, useEffect, useContext } from 'react'
import '../styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ImageHelper from '../core/ImageHelper';
import { createContext } from 'react';
import { gettingproductdetails } from '../Userpro/UserAPI';
import { isAuthenticated } from '../auth/helper';
import Menu from '../core/Menu';

const img_pro_single = createContext()
const ProductDesc = () => {
    const x = useParams()
    console.log(x.productId)
    const { token } = isAuthenticated()
    const [productdetail, setproductdetails] = useState([])

    const gettheproduct = () => {
        gettingproductdetails(x.productId, token).then(
            data => {
                if (data.error) {
                    console.log("Erroris herre ", data.error)
                }
                else {
                    setproductdetails(data)
                    console.log(data)
                }
            }
        )
    }
    useEffect(() => {
        gettheproduct()
    }, [])
    console.log(productdetail)
    return (
        <div>
            <Menu />
            <div className="card-header bg-dark lead">
                <div className="card-body bg-dark">
                    <div className="row">
                        <div className="col-12 border border-success">
                            <img_pro_single.Provider value={productdetail}>
                                <ImageHelper />
                            </img_pro_single.Provider>
                            <p className="mt-2 btn text-success rounded btn-sm px-4 w-100">
                                Name of the product :{productdetail.name}
                            </p>
                            <p className="mt-2 btn text-success rounded btn-sm px-4 w-100">
                                Description : {productdetail.description}
                            </p>
                            <p className="mt-2 btn text-success rounded btn-sm px-4 w-100">
                               stock of the product : {productdetail.stock}
                            </p>
                            <p className="mt-2 btn text-success rounded btn-sm px-4 w-100">
                              Number sold : {productdetail.sold}
                            </p>
                            <p className="mt-2 btn text-success rounded btn-sm px-4 w-100">
                              Price : {productdetail.price}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDesc
export { img_pro_single }