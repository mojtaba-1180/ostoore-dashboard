import React, { useState, useLayoutEffect, useRef } from 'react'
import ListingItem from '../../components/ListingItem/ListingItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import Api from '../../util/AxiosConfig'
import FormData from 'form-data' 
import PropagateLoader from "react-spinners/PropagateLoader";
import { ImgBase64 } from '../../util/imgBase64';

import './gallery.css'

const Gallery = () => {
    const uploadBtnRef = useRef()
    const inputImg = useRef()
    const [uploadBtn, setuploadBtn] = useState(false)
    const [ActiveItem, setActiveItem] = useState(1)
    const [ContentNew, setContentNew] = useState({})
    const [Images, setImages] = useState(null)
    const [PreviewUploadImg, setPreviewUploadImg] = useState({
        files: null,
        imageData: null
    })
    const [Upload, setUpload] = useState(false)

    const getData = async () => {
        await Api.get('image/').then((res) => {
            console.log(res)
            setImages(res.result)
           
        }).catch((err) => {
            console.log(err)
        })
    }
   
    const HandleListinClick = (item) => {
        setActiveItem(item)
    }
    const HandleAddFolder = () => {
        Swal.fire({
            title: ' نام پوشه خود را وارد کنید ',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: ' افزودن ',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((res => {
            if (res.isConfirmed) {
                const data = {
                    title: res.value,
                    content: []
                }
                Api.post('gallery', data).then((res) => {
                    console.log(res)
                }).catch((err) => {
                })
            }
        }))
    }

    const HandleUpload = async () => {
            const formdata = new FormData()
            formdata.append("image", PreviewUploadImg.files);
            formdata.append("name", PreviewUploadImg.files.name);
      
        setuploadBtn(true)

            Api.post('image', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then((res) => {
     
                setuploadBtn(true)
                setUpload(false)
                getData()
            }).catch((err) => {
                console.log(err)

            })
    }

    const HandleDelete = () => {
        uploadBtnRef.current.classList.add('disable')
        inputImg.current.value = ''
        setPreviewUploadImg({
            files: null,
            imageData: null
        })
    }
    const handleChanageUploadImage = (e) => {
        uploadBtnRef.current.classList.remove('disable')
        ImgBase64(e.target.files[0]).then(res => {
            setPreviewUploadImg({
                files: e.target.files[0],
                imageData: res
            })
        })
        
       
    }
    useLayoutEffect(() => {
        uploadBtnRef.current.classList.add('disable')
        setTimeout(() => {
            getData();
        }, 1000)

    }, [])
    return (
        <>
            <h2 className="page-header">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        گالری محصولات
                    </span>
                    <span>
                        <button className="button" onClick={() => setUpload(true)}>
                            بارگذاری عکس
                        </button>
                    </span>
                </div>
            </h2>
            <div className="row animate-top">
              
                <div className="col-12 col-md-12 col-sm-12">
                    <div className="card" style={ {display: 'flex', flexWrap: 'wrap'}}>
                        {
                           Images === null  ? (
                            <>
                             <div className="d-flex justify-center align-center flex-col " style={{width: '100%'}} >
                             <PropagateLoader color={'#a1a1a1'} size={10} />
                                </div>
                            </>
                        ) : Images.length === 0  ? (
                                <>
                                 <div className="d-flex justify-center align-center flex-col  " style={{width: '100%'}} >
                                    عکسی موجود نیست
                                    </div>
                                </>
                            ) : (

                                <>
                                        
                                    {
                                        Images.map((item) => {

                                            return (
                                                <>
                                                <div className={`tabs-content ${ActiveItem === item.id ? 'active' : 'active'}`} >
                                                    <div className="box d-flex flex-col" key={item._id}>
                                                        <img src={item.url} alt={item.name} />
                                                        <p>{item.name}</p>
                                                        <div className="action">
                                                            <button className=" btn-sm trash-btn" onClick={() => this.HandleDelete(item._id)}>
                                                                <i className="bx bx-trash-alt"></i>
                                                            </button>
                                                            <button className="btn-sm open-btn" >
                                                                <i className="bx bx-move"></i>
                                                            </button>
                                                        </div>
                                                    </div>    
                                                </div>
                                            </>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            
            <div className={Upload ? 'animate-opacity absolute card w-50' : 'absolute card w-50 d-none'} style={{top: '50%', right: '50%',  transform: 'translate(50%, -50%)'}} >
                    <div className="file_box" >
                        <p className="file_box_text" >  برای آپلود کلیک کنید</p>
                    <input className="file_box_input" ref={inputImg} type="file" onChange={(e) => handleChanageUploadImage(e)} />
                    </div>
                    {
                        PreviewUploadImg.files && (
                            <div className="w-100 d-flex justify-center flex-col align-center" style={{position: 'relative'}} >
                                        <button onClick={() => HandleDelete()} style={{position: 'absolute', top:'-10px', zIndex: '10', backgroundColor: "#f00", color: '#fff' , borderRadius: '20px'}} >
                                            <svg xmlns="http://www.w3.org/2000/svg"  style={{width: '30px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    <img src={PreviewUploadImg.imageData} width="250" style={{marginTop: '10px', borderRadius: '10px'}} />
                                <p>{PreviewUploadImg.files.name}</p>
                            </div>
                        )
                    }
                   
                    <div className="file_box_footer" >
                        <button className="button" onClick={() => setUpload(false)} > انصراف </button>
                        {
                            uploadBtn ? (
                                <button className="button"  > در حال بارگزاری <i className='bx bx-loader-circle bx-spin'></i> </button>

                            ) : (
                                <button className="button" ref={uploadBtnRef}  onClick={() => HandleUpload()} > اپلود  </button>
                            )
                        }
                    </div>
            </div> 
        </>
    )
}

export default Gallery