import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { useDispatch } from 'react-redux'
import {useNavigate } from "react-router-dom"

import {login} from "../../../services/operations/authAPI"

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(email, password, navigate));
    }

  return (
    <div>
        <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
            {/* Email */}
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className="text-pink-200">*</sup></p>
                <input
                 required
                 type="text"
                 name="email"
                 value={email}
                 onChange={handleOnChange}
                 placeholder='Enter email address'
                 className="form-style w-full bg-richblack-700 px-2 p-[12px] text-richblack-5 rounded-[0.5rem] "
                 value-style="box-shadow: rgba(255, 255, 255, 0.18) 0px -1px 0px inset;"
                 />
            </label>

            

            {/* Password */}
            <label className="relative ">
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Password<sup className="text-pink-200">*</sup></p>
                
                <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full bg-richblack-700 px-2 p-[12px] text-richblack-5 rounded-[0.5rem] "
                 value-style="box-shadow: rgba(255, 255, 255, 0.18) 0px -1px 0px inset;"
                />

                <span onClick={() => setShowPassword((prev) => !prev)}  className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                    {
                        showPassword ? 
                        (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                        (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                    }
                </span>
            </label>

            {/* Button */}
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>
        </form>
    </div>
  )
}

export default LoginForm