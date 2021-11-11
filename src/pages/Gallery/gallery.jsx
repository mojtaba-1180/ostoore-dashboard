import React, { useState, useLayoutEffect } from 'react'
import ListingItem from '../../components/ListingItem/ListingItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import Api from '../../util/AxiosConfig'
import { ImgBase64 } from '../../util/imgBase64'
import PropagateLoader from "react-spinners/PropagateLoader";


import './gallery.css'

const Gallery = () => {
    const [Folder, setFolder] = useState([])
    const [ActiveItem, setActiveItem] = useState(1)
    const [ContentNew, setContentNew] = useState({})



    const getData = async () => {
        await Api.get('gallery').then((res) => {
            setFolder(res)
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
                    
                }).catch((err) => {
                })
            }
        }))
    }

    const HandleUpload = async () => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })

        if (file) {
            console.log(' one ')
            ImgBase64(file).then((res) => {
                const data = {
                    img: res
                }
                this.setState((prev) => ({
                    contentNew: prev.Folder.filter(item => item.id === this.state.activeItem).map(item => {
                        return {
                            ...item,
                            content: [
                                ...item.content,
                                data
                            ]
                        }
                    })

                }))
                axios.put(`http://localhost:5000/gallery/${this.state.activeItem}`, this.state.contentNew[0]).then((res) => {
                    console.log(res)
                    this.getData()
                }).catch((err) => {
                    console.log(err)

                })
            })



        }
    }

    const HandleDelete = (id) => {
        console.log(id)
    }
    useLayoutEffect(() => {
        setTimeout(()=> {
            getData();
        },1000)
      
    }, [])
    return (
        <>
            <h2 className="page-header">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        گالری محصولات
                    </span>
                    <span>
                        <button className="button" onClick={() => HandleUpload()}>
                            بارگذاری در این پوشه
                        </button>
                    </span>
                </div>
            </h2>
            <div className="row animate-top">
                <div className="col-4 col-md-12 col-sm-12">
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
                </div>
                <div className="col-8 col-md-12 col-sm-12">
                    <div className="card">
                        {
                         Folder.length === 0 ? (
                            <>
                            <div className="d-flex justify-center align-center flex-col " >
                                        <PropagateLoader color={'#a1a1a1'} size={10} />
                                    </div>
                            </>
                         )   : (

                       <>
                        
                        {
                            Folder.map((item) => (
                                <>
                                    <div className={`tabs-content ${ActiveItem === item.id ? 'active' : ''}`} >

                                        {
                                            item.content.length === 0 ? (
                                                <>
                                                    عکسی وجود ندارد
                                                </>
                                            ) : (
                                                item.content.map((img, index) => (
                                                    <div className="box" key={index}>
                                                        <img src={img.img} alt="" width="50" />
                                                        <div className="action">
                                                            <button className=" btn-sm trash-btn" onClick={() => this.HandleDelete(index)}>
                                                                <i className="bx bx-trash-alt"></i>
                                                            </button>
                                                            <button className="btn-sm open-btn" >
                                                                <i className="bx bx-move"></i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                ))
                                            )

                                        }
                                    </div>
                                </>
                            ))
                        }
                        </>
                          )
                          }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gallery