import React, { useState, useLayoutEffect, useRef } from 'react'
import ListingItem from '../../components/ListingItem/ListingItem';
import Swal from 'sweetalert2';
import Api from '../../util/AxiosConfig'
import FormData from 'form-data' 
import PropagateLoader from "react-spinners/PropagateLoader";
import { ImgBase64 } from '../../util/imgBase64';

import './gallery.css'

const GalleryModal = (props) => {
    const uploadBtnRef = useRef()
    const [uploadBtn, setuploadBtn] = useState(false)
    const [ActiveItem, setActiveItem] = useState(1)
    const [ContentNew, setContentNew] = useState({})
    const [Images, setImages] = useState([])
    const [PreviewUploadImg, setPreviewUploadImg] = useState({
        files: null,
        imageData: null
    })
    const [Upload, setUpload] = useState(false)

    const getData = async () => {
        console.log('geting Images...')
        await Api.get('image/').then((res) => {
            console.log(res)
            setImages(res.result)
            // res.result.map(item => {
            //     // console.log(getImage(item._id))
            //     return item
            // })
        }).catch((err) => {
            console.log(err)
        })
    }
    // const getImage = async (id) => {
    //     await Api.get(`image/${id}`).then((res) => {
    //         return res
    //     }).catch((err) => {
    //         console.log({ ErrGallery: err })
    //     })
    // }
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
            console.log(formdata)
           console.log('uploading...')
           
            Api.post('image', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then((res) => {
                uploadBtnRef.current.classList.add('disable')
                setuploadBtn(true)
                setUpload(false)
                console.log(res)
                getData()
            }).catch((err) => {
                console.log(err)

            })
            // this.setState((prev) => ({
            //     contentNew: prev.Folder.filter(item => item.id === this.state.activeItem).map(item => {
            //         return {
            //             ...item,
            //             content: [
            //                 ...item.content,
            //                 data
            //             ]
            //         }
            //     })

            // }))
             
    }

    const handleChange = (e) => {
        props.data(e)
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
                        گالری 
                    </span>
                    <span>
                        <button className="button" onClick={() => setUpload(true)}>
                            بارگذاری در این پوشه
                        </button>
                    </span>
                </div>
            </h2>
            <div className="row animate-top">
                {/* <div className="col-4 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="d-flex justify-between align-center">
                            <span className="animate">
                                پوشه عکس ها
                            </span>
                            <span>
                                <button className="button" onClick={() => HandleAddFolder()} >
                                    پوشه جدید
                                </button>
                            </span>
                        </div>
                         {
                            Folder.length === 0 ? (
                                <>
                                    <div className="d-flex justify-center align-center flex-col " >
                                        <PropagateLoader color={'#a1a1a1'} size={10} />
                                    </div>

                                </>
                            ) : (
                                <>
                                    {
                                        Folder.map((item, index) => (
                                            <>
                                                <ListingItem
                                                    id={item.id}
                                                    title={item.title}
                                                    icon="bx bx-folder"
                                                    number={item.content.length}
                                                    active={item.id === ActiveItem}
                                                    onClick={() => HandleListinClick(item.id)}
                                                />

                                            </>
                                        ))
                                    }
                                </>
                            )

                        } 
                    </div>
                </div> */}
                <div className="col-12 col-md-12 col-sm-12">
                    <div className="card " style={ Images.length === 0 ?{} :{display: 'flex', flexWrap: 'wrap', height: '25rem', overflowY: 'scroll', overflowX: 'hidden'}}>
                        {
                            Images.length === 0 ? (
                                <>
                                    <div className="d-flex justify-center align-center flex-col " >
                                        <PropagateLoader color={'#a1a1a1'} size={10} />
                                    </div>
                                </>
                            ) : (

                                <>
                                        
                                    {
                                        Images.map((item) => {

                                            return (
                                                <>
                                                <div className={`tabs-content ${ActiveItem === item.id ? 'active' : 'active'}`} >
                                                    <div className="box d-flex flex-col" style={{cursor: 'pointer'}} onClick={() => handleChange(item)}  key={item._id}>
                                                        <img src={item.url} alt={item.name} width="80" />
                                                        {/* <p>{item.name}</p> */}
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
                    <input className="file_box_input" type="file" onChange={(e) => handleChanageUploadImage(e)} />
                    </div>
                    {
                        PreviewUploadImg.files && (
                            <div className="w-100 d-flex justify-center flex-col align-center" >
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

export default GalleryModal