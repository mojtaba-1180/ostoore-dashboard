import React, { Component } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'

//Editor Required File
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {
                name: '',
                slug: '',
                shortDetail: '',
                body: '',
                img: ''
            }
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.updateHandler = this.updateHandler.bind(this)

    }

    imgBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    updateHandler() {
        if(this.state.detail.name === '')
        {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام محصول را وارد کنید!!!  '
            })
        }else {
         
            axios.post('http://localhost:5000/products', this.state.detail).then(() => {
            Swal.fire({
                icon: 'success',
                title: ' محصول شما اضافه شد  ',
            })
            this.props.history.push('/products')
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
    changeHandler(data) {
        if (typeof (data) === 'string') {
            this.setState((prev) => ({

                detail: {
                    name: prev.detail.name,
                    slug: prev.detail.slug,
                    body: data,
                    img: prev.detail.img
                }
            }))
        } else {
            if (data.target.name === 'title') {
                this.setState((prev) => ({

                    detail: {
                        name: data.target.value,
                        slug: data.target.value.replace(/\s+/g, '-'),
                        body: prev.detail.body,
                        img: prev.detail.img
                    }
                }))
            } else if (data.target.name === 'ProductImage') {
                // Convert file to Base 64
                const file = data.target.files[0]
                this.imgBase64(file).then((data) => {
                    this.setState((prev) => ({
                        detail: {
                            name: prev.detail.name,
                            slug: prev.detail.slug,
                            body: prev.detail.body,
                            shortDetail: prev.detail.shortDetail,
                            img: data
                        }
                    }))
                })
            }
        }


    }
    render() {
        return (
            <div>
                <h2 className="page-header top-sticky">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            افزودن محصول
                        </span>
                        <span>
                            <button className="button bg-sucess" onClick={this.updateHandler} >
                                ذخیره
                            </button>
                            <button className="button" onClick={() => this.props.history.go(-1)} >
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
                                <input type="text" className="form-control" name="title" value={this.state.detail.name} onChange={this.changeHandler} />
                                <br />
                                <br />
                                <span className="d-flex justify-between">
                                    <label> لینک محصول  :</label>
                                    <a href={window.location.origin + '/' + this.state.detail.slug}>
                                        {window.location.origin + '/'} <span>{this.state.detail.slug}</span>
                                    </a>
                                </span>
                            </div>
                            <div className="card-body">
                                <span>
                                    <label > توضیحات کوتاه محصول</label>
                                    <br />
                                </span>

                                <FroalaEditor
                                    tag="textarea"
                                    model={this.state.detail.body}
                                    onModelChange={this.changeHandler}
                                />
                                <br />
                                <span>
                                    <label > توضیحات کامل محصول</label>
                                    <br />
                                </span>
                                <br />
                                <FroalaEditor
                                    tag="textarea"
                                    model={this.state.detail.shortDetail}
                                    onModelChange={this.changeHandler}
                                />
                                <div className="d-flex justify-center">
                                    <div>
                                        <span>
                                            <br />
                                            <label > عکس محصول </label>
                                            <br />
                                        </span>
                                        <div className="upload_image">

                                            <input type="file" className="d-none" id="images" name="ProductImage" onChange={this.changeHandler} />
                                            <button className="button " onClick={() => { document.getElementById('images').click() }}>
                                                انتخاب عکس
                                            </button>
                                            <button className="button bg-danger" onClick={() => { this.setState({ detail: { img: '' } }) }}>
                                                حذف عکس
                                            </button>
                                            <img src={this.state.detail.img} alt="" width="120" />
                                        </div>

                                    </div>

                                    <div>
                                        <span>
                                            <br />
                                            <label > گالری محصول </label>
                                            <br />
                                        </span>
                                        <div className="upload_image">

                                            <input type="file" className="d-none" id="images" name="ProductImage" onChange={this.changeHandler} />
                                            <button className="button " onClick={() => { document.getElementById('images').click() }}>
                                                انتخاب عکس
                                            </button>
                                            <button className="button bg-danger" onClick={() => { this.setState({ detail: { img: '' } }) }}>
                                                حذف عکس
                                            </button>
                                            <img src={this.state.detail.img} alt="" width="120" />
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
}
