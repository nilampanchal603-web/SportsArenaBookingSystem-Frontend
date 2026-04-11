import axios from "../../utils/axiosInstance"
import React, { useEffect, useState } from 'react'
import {useForm } from 'react-hook-form'
import { toast } from 'react-toastify'


const CreateProductCompnent = () => {
    const {register, handleSubmit} = useForm()
    const [categories,setcategories]=useState([])
 

    const submihandler= async(data)=>{
        console.log(data)
        try {
            const res= await axios.post("/product/product",data)
            if(res.status== 201){
            toast.success("Product creacting successfully")
            //navigate..
            }
        } catch (error) {
            toast.error("Error while creating product")
            
        }
       
    }

    const featchAllCategory=async(data)=>{
        const res= await axios.get("/category/allcategory")
        console.log(res.data.data)
        setcategories(res.data.data)
        
    }
    useEffect(()=>{
        featchAllCategory()
    },[])

    return (
        <div>
            <form onSubmit={handleSubmit(submihandler)}>
                <div>
                    <label>Name:</label>
                    <input type="text" {...register("name")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                </div>

                <div>
                    <label>Price:</label>
                    <input type="text" {...register("price")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                </div>

                <div>
                    <label>Categories</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" {...register("categoryId") }>
                        {
                        categories.map((cat)=>{
                            return <option key={cat._id} value={cat._id}>{cat.name}</option>
                        })
                    }
                    </select>
                </div>

                <div>
                    <input type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300" />
                </div>

            </form>

        </div>
    )
}

export default CreateProductCompnent
