import React, { useState } from 'react'

import Swal from 'sweetalert2'
import Api from '../../util/AxiosConfig'
//Editor Required File
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'
import { useHistory } from 'react-router'
import { ImgBase64 } from '../../util/imgBase64'

const AddProduct = () => {
    const history = useHistory();
    const [Detail, setDetail] = useState({
        name: '',
        slug: '',
        shortDetail: '',
        body: '',
        img: ''
    })


    const updateHandler = () => {
        if (Detail.name === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام محصول را وارد کنید!!!  '
            })
        } else {
            console.log('chnages')
            Api.post('/product', Detail).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: ' محصول شما اضافه شد  ',
                })
                history.push('/products')
            })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'مشکلی پیش آمده است',
                        text: 'لطفا برسی کنید با سازنده سایت تماس برقرار کنید'
                    })
                    console.log(err)
                })

        }
    }
    const changeHandler = (data) => {
        if (typeof (data) === 'string') {
            setDetail((prev) => ({
                    name: prev.name,
                    slug: prev.slug,
                    body: data,
                    img: prev.img
            }))
        } else {
            if (data.target.name === 'title') {
                setDetail((prev) => ({

                        name: data.target.value,
                        slug: data.target.value.replace(/\s+/g, '-'),
                        body: prev.body,
                        img: prev.img
                }))
            } else if (data.target.name === 'ProductImage') {
                // Convert file to Base 64
                const file = data.target.files[0]
                ImgBase64(file).then((data) => {
                    setDetail((prev) => ({
                            name: prev.name,
                            slug: prev.slug,
                            body: prev.body,
                            shortDetail: prev.shortDetail,
                            img: data
                    }))
                })
            }
        }


    }

        return (
            <div>
                <h2 className="page-header top-sticky">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            افزودن محصول
                        </span>
                        <span>
                            <button className="button bg-sucess" onClick={() => updateHandler()} >
                                ذخیره
                            </button>
                            <button className="button" onClick={() => history.go(-1)} >
                                بازگشت
                            </button>
                        </span>
                    </div>
                </h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card animate-top">
                            <div className="card-title">
                                <label> نام محصول </label>
                                <input type="text" className="form-control" name="title" value={Detail.name} onChange={(e) => changeHandler(e)} />
                                <br />
                                <br />
                                <span className="d-flex justify-between">
                                    <label> لینک محصول  :</label>
                                    {/* <a href={window.location.origin + '/' + state.detail.slug}>
                                        {window.location.origin + '/'} <span>{state.detail.slug}</span>
                                    </a> */}
                                </span>
                            </div>
                            <div className="card-body">
                                <span>
                                    <label > توضیحات کوتاه محصول</label>
                                    <br />
                                </span>

                                <FroalaEditor
                                    tag="textarea"
                                    model={Detail.shortDetail}
                                    onModelChange={changeHandler}
                                />
                                <br />
                                <span>
                                    <label > توضیحات کامل محصول</label>
                                    <br />
                                </span>
                                <br />
                                <FroalaEditor
                                    tag="textarea"
                                    model={Detail.body}
                                    onModelChange={changeHandler}
                                />
                                <div className="d-flex justify-center">
                                    <div>
                                        <span>
                                            <br />
                                            <label > عکس محصول </label>
                                            <br />
                                        </span>
                                        <div className="upload_image">

                                            <input type="file" className="d-none" id="images" name="ProductImage" onChange={(e) => changeHandler(e)} />
                                            <button className="button " onClick={() => { document.getElementById('images').click() }}>
                                                انتخاب عکس
                                            </button>
                                            <button className="button bg-danger" onClick={() => { setDetail({  img: '' }) }}>
                                                حذف عکس
                                            </button>
                                            <img src={Detail.img} alt="" width="120" />
                                        </div>

                                    </div>

                                    <div>
                                        <span>
                                            <br />
                                            <label > گالری محصول </label>
                                            <br />
                                        </span>
                                        <div className="upload_image">

                                            <input type="file" className="d-none" id="images" name="ProductImage" onChange={(e) => changeHandler(e)} />
                                            <button className="button " onClick={() => { document.getElementById('images').click() }}>
                                                انتخاب عکس
                                            </button>
                                            <button className="button bg-danger" onClick={() => { setDetail({ img: '' }) }}>
                                                حذف عکس
                                            </button>
                                            <img src={Detail.img} alt="" width="120" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default AddProduct