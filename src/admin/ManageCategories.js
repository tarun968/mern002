import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import BASE from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories } from "../user/helper/userapicalls";
import { deleteCategory } from "../user/helper/userapicalls";
const ManageCategories = () => {
    const [categories, setCatgories] = useState([])
    const { user, token } = isAuthenticated()
    const preload = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log("error ki maa ka bhosda", data.error)
            }
            else {
                setCatgories(data);
            }
        }
        ).catch(
            err => console.log(err)
        )
    }

    const deletethisCategory = (categoryId) =>{
        deleteCategory(user._id,categoryId,token).then(
            data => {
                if(data.error) {
                    console.log(data.error)
                }
                else{
                    preload()
                }
            }
        ).catch(
            err => console.log(err)
        )
    }

    useEffect(() => {
        preload()
    }, [])
    console.log(categories)
    return (
        <BASE>
            {
                categories.map((category, index) => {
                    return (
                        <div className="row">
                            <div className="col-12">    
                            <div className="col-3">
                            <h3 className="text-light text-left">{category.name}</h3>    
                            </div>
                            <div className="col-3">
                            <h3 className="text-light text-left">{category.createdAt}</h3>    
                            </div>
                            <div className="col-3">
                            <h3 className="text-light text-left">{category.updatedAt}</h3>    
                            <button onClick={() => deletethisCategory(category._id)}
                            className="btn btn-danger">Delete the category</button>
                             <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                            </div>
                        </div>
                        </div>
                    )
                })
            }
        </BASE>
    )
}

export default ManageCategories