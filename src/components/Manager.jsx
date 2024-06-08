import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: " " })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])


    const showPassword = () => {

        if (ref.current.className === "bg-green-600 rounded-lg px-1 text-sm mx-1 hover:bg-green-800") {
            ref.current.className = " bg-red-600 text-red-600 rounded-lg px-1 text-sm mx-1 "
            passwordRef.current.type = "text"
        }
        else {
            ref.current.className = "bg-green-600 rounded-lg px-1 text-sm mx-1 hover:bg-green-800"
            passwordRef.current.type = "password"

        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, {...form,id:uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
         setform({site: "", username: "", password: " " })

    }
    const editPassword = (id) => {
              setform(passwordArray.filter(item=>item.id===id)[0])
              setPasswordArray(passwordArray.filter(item=>item.id!==id))            
    }

    const deletePassword = (id) => {
        let Confirm=confirm("Do you really wanna delete this?")
        if(Confirm){
           setPasswordArray(passwordArray.filter(item=>item.id!==id))     
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))     
        }
    }
   


    return (
        <>
          <div className="absolute inset-0 -z-10 max-h-full max-w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className=' mt-8 md:min-w-full'>
                <div className=' font-bold text-3xl text-center'>
                    <span className='text-green-600'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-600'>Op/&gt;</span>
                </div>

                <h3 className='text-xl text-center text-green-600 font-bold'>Your own password manager</h3>
            </div>

            <div className='mx-auto '>
                <div className=' flax flex-col my-6  justify-center md:justify-center'>
                    <input value={form.site} onChange={handleChange} className='  px-2 py-1  mb-6 border border-green-600 rounded-lg w-[60vw] ml-72 ' type="text" name="site" id="" placeholder='Enter Website URL' />
                    <div className='flex mx-auto  justify-between w-[50vw] md:justify-center'>
                        <input value={form.username} onChange={handleChange} className=' px-2 py-1 border border-green-600 rounded-lg  w-2/5 ' type="text" name="username" id="" placeholder='Enter Username' />
                        <div className='flex'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className=' px-2 py-1 border border-green-600 rounded-lg  w-4/5 ml-20 ' type="password" name="password" id="" placeholder='Enter Password'/>
                            <button ref={ref} className=' bg-green-600 rounded-lg px-1 text-sm mx-1 hover:bg-green-800' onClick={showPassword}>show</button>

                        </div>
                    </div>

                    <button onClick={savePassword} className='bg-green-600 rounded-xl  px-4 hover:bg-green-700 gap-2  py-1 m-6 flex  mx-auto items-center'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">

                        </lord-icon>
                        Add Passowrd</button>
                </div>


                <div className="">
                    <h2 className='font-bold text-2xl py-3 ml-60 ' >Your Passwords </h2>
                    {passwordArray.length === 0 && <div className='text-xl  ml-60 mt-4'> No Passwords to show </div>}

                    {passwordArray.length != 0 && <div>
                        <table className=" table-auto w-[70vw] mx-auto rounded-md overflow-hidden">
                            <thead className='bg-green-700 text-white '>
                                <tr>
                                    <th className='py-1 '>Website</th>
                                    <th className='py-1'>Username</th>
                                    <th className='py-1'>Password</th>
                                    <th className='py-1'>Actions</th>
                                   
                                </tr>
                            </thead>
                            <tbody className='bg-green-50'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>

                                        <td className='py-2 my-1 text-center w-20'><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td className='py-2 my-1 text-center w-20'>{item.username}</td>
                                        <td className='py-2 my-1 text-center w-20'>{item.password}</td>

                                        <td className='py-2 my-1 text-center w-20 '>
                                            <span className='mx-1 hover:cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/oqaajvyl.json"
                                                trigger="hover"
                                                style={{ "width": "34px", "height": "24px" }}>
                                            </lord-icon>
                                            </span>
                                            <span className='mx-1 hover:cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"32px","height":"23px"}}>
                                            </lord-icon>
                                           </span>
                                        </td>
                                       

                                    </tr>
                                })}

                            </tbody>
                        </table> </div>}


                </div>
            </div>


        </>
    )
}

export default Manager
