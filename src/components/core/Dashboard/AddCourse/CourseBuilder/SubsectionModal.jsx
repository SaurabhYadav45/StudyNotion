import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'

import{createSubSection, updateSubSection} from "../../../../../services/operations/courseDetailAPI"
import{setCourse} from "../../../../../slices/courseSlice"
import IconBtn from '../../../common/IconBtn'
import Upload from "../Upload"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const SubsectionModal = ({
  modalData, 
  setModalData,
  add = false, 
  view = false,
  edit = false,
}) => {

  const{
    register,
    getValues,
    setValue,
    formState:{errors},
    handleSubmit,
  } = useForm()

  const dispatch = useDispatch()
  const{token} = useSelector((state) => state.auth)
  const{course} = useSelector((state) => state.course)
  const[loading, setLoading] = useState(false)

  useEffect(() => {
    if(view || edit){
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.Description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  const isFormUpdated = () =>{
    const currentValues = getValues()
    if(currentValues.lectureTitle !== modalData.title  ||
      currentValues.lectureDesc !== modalData.Description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ){
      return true
    }
    return false
  }

  // Handle the editing of SubSection
  const handleEditSubsection = async() =>{
    const currentValues = getValues()
    const formData = new FormData()

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title", currentValues.lectureTitle)
    }
    if(currentValues.lectureDesc !== modalData.description){
      formData.append("description", currentValues.lectureDesc)
    }
    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)
    const result = await updateSubSection(formData, token)
    if(result){
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section)

      const updatedCourse = { ...course, courseContent: updatedCourseContent }
        dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    // console.log(data)
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {edit && "Editing"} {add && "Adding"}Lecture</p>
          <button onClick={() =>!loading ? setModalData(null) : {}}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
          {/* Lecture Video */}
          <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className='text-sm text-richblack-5' htmlFor="lectureTitle">Lecture Title<sup className='text-pink-200'>*</sup></label>
            <input 
            disabled={view || loading}
            type="text" 
            id='lectureTitle'
            placeholder='Enter Lecture Title'
            {...register("lectureTitle", {required:true})}
            className='form-style w-full'
            />
            {errors.lectureTitle && (
              <span className='text-xs ml-2 text-pink-200 tracking-wide'>
                Lecture Title is required
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">Lecture Description<sup className='text-pink-200'>*</sup></label>
            <textarea 
            disabled={view || loading}
            type="text" 
            id='lectureDesc'
            placeholder='Enter Lecture Description'
            {...register("lectureDesc", {required: true})}
            className='form-style w-full resize-x-none min-h-[130px]'
            />
            {errors.lectureDesc && (
              <span className='text-xs text-pink-200 tracking-wide ml-2 '>
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className='flex justify-end'>
              <IconBtn
              disabled={loading}
              text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SubsectionModal