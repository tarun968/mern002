import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import BASE from "../core/Base";
import {getProducts,deleteProduct} from "../user/helper/userapicalls"

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  
  const { user, token } = isAuthenticated();
  const preload = () => {
    getProducts().then(data => {
      console.log("hehehehe",data)  
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data)
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = productId => {  
    deleteProduct(productId, user._id, token).then(data => {
      console.log("userid",user._id,"toekn",token)
      console.log(data)
      if (data.error) {
        console.log(token)
        console.log(data.error);
      } else {
        console.log(token)
        preload();
      }
    });
  };


  
  console.log(products)
  console.log(products.photo)
  return (
    <BASE title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          {
            products.map((product, index) => {
            console.log(product)
            return (    
              <div key={index} className="row text-center mb-2 ">
                <div className="col-3">
                  <h3 className="text-light text-left">{product.name}</h3>
                </div>
                <div className="col-3">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-3">
                  {/* <p>{product.photo}</p> */}
                {/* <img src={} alt = "Logo"/> */}
                </div>
                <div className="col-3">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BASE>
  );
};

export default ManageProducts