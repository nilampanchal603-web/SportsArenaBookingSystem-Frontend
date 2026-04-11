import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        toast.success("Logout successful")
        navigate("/login")
    }, [navigate])

    return null
}

export default Logout
