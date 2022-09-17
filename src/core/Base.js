import React from 'react'
import Menu from './Menu';
const BASE = ({
    Title="My Title",
    Description="My Description",
    className="text-dark p-4",
    children
})=> {
    return (
        <div>
            <Menu />
            <div className="container-fluid bg-dark">
                <div className="jumbotron text-light bg-dark text-center">
                <h2 className='display-4'>
               {Title}
                </h2>
                <p className='lead'>
                {Description}
                </p>
                </div>
                <div className={className}>
                {children}
                </div>
            </div>
        </div>
    )
}
export default BASE;