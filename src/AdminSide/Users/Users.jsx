import React, { useEffect, useState } from 'react'
import axios from "axios"

function Users() {
    const [products, setProducts] = useState("")
    const [images,setImage]=useState([])


    const multiple = async () => {
        await axios.get("http://localhost:5000/api/products")
            .then(function (response) {
                setProducts(response.data.products)
            })
    }

    console.log("data", products)
    // {dat && dat.map((element,index)=>
    //     console.log(element.name)
    // )}

    useEffect(() => {
        multiple()
    }, [])


    console.log(images)


    return (
        <>
            {
                products && products.map((element, index) => (
                    <diV key={element._id}>
                        <h3>{element.name}</h3>
                        <div className='row'>
                        <img src={`http://localhost:5000/${element.images[0].filePath}`} height="50" className="card-img-top img-responsive" alt="img"/>

                            {/* {element.images.map((file, index) =>
                                <div className='col-6'>
                                    <div className='card mb-2 border-0 p-0'>
                                    <img src={`http://localhost:5000/${file.filePath}`} height="50" className="card-img-top img-responsive" alt="img"/>
                                    </div>
                                </div>
                            )}
                            
                            {element.images.map((file, index) =>
                                    <img src={`http://localhost:5000/${file.filePath}`} height="50" className="card-img-top img-responsive" alt="img"/>
                            )} */}


                        </div>
                    </diV>
                ))
            }




        </>
    )
}

export default Users