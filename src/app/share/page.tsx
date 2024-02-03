"use client"
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaFileUpload } from "react-icons/fa";
import { CiImport } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
const page = () => {
    const [file, setFile] = useState<any>(null);
    const [email, setEmail] = useState('');
    const onDrop = useCallback((acceptedFiles: any) => {
        // console.log(acceptedFiles)
        setFile(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const removeFile = () => {
        setFile(null)
    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md bg-white rounded-lg  p-[42px] shadow-md bg-gradient-to-br from-pink-300 to-blue-500">
                <h2 className="text-2xl font-bold mb-6 text-center">Drop your file here</h2>
                <form className="flex flex-col">
                    <input
                        type="text"
                        id="username"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={e => setEmail(e.target.value)}
                        className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
                    />
                    {
                        file ? <div className='flex justify-between items-center bg-gradient-to-br from-pink-400 to-blue-500 p-[20px] rounded-xl'>
                            <div>

                                <h1>{file.name}</h1>
                                <p>{(file.size / 1024).toFixed(2)} KB</p>

                            </div>
                            <div className='flex justify-center gap-1'>
                                <FaEye size={32} />
                                <MdDelete onClick={removeFile} size={32} />
                            </div>
                        </div> :
                            <div className='bg-gradient-to-br from-pink-400 to-blue-500 p-[20px] rounded-xl' {...getRootProps()}>

                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <div>
                                            <CiImport size={50} />
                                            <p>Drop the files here ...</p>
                                        </div>
                                        :
                                        <div className='grid cursor-pointer m-auto justify-between items-center gap-4'>
                                            <FaFileUpload className='ml-[40%]' size={50} />
                                            <p>Drag & drop some files here, or click to select files</p>
                                        </div>
                                }
                            </div>
                    }

                    {/* <button
                        type="submit"
                        className="bg-gradient-to-br from-pink-500 to-blue-300  text-white p-2 border-none rounded-lg cursor-pointer transition duration-300 "
                    >
                        Clcik to drop ...
                    </button> */}
                </form>
            </div>
        </div>
    )
}

export default page
