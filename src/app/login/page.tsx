"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

    const handleLogin = (e : React.FormEvent) => {
        e.preventDefault()

    if (email === 'amnajehanzeb27@gmail.com' && password === 'amnajehanzeb'){
        localStorage.setItem("isLoggedIn", "true")
        router.push("/login/dashboard")
    } else {
        alert("Invalid Information.")
    }
 }

 return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-[33px] text-[#252b42] font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
        />
        <button
          type="submit"
          className="bg-[#23A6F0] transition-colors hover:bg-[#23856D] text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
 )
} 

