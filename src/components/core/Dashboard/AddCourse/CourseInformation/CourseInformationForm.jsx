import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

import ChipInput from './ChipInput'
import RequirementsField from './RequirementsField'
import Upload from '../Upload'

import IconBtn from "../../../common/IconBtn"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import {MdNavigateNext} from "react-icons/md"

import {setCourse, setStep} from "../../../../../slices/courseSlice"
import {COURSE_STATUS} from "../../../../../utils/constants"
import {
    fetchCourseCategories,
    addCourseDetails,
    editCourseDetails
} from "../../../../../services/operations/courseDetailAPI"

const CourseInformationForm = () => {

    const{
        register,
        handleSubmit,
        getValues,
        setValue,
        formState:{errors},
    } = useForm()

    const{token} = useSelector((state) => state.auth)
    const{course, editCourse} = useSelector((state) => state.course)
    const[loading, setLoading] = useState(false)
    const[courseCategories, setCourseCategories] = useState([])

    const dispatch = useDispatch()

    useEffect(() =>{
        const getCategories = async() =>{
            setLoading(true)
            const categories = await fetchCourseCategories()
            // console.log("Categories",categories)
            if(categories.length > 0){
                setCourseCategories(categories)
            }
            setLoading(false)
        }

        // If form is in edit mode
        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories()
    }, [])

    const isFormUpdated = () =>{
        const currentValues = getValues()
        if(
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ){
            return true
        }
        return false
    }

    // Handle next button click
    const onSubmit = async(data) =>{
        console.log("OnSubmit")
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues()
                const formData = new FormData()

                formData.append("courseId", course._id)

                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc)
                }

                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                }

                if(currentValues.courseTags !== course.tag.toString()){
                    formData.append("tag", JSON.stringify(data.courseTags))
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }

                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory)
                }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }

                if(currentValues.courseImage !== course.thumbnail){
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)

                if(result){
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            }
            else{
                toast.error("No changes made to the form")
            }
            return 
        }

        console.log("OnSubmit New")
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        setLoading(true)
        const result = await addCourseDetails(formData, token)
        console.log("Result :", result) 

        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className='space-y-8 border-[1px] border-richblack-700 bg-richblack-800 rounded-md p-6'>
        {/* Course title */}
        <div className='flex flex-col space-y-2'>
            <label className="text-sm text-richblack-5" htmlFor="courseTitle">Course Title<sup className="text-pink-200">*</sup></label>
            <input 
            id='courseTitle'
            placeholder='Enter Course title'
            {...register("courseTitle", {required:true})}
            className='form-style w-full'
            />
            {errors.courseTitle && (
                <span className='text-pink-200 text-xs ml-2 tracking-wide'>Course title is required</span>
            )}
        </div>

        {/* CourseDescription */}
        <div className='flex flex-col space-y-2'>
            <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">Course Short Description<sup className="text-pink-200">*</sup></label>
            <textarea 
            name="" 
            id="courseShortDesc"
            placeholder='Enter Description'
            {...register("courseShortDesc", {required:true})}
            className='form-style w-full'
            ></textarea>
            {errors.courseShortDesc && (
                <span className='text-pink-200 text-xs ml-2 tracking-wide'>Course Description is required</span>
            )}
        </div>

        {/* course Price */}
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="coursePrice">Course price <sup className="text-pink-200">*</sup></label>
            <div>
                <input 
                id='coursePrice'
                placeholder='Enter Course Price'
                className="form-style w-full"
                {...register("coursePrice", {required:true, valueAsNumber:true, 
                    pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                })}
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
            </div>
             {errors.coursePrice && (
                <span className='text-pink-200 text-xs ml-2 tracking-wide'>Course Price is required</span>
             )}
        </div>

        {/* Course Category */}
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="courseCategory">Course Category<sup className="text-pink-200">*</sup></label>
            <select name="courseCategory" 
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", {required:true})}
            className='form-style w-full'
            >
                <option value="" disabled>
                    Choose a Category
                </option>
                {/* {console.log("CourseCategories : ", courseCategories)} */}
                {!loading && (
                    courseCategories?.map((category, indx) => (
                        <option key={indx} value={category?._id}>
                          {category.name}
                        </option>
                    ))
                )}
            </select>
            {errors.courseCategory && (
                <span className='text-xs text-pink-200 ml-2 tracking-wider'>Course Category is Required</span>
            )}
        </div>

        {/* Tags */}
        <ChipInput
        label = "Tags"
        name = "courseTags"
        placeholder= "Enter Tags and press Enter"
        register = {register}
        errors = {errors}
        setValue = {setValue}
        getValues = {getValues}
        />

        {/* Course Thumbnail Image  */}
        <Upload
        name = "courseImage"
        label ="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData = {editCourse ? course?.thumbnail : null}
        />

        {/* Benefits of the course */}
        <div className="flex flex-col space-y-2">
            <label className='text-sm text-richblack-5' htmlFor="courseBenefits">Benefits of the Course<sup className="text-pink-200">*</sup></label>
            <textarea 
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
            ></textarea>
            {errors.courseBenefits && (
                <span className='text-xs tracking-wide ml-2 text-pink-200
                '>Benefits of the course is required</span>
            )}
        </div>

        {/* Requirements/Instructions */}
        <RequirementsField
        name = "courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />

        {/* Next button */}
        <div className='flex justify-end gap-x-2'>
            {editCourse && (
                <button 
                onClick={() => dispatch(setStep(2))}
                disabled={loading}
                className='flex cursor-pointer rounded-md gap-x-2  items-center bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>Continue Wihout Saving</button>
            )}
            
            <button type="submit" className='border flex items-center border-yellow-50 bg-transparent bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'>
                {editCourse ? "Save Changes" : "Next"}
                <MdNavigateNext className='text-richblack-800'/>
            </button>
            {/* <IconBtn type={"submit"} disabled={loading} text={editCourse ? "Save Changes" : "Next"}>
                <MdNavigateNext className='text-richblack-800'/>
            </IconBtn> */}
        </div>
    </form>
  )
}

export default CourseInformationForm