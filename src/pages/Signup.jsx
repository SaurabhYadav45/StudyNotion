import React from 'react'
import signupImg from "../assets/Images/signup.webp"

const Signup = () => {
  return (
    <div>
        <Template 
         title="Join the millions learning to code with StudyNotion for free"
         description1="Build skills for today, tomorrow, and beyond."
         description2="Education to future-proof your career."
         image={signupImg}
         formType = "signup"
        />
    </div>
  )
}

export default Signup