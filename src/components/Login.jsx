import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from "../utils/axiosInstance";

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" })
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {

            const res = await axiosInstance.post("/auth/login", data)

            console.log("response", res)
            //     console.log("response", res.data)

            // const token = res.data?.data?.token || res.data?.token
            // const role = res.data?.data?.role || res.data?.role
            // const user = res.data?.data?.user || res.data?.user

            if (res.status === 200) {

                toast.success("Login Successfully")

                localStorage.setItem("token", res.data.token)
                localStorage.setItem("role", res.data.role)
                localStorage.setItem("user", JSON.stringify(res.data.user || {}))

                const role = res.data.role?.toLowerCase()

                if (role === "player" || role === "players") {
                    navigate("/players")
                }

                else if (role === "admin") {
                    navigate("/admin")
                }

                else if (role === "coach") {
                    navigate("/coach")
                }

                else if (role === "arenamanager") {
                    navigate("/arenamanager")
                }

                else {
                    toast.error("Invalid Role")
                    navigate("/")
                }
            }

        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.message || "Login Failed")
        }
    }

    const valiedSchema = {

        emailValidator: {
            required: {
                value: true,
                message: "Email is required *"
            }
        },

        passwordValidator: {
            required: {
                value: true,
                message: "Password is required *"
            }
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-orange-200">

            <div className="w-full md:w-1/2 flex items-center justify-center p-8">

                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="bg-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-md"
                >

                    <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
                        Login
                    </h2>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Email</label>

                        <input
                            type='email'
                            placeholder='Enter your Email'
                            {...register("email", valiedSchema.emailValidator)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Password</label>

                        <input
                            type='password'
                            placeholder='Enter your password'
                            {...register("password", valiedSchema.passwordValidator)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.password?.message}
                        </p>
                    </div>

                    <div className="mb-4 text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                    <p className="text-sm text-center mt-4">
                        New user?
                        <Link
                            to="/signup"
                            className="text-blue-600 ml-1"
                        >
                            Signup
                        </Link>
                    </p>

                </form>

            </div>

            {/* <div className="hidden md:flex md:w-1/2 items-center justify-center">

                <img
                    src="https://tse1.mm.bing.net/th/id/OIP.pbfVVTxfx6HRc9fwVZWuDgAAAA"
                    alt="login"
                    className="w-full h-full object-cover"
                />

            </div> */}

        </div>
    )
}