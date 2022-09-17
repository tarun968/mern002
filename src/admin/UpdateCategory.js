import React, { useState } from "react"
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { updateCategory } from "../user/helper/userapicalls";
import BASE from "../core/Base"

const UpdateCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, token } = isAuthenticated()

    const { categoryId } = useParams()

    const handleChange = event => {
        setError("");
        setName(event.target.value)
    }
    const createdSuccessfully = () => {
        if (success) {
            return (<div>
                <h4 className="text-success"> Successfully done </h4>
            </div>
            )
        }
    }


    const createdUnSuccessfull = () => {
        if (error) {
            return (<div>
                <h4 className="text-success"> Not Successfully done </h4>
            </div>
            )
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        updateCategory(user._id, token, categoryId, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                }
                else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
    }

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to="/admin">
                Admin Home
            </Link>
        </div>
    )

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">
                    <input type="text"
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        placeholder="For Ex.Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
                </p>
            </div>
        </form>
    )
    return (
        <BASE Title="Create a new category here"
            Description="Add a new category here">
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {myCategoryForm()}
                    {createdUnSuccessfull()}
                    {createdSuccessfully()}
                    {goBack()}
                </div>
            </div>
        </BASE>
    )
}

export default UpdateCategory