import React, { useContext } from "react"
import '../styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import { API } from '../backend';
import { Product_pro } from "./Home";
import { img_pro } from "./Cart"
import { img_pro_single } from "../user/Productdesc";
const ImageHelper = () => {
    const proimage = useContext(Product_pro)
    const proimage2 = useContext(img_pro)
    const proimage3 = useContext(img_pro_single)
    console.log(proimage3)
    console.log(proimage2)
    console.log(proimage)
    const imageurl =
        proimage ? `${API}/ph/photo/${proimage._id}`
            : proimage2 ? `${API}/ph/photo/${proimage2._id}`
                : `${API}/ph/photo/${proimage3._id}`
    // let imageurl = ""
    // if(proimage){
    //     imageurl = `${API}/ph/photo/${proimage._id}`
    // }
    // if(proimage2){
    //     imageurl = `${API}/ph/photo/${proimage2._id}`
    // }
    // if(proimage3){
    //     imageurl = `${API}/ph/photo/${proimage3._id}`
    // }
    console.log(imageurl)
    return (
        <div className="rounded">
            <img
                src={imageurl}                                // {`${API}/ph/photo/${product._id}`}
                alt=""
                style={{ width: "100%", height: "35vh" }}
                className="border border-success rounded"
            />
        </div>
    )
}

export default ImageHelper