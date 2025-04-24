"use client"
import { db } from '@/configs/FirebaseConfig';
import { UserDetailContex } from '@/app/_context/UserDetailContext'
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { View } from 'lucide-react';

function LogoList() {


    const { userDetail, setUserDetail } = useContext(UserDetailContex);
    const [logoList, setLogoList] = useState([]);

    useEffect(() => {
        userDetail && GetUserLogos();
    }, [userDetail])
    const GetUserLogos = async () => {

        const querySnapshot = await getDocs(collection(db, "users", userDetail?.email, "logos"));
        setLogoList([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setLogoList((prev) => [...prev, doc.data()])
        });
    }

    const ViewLogo = (image) => {
        const imageWindow = window.open();
        imageWindow.document.write(`<img src="${image}" alt="Base64 Image" />`);

    }
    return (
        <div className='mt-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {logoList?.length > 0 ? logoList.map((logo, index) => (

                    <div key={index} className='hover:scale-105 transition-all cursor-pointer'
                     onClick={()=>ViewLogo(logo?.image)}
                     >
                        <Image src={logo?.image}  alt ={logo?.title} width={400}  height ={200}
                         className='w-full rounded-xl'/>
                         <h2 className=' text-center text-lg font-bold mt-2'>{logo?.title}</h2>
                         <p className='text-sm text-gray-500 text-center'>{logo?.desc}</p>
                    </div>
                )) :
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className='bg-slate-200 animate-pulse rounded-xl w-full h-[200px]'>
                        </div>

                    ))

                }



            </div>

        </div>
    )
}

export default LogoList
