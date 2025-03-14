import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import {Link}  from "react-router-dom";
import HighlightText  from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/Codeblocks.jsx';
import ExploreMore from '../components/core/HomePage/ExploreMore.jsx';
// import CourseCard from '../components/core/HomePage/CourseCard.jsx';
import TimelineSection from "../components/core/HomePage/TimelineSection.jsx";
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection.jsx';
import InstructorSection from '../components/core/HomePage/InstructorSection.jsx';
// import ReviewSlider from '../components/core/common/ReviewSlider.jsx';
import Footer from '../components/core/common/Footer.jsx';
// import Navbar from '../components/core/common/Navbar.jsx';

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
         
        {/* SECTION - 1 */}
        <div className='relative  mx-auto flex flex-col max-w-maxContent w-11/12 items-center text-white justify-between'>
        
          <Link to={"/signup"}>
            <div className='group mx-auto rounded full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16 p-1'>
              <div className='flex flex-row items-center group-hover:bg-richblack-900'>
                <p>Become an Instructor</p>
                <FaArrowRight/>
              </div>
            </div>
          </Link>

          {/* Heading */}
          <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with
            <HighlightText text = {"Coding Skills"}></HighlightText>
          </div>

          {/* SubHeading */}
          <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
            {/* paragraph content */}
            With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
          </div>

          {/* Button */}
          <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active = {true} linkto = {"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active = {false} linkto = {"/login"}>
              Book a Demo
            </CTAButton>
          </div>

          {/* Video */}
          <div className='mx-3 my-7  shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
            <video className='shadow-[20px_20px_rgba(255, 255, 255)]' muted loop autoPlay height={"500px"} width={"800px"}>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>

          {/* Code Section 1  */}
          <div className='flex flex-col items-center justify-center mx-auto'>
            <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblocks={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}>
            </CodeBlocks>
          </div>

          {/* Code Section 2 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                  Start
                  <HighlightText text={"coding in seconds"} />
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabtn1={{
                btnText: "Continue Lesson",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                link: "/signup",
                active: false,
              }}
              codeColor={"text-white"}
              codeblocks={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
              backgroundGradient={<div className="codeblock2 absolute"></div>}
            />
          </div>
          {/* Explore Section */}
          <ExploreMore />
        </div>

        {/* Section -2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
          <div className='homepage_bg h-[310px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
              <div className='h-[150px]'></div>
              <div className='flex flex-row text-white gap-7'>
                <CTAButton active={true} linkto={"/signup"}>
                  <div className='flex gap-3 items-center'>
                    Explore Full Catalog
                    <FaArrowRight/>
                  </div>
                </CTAButton>
                <CTAButton active={false} linkto={"/signup"}>
                  <div>
                    Learn more
                  </div>
                </CTAButton>
              </div>
            </div>
          </div>

          <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center     justify-between gap-8'>
              <div className='flex flex-row gap-5 mx-auto w-11/12 max-w-maxContent mb-10 mt-[95px]'>
                <div className='text-4xl  font-semibold w-[45%]'>
                  Get the Skills you need for a
                  <HighlightText text={"Job that is in demand"}/>
                </div>
                <div className='flex flex-col gap-10 w-[40%] items-start'>
                  <div className='text-[16px]'>
                    The modern StudyWave is the dictates its own terms. Today, to
                    be a competitive specialist requires more than professional
                    skills.
                  </div>
                  <CTAButton active={true} linkto={"/signup"}>
                    <div>
                      Learn more
                    </div>
                  </CTAButton>
                </div>
              </div>
              {/* Timeline section */}
              <TimelineSection/>

              {/* Learning language section */}
              <LearningLanguageSection/>
          </div>
        </div>

        {/* Section-3 */}
        <div className='w-11/12 mx-auto flex flex-col items-center justify-between bg-richblack-900 text-white gap-8 mt-16'>
          <InstructorSection/>

          {/* <h1>Reviews from other learners</h1>
          <ReviewSlider /> */}
        </div>

        {/* Footer */}
        <div>
        <Footer/>
        </div>
        
    </div>
  )
}

export default Home;
