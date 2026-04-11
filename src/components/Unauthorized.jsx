import React from "react"
import { Link } from "react-router-dom"

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-orange-200 p-6">
            <div className="bg-gray-300 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Unauthorized</h2>
                <p className="text-gray-700 mb-6">You are not allowed to access this page.</p>
                <Link to="/login" className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                    Go to Login
                </Link>
            </div>
        </div>
    )
}

export default Unauthorized
