import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {resetCourseState} from "../../../slices/courseSlice"

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const dispatch = useDispatch();
    const location = useLocation();

    const matchRoute = (route) =>{
        return matchPath({path:route}, location.pathname)
    }

  return (
        <NavLink to={link.path} onClick={() => dispatch(resetCourseState())}
            className={`relative px-8 py-2  text-sm font-medium 
            ${matchRoute(link.path) ? "bg-yellow-800 text-richblack-5" :"bg-opacity-0 text-richblack-50"} transition-all duration-200 `}>
            <span className={`absolute left-0 top-0 h-[80%] w-[0.15rem] bg-yellow-50 
                ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
            </span>

            <div className='flex gap-x-2 items-cente'>
                <Icon className="text-lg"/>
                <span>{link.name}</span>
            </div>
        </NavLink>
  )
}

export default SidebarLink