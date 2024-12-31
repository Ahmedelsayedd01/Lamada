import React, { useEffect, useRef, useState } from 'react'

import { useAuth } from '../../Context/Auth.jsx'
import { SearchBar, StaticButton } from '../Components.js';
import { CiGlobe } from 'react-icons/ci';
import { IoBagHandleOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import RedLogo from '../../Assets/Images/RedLogo.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCategory, removeUser } from '../../Store/CreateSlices.jsx';



const Navbar = () => {
       const auth = useAuth()
       const dispatch = useDispatch()
       const navigate = useNavigate();
       const dropdownRef = useRef(null)

       const [selectedOption, setSelectedOption] = useState('EN');
       const [open, setOpen] = useState(false);


       const handleOptionClick = (value) => {
              setSelectedOption(value);
              setOpen(false)
       };
       const handleClickOpen = () => {
              setOpen(!open);
       };

       const handleClickOutside = (event) => {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                     setOpen(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleLogout = () => {
              // auth.logout()
              dispatch(removeUser())
              dispatch(removeCategory())
              navigate("/", { replace: true });
       }

       return (
              <>
                     <nav className="flex items-center justify-between py-2 px-4 gap-x-4 border-b-2">
                            <div className='sm:w-10/12 lg:w-6/12 xl:w-3/12 flex items-center justify-start sm:gap-x-4'>

                                   <div className="relative z-10 w-14">

                                          {/* image profile */}
                                          {/* <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                                                 className='min-w-14 max-w-14 min-h-14  max-h-14 p-1 bg-white border-2 border-mainColor rounded-full object-cover object-center'
                                                 alt="Profile" /> */}
                                          {auth.user?.image ? (<img src={auth.user?.image} className='min-w-14 max-w-14 min-h-14  max-h-14 p-1 bg-white border-2 border-mainColor rounded-full object-cover object-center' alt="Profile" />)
                                                 : (<RedLogo width={60} height={60} />)}
                                          <span className={`absolute z-10 sm:right-0 lg:-right-0 bg-green-500 rounded-full bottom-1 w-[14px] h-[14px] animate-pulse`}></span>
                                   </div>
                                   {/* Name Admin */}
                                   <div className="sm:w-10/12">
                                          <span className='w-full text-2xl text-left text-mainColor font-bold'>Hello, {auth.user?.firstName}</span>
                                   </div>
                            </div>
                            <div className='sm:hidden lg:flex w-5/12'>
                                   <SearchBar bgColor="bg-mainBgColor" pr='4' />
                            </div>
                            <div className='sm:hidden xl:flex w-2/12  items-center justify-center gap-x-10'>
                                   <div className="w-4/12 relative" ref={dropdownRef}>
                                          <button className='flex items-center gap-1 justify-between text-2xl' onClick={handleClickOpen}>
                                                 {selectedOption === 'EN' ? <CiGlobe className='text-mainColor text-2xl' /> : <CiGlobe className='text-mainColor 2xl' />} <span className='flex items-center text-mainColor font-medium'>{selectedOption}<IoIosArrowDown className={`${open ? "rotate-180" : "rotate-0"} mt-1 ml-1 transition-all duration-300`} /></span>

                                          </button>
                                          <div className={`${open ? "block" : "hidden"} absolute w-28 top-14 -left-3.5 bg-white rounded-xl border-2 overflow-hidden`}>
                                                 <div className='flex items-center py-1  gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-white transition-all duration-300	' onClick={() => handleOptionClick('AR')}>
                                                        <CiGlobe /> AR
                                                 </div>
                                                 <div className='flex items-center py-1  gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-white transition-all duration-300	' onClick={() => handleOptionClick('EN')}>
                                                        <CiGlobe /> EN
                                                 </div>
                                          </div>
                                   </div>
                                   <div className="flex items-center justify-between gap-x-5">
                                          <button type='button'>
                                                 <IoBagHandleOutline className='text-mainColor text-3xl' />
                                          </button>
                                          <button type='button'>
                                                 <IoMdNotificationsOutline className='text-mainColor text-3xl' />
                                          </button>
                                   </div>
                            </div>
                            <div className="">
                                   <StaticButton type='button' text={'Logout'} handleClick={handleLogout} />
                            </div>
                     </nav >
              </>
       )
}

export default Navbar