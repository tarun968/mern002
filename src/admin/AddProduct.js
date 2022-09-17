import React, { useEffect } from "react";
import { useState } from "react";
import BASE from "../core/Base";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getCategories } from "../user/helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import { createProduct } from "../user/helper/userapicalls";
const AddProduct = () => {
    const {user,token} = isAuthenticated();
    const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo:"",
    categories:[],
    category:"",
    loading:false,
    error:"",
    createProduct:"",
    getaRedirect:false,
    formData:"",
  });
  const navigate = useNavigate()
  const { name, description, 
    price, stock,
    categories,category,
loading,error,
createdProduct,getaRedirect,
formData } = values;
const preload = () => {
    getCategories().then(data => {
        console.log("data is here with me",data)
        if(data.error){
            setValues({...values, error:data.error})
        }
        else{
            setValues({...values,categories:data,formData: new FormData()})
        }
    })
}
useEffect(()=>{
preload();
},[])
  const onSubmit = (event) => {
      event.preventDefault();
      setValues({...values,error:"",loading:true})
      createProduct(user._id,token,formData).then(data => {
        console.log(data)  
        if(data.error){
              setValues({...values,error:data.error})
          }
          else{
            navigate("/")
              setValues({
                  ...values,
                  name:"",
                  description:"",
                  price:"",
                  stock:"",
                  photo:"",
                  categories:[],
                  category:"",
                  loading:false,
                  error:true,
                  createdProduct:"done",
                  getaRedirect:false,
                  formData:""
              })
          }
      })
  };
  console.log(createdProduct)
  const successMessage = () => (
      <div className="alert alert-success mt-3"
      style={{display:createdProduct ? "":"none"}}>
      <h4>Done Successfully</h4>
      </div>
  )
  
  const errorMessage = () => (
      <div className="alert alert-success mt-3"
      style={{display:error ? "none":""}}>
      <h4>Not Done, Check you credential once again</h4>
      </div>
  )
  const handleChange = name => event => {    
      const value = name === "photo" ? event.target.files[0] : event.target.value
      formData.set(name,value)
      console.log(event)
      console.log(name)
      setValues({...values,[name]:value})     
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
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
      </div>
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
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
        {
            categories && categories.map((cate,index)=>(
                <option key = {index} value={cate._id}>
                    {cate.name}
                </option>
            ))
        }
        </select>
      </div>
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
        {
          successMessage()    
        }
        {
          createProductForm()
        }
        </div>
      </div>
    </BASE>
  );
}

export default AddProduct