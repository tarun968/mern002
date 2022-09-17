import React, { useEffect, useState, createContext } from 'react'
import '../styles.css'
import BASE from './Base'
import 'bootstrap/dist/css/bootstrap.css';
import ImageHelper from './ImageHelper';
import { loadCart } from './helper/carHelper';
import Card from './Card';
import {useHistory,useLocation } from 'react-router-dom';
import PaymentB from './Paymentb';
const img_pro = createContext()
export default function Cart() {
    const [products, setProducts] = useState([])
    const [reload,setreload] = useState(false)
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])
    console.log(products)
    const loadAllproducts = () => {
        console.log(products)
        return (
            <div>
                <h2>
                    This section is to load the cart
                </h2>
                {products.map((product, index) => {
                    return (
                        <div>
                        <img_pro.Provider value = {product}>
                                    <ImageHelper />
                                </img_pro.Provider>                       
                        <Card product={product}
                            addtocart={false}
                            removefromcart={true}
                            setreload={setreload}
                            reload={reload}
                        />
                        </div>
                    )
                })}
            </div>
        )
    }
    const loadCheckout = () => {
        return (
            <div>
                <h2>
                    This section is to load the check cart
                </h2>
            </div>
        )
    }
    return (
        <BASE Title="Welcome to T-SHIRT STORE"
            Description='Ready to check out , are you?'
        >
            <div className="row">
            {/* <div className='col-6'>
                {
                    products[0] &&(
                        <h4> No products </h4>
                    )
                    }
                </div> */}
                <div className='col-6'>
                {
                    products.length > 0 ? (
                        loadAllproducts(products)
                    ): (
                        <h4> No products </h4>
                    )
                    }
                </div>
                <div className="col-6">
                <PaymentB products={products}/>
                </div>
            </div>
        </BASE>
    )
}
export {img_pro}