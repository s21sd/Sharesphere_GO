"use client"
import React, { useState, useCallback } from 'react'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDropzone } from 'react-dropzone'
import { FaFileUpload } from "react-icons/fa";
import { CiImport } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'
import Lottie from "lottie-react";
import Animation from "../../../public/Animation - 1707124384803.json"

let socket: any = null;
const Shpage = () => {
    const auth = useAppSelector((state) => state.authReducer)
    const router = useRouter();

    const [file, setFile] = useState<any>(null);
    const [email, setEmail] = useState('');

    const [filename, setfilename] = useState('');
    const [uploading, setUplading] = useState(false);
    const [uploadpercent, setUploadpercent] = useState(0)

    const onDrop = useCallback((acceptedFiles: any) => {
        // console.log(acceptedFiles)
        setFile(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const removeFile = () => {
        setFile(null)
    }

    const handleuploadFile = async (e: any) => {
        e.preventDefault();
        console.log(email);
        console.log(file);
        console.log(filename);

        if (!email) {
            toast.error('Please fill all the fields');
            return;
        }
        if (!file) {
            toast.error('Please select a file');
            return;
        }


        let formdata = new FormData();
        formdata.append('receiveremail', email);
        formdata.append('filename', filename);

        if (file) {
            formdata.append('clientfile', file);
        }


        setUplading(true);
        let req = new XMLHttpRequest();
        req.open('POST', "https://sharesphered.onrender.com" + '/file/sharefile', true);
        // req.withCredentials = true;


        req.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percent = (event.loaded / event.total) * 100;
                console.log(`Upload progress: ${Math.round(percent)}%`);
                setUploadpercent(Math.round(percent));

            }
        });


        req.upload.addEventListener('load', () => {
            console.log('Upload complete!');
            // toast.success('File uploaded successfully');
        });
        req.upload.addEventListener('error', (error) => {
            console.error('Upload failed:', error);

            toast.error('File upload failed');
            setUplading(false);

        });


        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                setUplading(false);
                if (req.status === 200) {
                    toast.success('File shared successfully');
                    setUplading(false);
                    setTimeout(() => {

                        router.push('/myfiles');
                    }, 2000)

                } else {
                    toast.error('File upload failed');
                }
            }
        }
        req.send(formdata);
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[95%] max-w-md bg-white rounded-lg  p-[42px] shadow-md bg-gradient-to-br from-pink-300 to-blue-500">
                <h2 className="text-2xl font-bold mb-6 text-center">Drop your file here</h2>
                <form className="flex flex-col">
                    {
                        uploading && <div className='top-20 m-auto' style={{
                            width: 150
                        }}>

                            <Lottie animationData={Animation} loop={true} />
                        </div>
                    }

                    <input
                        type="text"
                        id="username"
                        name="email"
                        placeholder="Please enter receiver's email ..."
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
                    />
                    <input
                        type="text"
                        id="filename"
                        name="filename"
                        placeholder="Please enter filename ..."
                        required
                        value={filename}
                        onChange={e => setfilename(e.target.value)}
                        className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
                    />
                    {
                        file ? <div className='flex justify-between items-center bg-gradient-to-br from-pink-400 to-blue-500 p-[20px] rounded-xl'>
                            <div>

                                <h1>{file.name}</h1>
                                <p>{(file.size / 1024).toFixed(2)} KB</p>

                            </div>
                            <div className='flex justify-center gap-1'>

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

                    <button
                        onClick={handleuploadFile}
                        type="submit"
                        className="bg-gradient-to-br from-pink-500 to-blue-300 mt-4 text-white p-2 border-none rounded-lg cursor-pointer transition duration-300 "
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Shpage
