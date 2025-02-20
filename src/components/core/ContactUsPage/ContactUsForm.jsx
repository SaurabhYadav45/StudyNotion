import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from "../../../data/countrycode.json"

import {apiConnector} from "../../../services/apiConnector"
import {contactusEndpoint} from "../../../services/apis"

const ContactUsForm = () => {

  const[loading, setLoading] = useState(false)

  const{
    register,
    handleSubmit,
    reset,
    formState:{errors, isSubmitSuccessfull}
  } = useForm();

  const submitContactForm = async(data) =>{
    setLoading(true)
    try {
      const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      setLoading(false);
    } catch (error) {
      console.log("ERROR CONTACT_US_FORM MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() =>{
    if(isSubmitSuccessfull){
      reset({
        firstname:"",
        lastname:"",
        email:"",
        phonenumber:"",
        message:""
      })
    } 
  }, [reset, isSubmitSuccessfull])

  return (
    <div>
        <form className='flex flex-col gap-7' onSubmit={handleSubmit(submitContactForm)}>
          {/* Name */}
          <div className='flex flex-col gap-5 lg:flex-row'>
            {/* firstName */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor="firstname" className="lable-style">First Name</label>
              <input 
              type="text"
              name="firstname"
              id="firstname"
              placeholder='Enter first name'
              className='form-style'
              {...register("firstname", {required:true})}
              />
            </div>

            {/* Lastname */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor="lastname" className='lable-style'>Last Name</label>
              <input 
              type="text"
              name="lastname"
              id="lastname"
              placeholder='Enter last name'
              className='form-style'
              {...register("lastname")} 
              />
            </div>
          </div>

          {/* Email */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='lable-style'>Email Address</label>
            <input 
            type="text" 
            name='email'
            id='email'
            placeholder='Enter email address'
            className='form-style'
            {...register("email", {required:true})}
            />
            {errors.email && (
              <span className='-mt-1 text-yellow-100 text-[12px]'>Please enter your email address</span>
            )}
          </div>

          {/* Phone Number */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="phonenumber" className='label-style'>Phone Number</label>
            <div className="flex gap-5">
              <div className="flex w-[50px] sm:w-[81px] flex-col gap-2">
                <select 
                type="text"
                name="firstname"
                id="firstname"
                className="form-style"
                {...register("countrycode", {required:true})}
                >
                  {CountryCode.map((ele, idx) =>{
                    return(
                      <option key={idx} value={ele.code}>
                        {ele.code} -{ele.country}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                <input  
                type="number"
                name='phonenumber'
                id='phonenumber'
                className='form-style'
                placeholder="1234567890"
                {...register("phonenumber", {
                  required:{
                    value:true,
                    message:"Please Enter your Phone Number"
                  },
                  minLength:{value:10, message:"Invalid phone number"},
                  maxLength:{value:12, message:"Invalid phone number"}
                })}
                />
              </div>
              {errors.phonenumber && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                  {errors.phonenumber.message}
                </span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
              <label htmlFor="messagr" className='lable-style'>Message</label>
              <textArea
              name="message"
              id="message"
              cols="30"
              rows="7"
              placeholder="Enter your message here"
              className ="form-style"
              {...register("message", {required:true})}
              ></textArea>
              {
                errors.message && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your message</span>
                )
              }
            </div>


          {/* Button */}
          <button type='submit' disabled={loading} 
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
          ${!loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"}
          disabled:bg-richblack-500 sm:text-[16px]`}>
            Send Message
          </button>
        </form>
    </div>
  )
}

export default ContactUsForm