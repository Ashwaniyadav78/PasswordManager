import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="bg-slate-800 flex justify-between px-4 py-3  items-center">
      <div className=' font-bold text-2xl text-white'>    
               <span className='text-green-600'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-600'>Op/&gt;</span>
        </div>
        <ul className='flex  text-white'>
            <li className='hover:font-bold mx-4'><a href="">Home</a></li>
            <li className='hover:font-bold mx-4'><a href="">About</a></li>
            <li className='hover:font-bold mx-4'><a href="">Context Us</a></li>
           
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
