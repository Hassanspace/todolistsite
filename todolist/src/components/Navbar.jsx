import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-slate-700 text-white h-12'>
     <div className="logo">
        <span  className='font-bold text-xl mx-9'>iTask</span>
     </div>
     <ul className="flex gap-10 mx-9">
        <li>Home</li>
        <li>Your Tasks</li>
     </ul>
    </nav>
  )
}

export default Navbar
