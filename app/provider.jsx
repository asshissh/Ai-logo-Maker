"use client"
import React ,{useEffect,useState} from 'react'
import Header from './_components/Header'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { UserDetailContex } from './_context/UserDetailContext'

function Provider({ children }) {
  const { user}  = useUser();
  const [userDetail,setUserDetail]=useState();
  
  useEffect(()=>{
   user&& CheckUserAuth();

  },[user])



  const CheckUserAuth=async()=>{
    const result = await axios.post('/api/users',{
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress
    });
    console.log(result.data)
    setUserDetail(result.data)

  }
  return (
    <div>
      <UserDetailContex.Provider value={{userDetail,setUserDetail}}>
      <Header />
      <div className='px-10 lg:px-32 xl:px-48 2xl:px-56'>
        {children}
      </div>
      </UserDetailContex.Provider>

    </div>
  )
}

export default Provider
