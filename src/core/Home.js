import React, { createContext, useEffect, useState } from 'react'
import '../styles.css'
import BASE from './Base'
import 'bootstrap/dist/css/bootstrap.css';
import Card from './Card';
import { getAllproducts } from './helper/coreapicalls';
import ImageHelper from './ImageHelper';
const Product_pro = createContext()

export default function Home() {
    const [products, setproducts] = useState([])
    const [error, setError] = useState(false)
    const Uploadproducts = () => {
        getAllproducts().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setproducts(data)
            }
        })
    }

    useEffect(() => {
        Uploadproducts()
    }, [])
    console.log(products)
    return (
        <BASE Title="Welcome to T-SHIRT STORE"
        >
            <div className="row">
                {
                    products.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                            <Product_pro.Provider value = {product}>
                                    <ImageHelper />
                                </Product_pro.Provider>                        
                                <Card product ={
                                product
                                }/>
                            </div>
                        )
                    })
                }
            </div>
        </BASE>
    )
}

export { Product_pro } 