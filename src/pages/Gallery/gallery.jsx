import React, { Component } from 'react'
import ListingItem from '../../components/ListingItem/ListingItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import './gallery.css'
export default class gallery extends Component {

    constructor() {
        super();
        this.state = {
            folder: [],
            activeItem: 1,
            contentNew: {}

        }
    }

    imgBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    getData = async () => {
       await axios.get('http://localhost:5000/gallery').then((res) => {
            this.setState(
                {
                    folder: res.data
                }
            )
        }).catch((err) => {
            console.log(err)
        })
    }
    HandleListinClick = (item) => {
        this.setState({
            activeItem: item 
        })

    }
    HandleaddFolder = () => {
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
                axios.post('http://localhost:5000/gallery', data).then((res) => {
                    this.getData()
                }).catch((err) => {
                })
            }
        }))
    }

    HandleUpload = async () => {
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
            this.imgBase64(file).then((res) => {
                const data = {
                    img: res
                }
                this.setState((prev) => ({
                   contentNew: prev.folder.filter(item => item.id === this.state.activeItem).map(item => {
                       return{
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

    HandleDelete = (id) => {
        // axios.delete(`http://localhost:5000/gallery/${id}`).then((res) => {
        //     console.log(res)
        //     this.getData()
        // }).catch((err) => {
        //     console.log(err)

        // })
        console.log(id)
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <>
                <h2 className="page-header">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            گالری محصولات
                        </span>
                        <span>
                            <button className="button" onClick={() => this.HandleUpload()}>
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
                                    <button className="button" onClick={() => this.HandleaddFolder()} >
                                        پوشه جدید
                                    </button>
                                </span>
                            </div>
                            {
                                this.state.folder.map((item, index) => (
                                    <>
                                        <ListingItem
                                            id={item.id}
                                            title={item.title}
                                            icon="bx bx-folder"
                                            number={item.content.length}
                                            active={item.id === this.state.activeItem}
                                            onClick={() => this.HandleListinClick(item.id)}
                                        />

                                    </>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-8 col-md-12 col-sm-12">
                        <div className="card">

                            {
                                this.state.folder.map((item) => (
                                    <>
                                        <div className={`tabs-content ${this.state.activeItem === item.id ? 'active' : ''}`} >

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
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
