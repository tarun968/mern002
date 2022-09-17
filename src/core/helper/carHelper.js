export const addItemtoCart = (item, next) => {
    let cart = []
    console.log(item)
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
    }
    function upsert(array, element) {
        console.log(element)
        const i = array.findIndex(_element => _element.name === element.name);
        if (i > -1) array[i].count += 1; // (2)
        else {
            element["count"] = 1
            array.push(element);
        }
    }
    // const array = [
    //     { id: 0, name: 'Apple', description: 'fruit', count: 1 },
    //     { id: 1, name: 'Banana', description: 'fruit', count: 1 },
    //     { id: 2, name: 'Tomato', description: 'vegetable', count: 1 }
    // ];

    // upsert(array, { id: 2, name: 'Tomato', description: 'fruit' })
    // console.log(array);
    // upsert(array, { id: 3, name: 'Cucumber', description: 'vegetable' })
    // console.log(array);
    upsert(cart, item)
    localStorage.setItem("cart", JSON.stringify(cart))
    next();
}
export const loadCart = () => {
    if (typeof window !== "undefined") {
        console.log(localStorage.getItem("cart"))
        console.log(JSON.parse(localStorage.getItem("cart")))
        if (localStorage.getItem("cart")) {
            console.log(localStorage.getItem("cart"))
            return JSON.parse(localStorage.getItem("cart"))
        }
        else{
            return []
        }
    }
}
export const removeitemfromCart = (productId) => {
    let cart = []
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product, i) => {
            console.log("here is the prduct to remove",product)
            if(product._id === productId){   
            if (product.count > 1) {
                product.count -= 1
            }
            else if (product.count === 1) {
                cart.splice(i, 1)
            }
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
}

export const cartEmpty = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart")
    }
}