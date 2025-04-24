"use client"
import React, { useState, useContext, useEffect } from 'react'
import { UserDetailContex } from '@/app/_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { DownloadIcon, LayoutDashboard, LoaderIcon } from 'lucide-react';

import Lookup from '../_data/Lookup';
import { Button } from '@/components/ui/button';

function GenerateLogo() {
  const { userDetail, setuserDetail } = useContext(UserDetailContex);

  const [formData, setFormData] = useState();

  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  useEffect(() => {

    if (typeof window != undefined && userDetail?.email) {
      const storage = localStorage.getItem('formData');
      if (storage) {
        setFormData(JSON.parse(storage))
        console.log(JSON.parse(storage))
      }
    }

  }, [userDetail])

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }

  }, [formData])

  useEffect (()=>{
    if(typeof window != undefined && logoImage){
      localStorage.clear();
    }

  },[logoImage])

  const GenerateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT
      .replace('{logoTitle}', formData?.title)
      .replace('{logoDesc}', formData?.desc)
      .replace('{logoColor}', formData.palette)
      .replace('{logoDesign}', formData?.design?.title)
      .replace('{logoPrompt}', formData?.design?.prompt)
    console.log(PROMPT)

    //Generate Logo Prompt from AI
    //Generate Logo Image 
    const result = await axios.post('/api/ai-logo-model', {
      prompt: PROMPT,
      email: userDetail.email,
      title: formData.title,
      desc: formData.desc
    });
    console.log(result?.data)
    setLogoImage(result.data?.image)
    setLoading(false);
  }
  const onDownload = () => {
    console.log(logoImage)
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${logoImage}" alt="Base64 Image" />`);

  }


  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
      {/* {!loading && logoImage && (
          <div className='flex itmes-center justify-center p-4'>
            <Image
              src={logoImage}
              alt="logo"
              width={400}
              height={400}
              className='border-4 border-primary rounded-lg'
            />
          </div>
        )} */}
      <h2 className='font-bold text-4xl text-primary'>{Lookup.LoadingWaitTitle}</h2>
      {loading && <div className='flex flex-col items-center mt-4' >
        <p className='text-xl text-gray-500'>{Lookup.LoadingWaitDesc}</p>
        <LoaderIcon className='animate-spin ' />
        <Image src={'/loading.gif'} alt='loading' width={200} height={200} />
        <h2 className='mt-2 font-medium text-2xl text-gray-500'>Do Not Refresh </h2>
      </div>}


      {logoImage && <div className='mt-5'>
        <Image src={logoImage} alt='logo' width={300} height={300}
          className='rounded-xl' />
        <div className='mt-4 flex items-center gap-5'>
          <Button onClick={() => onDownload()}><DownloadIcon />Download</Button>
        <Link href='/dashboard' >  <Button varient='outline'><LayoutDashboard />Dashboard</Button></Link>
        </div>
      </div>
      }

    </div>
  )
}

export default GenerateLogo
