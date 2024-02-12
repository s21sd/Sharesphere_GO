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

const Mpage = () => {
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
      // toast.success("Fetched files Successfully")
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

      <section className="text-black bg-gradient-to-br from-pink-300 to-blue-500 body-font">
        <div className="container px-5 py-24 mx-auto">

          <div className="lg:w-[80%] w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-4 title-font tracking-wider font-bold text-white text-sm bg-gray-900 rounded-tl rounded-bl">Filename</th>
                  <th className="px-4 py-4 title-font tracking-wider font-bold text-white text-sm bg-gray-900">File Type</th>
                  <th className="px-4 py-4 title-font tracking-wider font-bold text-white text-sm bg-gray-900">Sender Email</th>
                  <th className="px-4 py-4 title-font tracking-wider font-bold text-white text-sm bg-gray-900">Receiver Email</th>
                  <th className="px-4 py-4 title-font tracking-wider font-bold text-white text-sm bg-gray-900">Shared At</th>
                  <th className="px-4 py-4 title-font tracking-wider font-bold text-white text-sm bg-gray-900">View</th>
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
                          <td className="border-t-2 border-gray-800 px-4 py-3">{file.filename}</td>
                          <td className="border-t-2 border-gray-800 px-4 py-3">
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
                          <td className="border-t-2 border-gray-800 px-4 py-3">{file.senderemail}</td>
                          <td className="border-t-2 border-gray-800 px-4 py-3">{file.receiveremail}</td>
                          <td className="border-t-2 border-gray-800 px-4 py-3">{formatSharedAt(file.sharedAt)}</td>

                          <a className='flex m-auto border-t-2 border-gray-800 px-4 py-3' href={`http://localhost:5000/` + file.fileurl} target="_blank" rel="noopener noreferrer">
                            <td className=""><FaEye className='cursor-pointer' size={30} /></td>
                          </a>
                        </tr>
                      </tbody>
                    )
                  })
              }
            </table>
          </div>

        </div>
      </section>
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

export default Mpage





// auth.isAuth ? (

//   <div classNameName='flex justify-center items-center w-full mx-auto overflow-x-auto min-h-[40%] container '>


//     <div classNameName='mt-[2%] lg:w-2/3 w-full mx-auto overflow-auto'>

//       <table classNameName="p-[20px] table-auto text-left whitespace-no-wrap w-[90%] rounded-xl bg-gradient-to-br from-pink-300 to-blue-500 overflow-x-auto">
//         <thead>
//           <tr className='font-bold text-2xl px-5 py-4'>
//             <th classNameName="px-4 py-3 title-font tracking-wider font-medium text-white text-sm rounded-tl rounded-bl">Filename</th>
//             <th classNameName="px-4 py-3 title-font tracking-wider font-medium text-white text-sm rounded-tl rounded-bl">File Type</th>
//             <th classNameName="px-4 py-3 title-font tracking-wider font-medium text-white text-sm rounded-tl rounded-bl">Sender Email</th>
//             <th classNameName="px-4 py-3 title-font tracking-wider font-medium text-white text-sm rounded-tl rounded-bl">Receiver Email</th>
//             <th classNameName="px-4 py-3 title-font tracking-wider font-medium text-white text-sm rounded-tl rounded-bl">Shared At</th>
//             <th classNameName="px-4 py-3 title-font tracking-wider font-medium text-white text-sm rounded-tl rounded-bl">View</th>
//           </tr>
//         </thead>
//         {
//           allFiles
//             .sort((a, b) => {
//               return new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime();
//             })
//             .map((file, index) => {
//               return (
//                 <tbody key={index} classNameName='mt-10'>
//                   <tr>
//                     <td classNameName="border-t-2 border-gray-800 px-4 py-3 text-xl">{file.filename}</td>
//                     <td classNameName="border-t-2 border-gray-800 px-4 py-3">
//                       {
//                         file.fileurl.split('.').pop()?.toLowerCase() === 'mp4' && <FaVideo size={32} />
//                       }
//                       {
//                         file.fileurl.split('.').pop()?.toLowerCase() === 'txt' && <IoDocumentText size={32} />
//                       }
//                       {
//                         (file.fileurl.split('.').pop()?.toLowerCase() === 'png' || file.fileurl.split('.').pop()?.toLowerCase() === 'jpg' || file.fileurl.split('.').pop()?.toLowerCase() === 'jpeg') && <FaFileImage size={32} />
//                       }
//                       {
//                         file.fileurl.split('.').pop()?.toLowerCase() === 'pdf' && <FaRegFilePdf size={32} />
//                       }
//                     </td>
//                     <td classNameName="border-t-2 border-gray-800 px-4 py-3">{file.senderemail}</td>
//                     <td classNameName="border-t-2 border-gray-800 px-4 py-3 text-lg text-gray-900">{file.receiveremail}</td>
//                     <td classNameName="border-t-2 border-gray-800 px-4 py-3 text-gray-900">{formatSharedAt(file.sharedAt)}</td>

//                     <a href={`http://localhost:5000/` + file.fileurl} target="_blank" rel="noopener noreferrer">
//                       <td classNameName="border-t-2 border-gray-800 px-4 py-3 text-gray-900"><FaEye classNameName='cursor-pointer' size={32} /></td>
//                     </a>
//                   </tr>
//                 </tbody>
//               )
//             })
//         }

//       </table>
//     </div>
//   </div>

// ) : <div classNameName='grid justify-center items-center mt-20'>
//   <div classNameName='ml-10' style={{
//     width: 250
//   }}>
//     <Lottie animationData={Animation} loop={true} />
//   </div>
//   <h1 classNameName='text-center font-semibold text-2xl '>No Files Here... ! Please Login 🫠</h1>

// </div>