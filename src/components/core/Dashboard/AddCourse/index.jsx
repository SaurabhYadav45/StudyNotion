import React from 'react'

import RenderSteps from './RenderSteps'

const index = () => {
  return (
    <>
    <div className='flex gap-x-6 items-start w-full'>
        <div className='flex flex-col flex-1 '>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Add Course</h1>
            <div className='flex-1'>
                <RenderSteps/>
            </div>
        </div>

        {/* Course Upload Tips */}
        <div className='sticky top-10 hidden max-w-[400px] border-[1px] border-richblack-700 bg-richblack-800 xl:block p-6 rounded-md'>
            <p className='text-lg text-richblack-5 mb-8'>⚡ Course Upload Tips</p>
            <ul className='list-item list-disc text-xs space-y-4 ml-5 text-richblack-5'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons,
                quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the
                course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default index