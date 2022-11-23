import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import BASE from "../core/Base";
import { getCategories, getProduct, updateProduct } from "../user/helper/userapicalls";
import { Link, useParams } from "react-router-dom";
import { render } from "@testing-library/react";

const UpdateProducts = () => {
  const {productId} = useParams()
  console.log(productId)
  const [products, setProduct] = useState([]);
  const { user, token } = isAuthenticated()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const { name, description,
    price, stock,
    categories, category,
    loading, error,
    createdProduct, getaRedirect,
    formData } = values;

  const preload = (product_ID) => {
    console.log("hehehehe",product_ID)
    getProduct(product_ID).then(data => {
      console.log("data is here with me", data)
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
        setValues({...values,formData: new FormData()})
      }
    })
  }
  useEffect(() => {
    preload(productId);
  }, [])
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true })
    updateProduct(productId, user._id, token,formData).then(data => {
      console.log(data)
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          categories: [],
          category: "",
          loading: false,
          error: true,
          createdProduct: "done",
          getaRedirect: false,
          formData: ""
        })
      }
    })
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formData.append(name, value)
    setValues({ ...values, [name]: value })
  };
  const updateProductForm = () => (
    <form>
      {/* <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            // accept="image"
            placeholder="choose a file"
          />
        </label>
      </div> */}
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      {/* <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {
            categories && categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))
          }
        </select>
      </div> */}
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );



  return (


    <BASE
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {/* {
          errorMessage()
        }
        {
          successMessage()    
        } */}
          {
            updateProductForm()
          }
        </div>
      </div>
    </BASE>
  );
}

export default UpdateProducts