import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from "../utils/axiosInstance";


export const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "all" })

    const password = watch("password", " ")


    const navigate = useNavigate()
    const submitHandler = async (data) => {
        console.log(data)
        try {
            //axios.post("http://localhost:3000/user/register")
            const res = await axiosInstance.post("/auth/register", data)
            console.log("response....", res)
            console.log("response.data....", res.data)
            console.log("response.data.data....", res.data.data)
            console.log("status", res.status)
            if (res.status == 201) {
                toast.success("user register successfully")
                navigate("/login")
            }
        } catch (err) {
            toast.error("error while login")
        }
    }
    const valiedSchema = {
        nameValidator: {
            required: {
                value: true,
                message: "Name is required*"
            }
        },
        emailValidator: {
            required: {
                value: true,
                message: "Email is required*"
            }
        },
        PhoneValidator: {
            required: {
                value: true,
                message: "Phone number is required*"
            },
            pattern: {
                value: /^[6-9]{1}[0-9]{9}$/,
                message: "Invalid Contact Number *"
            }

        },
        passwordValidator: {
            required: {
                value: true,
                message: "Password is required*"
            },
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: " password patter not valid*"
            }

        },
        conformValidator: {
            required: {
                value: true,
                message: "Conform password is required*"
            },
            validate: (params) => {
                return params === password || "password does not match"
            }
        },
        roleValidator: {
            required: {
                value: true,
                message: "role selection is required*"
            }
        },
        addressValidator: {
            required: {
                value: true,
                message: "Address is required*"
            },
            minLength: {
                value: 10,
                message: "min Address is 10 charecter"
            },
            maxLength: {
                value: 20,
                message: "max Address is 20 charecter"
            }

        },
        agreementValidator: {
            required: {
                value: true,
                message: "Agreement is required*"
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 p-6">

            <form onSubmit={handleSubmit(submitHandler)} className="bg-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    Signup
                </h2>

                {/* Firstname Name */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        {...register("firstName", valiedSchema.nameValidator)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
                </div>

                {/*Last Name */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName", valiedSchema.nameValidator)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", valiedSchema.emailValidator)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                </div>

                {/* Password */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", valiedSchema.passwordValidator)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                     <p className="text-gray-500 text-xs mt-1">Password must contain 8 characters, capital, number & symbol</p>
                    <p className="text-red-500 text-sm">{errors.password?.message}</p>


                </div>




                {/* Confirm Password */}
                <div className="mb-2">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("conform", valiedSchema.conformValidator)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-red-500 text-sm">{errors.conform?.message}</p>
                </div>


                {/* Role */}
                <div className="mb-4">
                    <select
                        {...register("role", valiedSchema.roleValidator)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Role</option>
                        <option value="arenamanager">Arena Manager</option>
                        <option value="coach">Coach</option>
                        <option value="player">Players</option>
                    </select>
                    <p className="text-red-500 text-sm">{errors.role?.message}</p>
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        {...register("phone", valiedSchema.PhoneValidator)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                </div>

                {/* Agreement */}
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        {...register("agreement", valiedSchema.agreementValidator)}
                        className="mr-2"
                    />
                    <label>Agree to Terms & Conditions</label>
                </div>
                <p className="text-red-500 text-sm">{errors.agreement?.message}</p>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Register
                </button>
                <p className="text-sm text-center mt-4">
                    Already have account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    )
}
