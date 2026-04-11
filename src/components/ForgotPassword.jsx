import axios from "../utils/axiosInstance"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "all" })

    const onSubmit = async (data) => {
        try {
            await axios.post("/auth/forgot-password", data)
            toast.success("Reset link sent to email")
            reset()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to send reset link")
        }
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-gray-900 to-orange-200">
            <div className="w-full md:w-1/2 flex items-center justify-center bg-grey-100 p-8">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-md"
                >
                    <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Forgot Password</h2>

                    <div className="mb-6">
                        <label className="block mb-1 font-medium">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Send Reset Link
                    </button>
                </form>
            </div>

            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-r from-gray-900 to-orange-200">
                <div className="w-170 h-160 overflow-hidden shadow-lg">
                    <img
                        src="https://tse1.mm.bing.net/th/id/OIP.pbfVVTxfx6HRc9fwVZWuDgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
                        alt="Forgot Password"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
