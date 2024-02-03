import React from 'react'
import { FaRegFilePdf } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
const page = () => {
  type file = {
    filename: string,
    fileurl: string,
    filetype: string,
    sharedAt: string
  }[]

  const tempfile: file = [
    {
      filename: 'test1.pdf',
      fileurl: '',
      filetype: 'image',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test2.txt',
      fileurl: '',
      filetype: 'document',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'video',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'video',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'video',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'video',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'video',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'text',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'video',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'text',
      sharedAt: 'new Date()'
    },
    {
      filename: 'test3.pdf',
      fileurl: '',
      filetype: 'video',
      sharedAt: 'new Date()'
    },
  ]
  return (
    <div className=' min-h-12' style={{ maxHeight: '600px', overflowY: 'auto', scrollBehavior: 'smooth' }}>
      {
        tempfile.map((file, index) => {
          return (
            <div key={index} className=' m-[20px] p-[20px] rounded-xl bg-gradient-to-br from-pink-300 to-blue-500'>
              <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-5'>

                  {
                    file.filetype === 'video' && <FaVideo size={32} />
                  }
                  {
                    file.filetype === 'text' && <IoDocumentText size={32} />
                  }
                  {
                    file.filetype === 'image' && <FaFileImage size={32} />
                  }
                  {
                    file.filetype === 'document' && <FaRegFilePdf size={32} />
                  }
                  <h1>{file.filename}</h1>
                  <p>{file.sharedAt}</p>
                  <p>{file.fileurl}</p>
                </div>
                <div>
                  <FaEye className='cursor-pointer' size={32} />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default page
