"use client"
import React, { useEffect, useState } from 'react'
import { FaRegFilePdf } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Lottie from "lottie-react";
import Animation from "../../../public/Animation - 1707509858192.json"
const page = () => {
  interface File {
    createdAt: string;
    filename: string;
    fileurl: string;
    filetype: string | null;
    receiveremail: string;
    senderemail: string;
    sharedAt: string;
    updatedAt: string;
    _id: string;
  }

  const dispatch = useDispatch<AppDispatch>()
  const auth = useAppSelector((state) => state.authReducer)
  const [allFiles, setAllFiles] = useState<File[]>([])
  const router = useRouter();
  useEffect(() => {
    getAllFiles();
  }, [])
  const getAllFiles = async () => {
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/file/getfiles', {
      method: 'GET',
      credentials: 'include'
    })
    let data = await res.json();
    if (data.ok) {
      setAllFiles(data.data);
      toast.success("Fetched files Successfully")
      // console.log(data.data);
    }
    else {
      toast.error("Error in fetching the files")
    }
  }

  const formatSharedAt = (dateString: string) => {
    const sharedAtDate = new Date(dateString);
    return sharedAtDate.toLocaleString();
  }


  return (

    auth.isAuth ? (

      <div className='flex justify-center items-center w-full mx-auto overflow-x-auto min-h-[40%]'>

        <div className='mt-[5%]'>

          <table className="p-[20px] w-[100%] rounded-xl bg-gradient-to-br from-pink-300 to-blue-500">
            <thead>
              <tr className='font-bold text-2xl px-4 py-3'>
                <th className="font-bold text-xl px-4 py-3">Filename</th>
                <th className="font-bold text-xl px-4 py-3">File Type</th>
                <th className="font-bold text-xl px-4 py-3">Sender Email</th>
                <th className="font-bold text-xl px-4 py-3">Receiver Email</th>
                <th className="font-bold text-xl px-4 py-3">Shared At</th>
                <th className="font-bold text-xl px-4 py-3">View</th>
              </tr>
            </thead>
            {
              allFiles
                .sort((a, b) => {
                  return new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime();
                })
                .map((file, index) => {
                  return (
                    <tbody key={index} className='mt-10'>
                      <tr>
                        <td className="px-4 py-3 font-bold text-xl">{file.filename}</td>
                        <td className="px-4 py-3">
                          {
                            file.fileurl.split('.').pop()?.toLowerCase() === 'mp4' && <FaVideo size={32} />
                          }
                          {
                            file.fileurl.split('.').pop()?.toLowerCase() === 'txt' && <IoDocumentText size={32} />
                          }
                          {
                            (file.fileurl.split('.').pop()?.toLowerCase() === 'png' || file.fileurl.split('.').pop()?.toLowerCase() === 'jpg' || file.fileurl.split('.').pop()?.toLowerCase() === 'jpeg') && <FaFileImage size={32} />
                          }
                          {
                            file.fileurl.split('.').pop()?.toLowerCase() === 'pdf' && <FaRegFilePdf size={32} />
                          }
                        </td>
                        <td className="px-4 py-3">{file.senderemail}</td>
                        <td className="px-4 py-3 text-lg text-gray-900">{file.receiveremail}</td>
                        <td className="px-4 py-3 text-lg text-gray-900">{formatSharedAt(file.sharedAt)}</td>
                        <td className="px-4 py-3 text-lg text-gray-900"><FaEye className='cursor-pointer' size={32} /></td>

                      </tr>
                    </tbody>
                  )
                })
            }

          </table>
        </div>
      </div>

    ) : <div className='grid justify-center items-center mt-20'>
      <div className='ml-10' style={{
        width: 250
      }}>
        <Lottie animationData={Animation} loop={true} />
      </div>
      <h1 className='text-center font-semibold text-2xl '>No Files Here... ! Please Login 🫠</h1>

    </div>


  )
}

export default page










// <div key={index} className=' m-[20px] p-[20px] rounded-xl bg-gradient-to-br from-pink-300 to-blue-500'>
//   <div className='flex justify-between items-center flex-1'>
//     <div className='flex justify-between items-center gap-5'>

//       {
//         file.filetype === 'video' && <FaVideo size={32} />
//       }
//       {
//         file.filetype === 'text' && <IoDocumentText size={32} />
//       }
//       {
//         file.filetype === 'image' && <FaFileImage size={32} />
//       }
//       {
//         file.filetype === 'document' && <FaRegFilePdf size={32} />
//       }

//       <h1>{file.filename}</h1>
//       <p>{file.senderemail}</p>
//       <p>{file.receiveremail}</p>
//       <p>{file.sharedAt}</p>
//       <p>{file.fileurl.split('.').pop()?.toLowerCase()}</p>
//     </div>

//     <div>
//       <FaEye className='cursor-pointer' size={32} />
//     </div>
//   </div>
// </div>