import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

const TimelineSection = () => {

  const Timeline = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading:"Responsibility",
      Description:"Students will always be our top priority",
    },
    {
      Logo:Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ]
  return (
    <div>
      <div className='flex flex-row items-center gap-12 mb-10 mt-10'>
        <div className='flex flex-col ml-24 gap-4'>
          {
            Timeline.map((element, idx) => {
              return(
                <div className='flex flex-row gap-10' key={idx} >
                  <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                    <img src={element.Logo} alt="" />
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                    <p className='text-base '>{element.Description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className=' h-fit relative shadow-blue-200  shadow-[0px_0px_30px_0px]'>
          <img src={TimeLineImage} alt="TimeLineImage" className='h-fit shadow-white object-cover w-[99%] shadow-[20px_20px_0px_0px]'/>
          <div className='absolute left-[50%] bottom-0 text-white -translate-x-[50%] translate-y-10 uppercase flex flex-row gap-0 bg-caribbeangreen-700  py-6'>
            <div className='flex  items-center border-caribbeangreen-300 gap-0 pl-4'>
              <h1 className='text-3xl text-white font-bold w-[75px]'>10</h1>
              <h1 className='text-sm  text-caribbeangreen-300 w-[75px]'>Years Experiences</h1>
            </div>

            <div className='bg-caribbeangreen-300 w-[1px] translate-x-10'></div>

            
            <div className="flex gap-5 items-center justify-center px-7">
              <h1 className="text-3xl ml-10 text-white font-bold w-[75px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                Types Of Courses
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection;