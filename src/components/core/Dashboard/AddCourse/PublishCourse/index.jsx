import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import{COURSE_STATUS} from "../../../../../utils/constants"

import IconBtn from "../../../common/IconBtn"
import{setStep, resetCourseState} from "../../../../../slices/courseSlice"
import {editCourseDetails} from "../../../../../services/operations/courseDetailAPI"

const PublishCourse = () => {

    const{
        register,
        setValue,
        handleSubmit,
        getValues,
    } = useForm()

    const[loading, setLoading] = useState(false)
    const{token} = useSelector((state) => state.auth)
    const{course} = useSelector((state) =>state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
        }
    })

    const goBack = () =>{
        dispatch(setStep(2))
    }

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async()=>{
        // Check if form has been updated or not
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            goToCourses()
            return
        }

        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT

        formData.append("status", courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formData, token)

        if(result){
            goToCourses()
        }
        setLoading(false)
    }

    const onSubmit = (data) =>{
        handleCoursePublish()
    }


  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=''>
                <label htmlFor='public' className="inline-flex items-center text-lg">
                    <input 
                    type="checkbox"  
                    id='public' 
                    {...register("public")}
                    className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    />
                    <span className='text-richblack-400 ml-2'>Make this course as public</span>
                </label>
            </div>

            {/*Back and Save Changes Button  */}
            <div className="ml-auto flex max-w-max items-center gap-x-4">
                <button
                disabled={loading}
                type="button"
                onClick={goBack}
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900">
                    Back    
                </button>
                <IconBtn type="submit" text="Save Changes" disabled={loading}></IconBtn>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse