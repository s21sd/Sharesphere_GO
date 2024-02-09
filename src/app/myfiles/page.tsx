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
  const getAllFiles = async () => {
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/file/getfiles', {
      method: 'GET',
      credentials: 'include'
    })
    let data = await res.json();
    if (data.ok) {
      setAllFiles(data.data);
      toast.success("Fetched files Successfully")
      console.log(data.data);
    }
    // else {
    //   toast.error("Error in fetching the files")
    // }
  }

  useEffect(() => {
    getAllFiles();
  }, [])

  return (

    auth.isAuth ? (
      <div>
        <div>
          <div className="px-5 py-14 mx-auto">
            <div className=" w-full mx-auto overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap m-[20px] p-[20px] rounded-xl bg-gradient-to-br from-pink-300 to-blue-500">
                <thead>
                  <tr className='font-bold text-2xl px-8 py-5'>
                    <th className="font-bold text-2xl px-4 py-3">Filename</th>
                    <th className="font-bold text-2xl px-4 py-3">File Type</th>
                    <th className="font-bold text-2xl px-4 py-3">Sender Email</th>
                    <th className="font-bold text-2xl px-4 py-3">Receiver Email</th>
                    <th className="font-bold text-2xl px-4 py-3">Shared At</th>
                    <th className="font-bold text-2xl px-4 py-3">View</th>
                  </tr>
                </thead>
                {
                  allFiles.map((file, index) => {
                    return (
                      <tbody key={index} className='mt-10'>
                        <tr>
                          <td className="px-4 py-3 font-bold text-xl">{file.filename}</td>
                          <td className="px-4 py-3">
                            {
                              file.fileurl.split('.').pop()?.toLowerCase() === 'video' && <FaVideo size={32} />
                            }
                            {
                              file.fileurl.split('.').pop()?.toLowerCase() === 'text' && <IoDocumentText size={32} />
                            }
                            {
                              file.fileurl.split('.').pop()?.toLowerCase() === 'png' && <FaFileImage size={32} />
                            }
                            {
                              file.fileurl.split('.').pop()?.toLowerCase() === 'document' && <FaRegFilePdf size={32} />
                            }
                          </td>
                          <td className="px-4 py-3">{file.senderemail}</td>
                          <td className="px-4 py-3 text-lg text-gray-900">{file.receiveremail}</td>
                          <td className="px-4 py-3 text-lg text-gray-900">{file.sharedAt}</td>
                          <td className="px-4 py-3 text-lg text-gray-900"><FaEye className='cursor-pointer' size={32} /></td>

                        </tr>
                      </tbody>
                    )
                  })
                }

              </table>
            </div>

          </div>
        </div>

      </div>
    ) : <div>
      <h1>No Files Here... !</h1>

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