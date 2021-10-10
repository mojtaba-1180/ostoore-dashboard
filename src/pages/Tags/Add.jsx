import React, { Component } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'

//Editor Required File
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'

export default class AddTags extends Component {
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
        if (this.state.detail.name === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام برچسب را وارد کنید!!!  '
            })
        } else {

            axios.post('http://localhost:5000/tags', this.state.detail).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: ' برچسب شما اضافه شد  ',
                })
                this.props.history.push('/tags')
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
            this.setState((prev) => ({

                detail: {
                    name: data.target.value,
                    slug: data.target.value.replace(/\s+/g, '-'),
                    body: prev.detail.body,
                    img: prev.detail.img
                }
            }))
    }
    render() {
        return (
            <div>
                <h2 className="page-header top-sticky">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            افزودن برچسب
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
                                <label> نام برچسب </label>
                                <input type="text" className="form-control" name="title" value={this.state.detail.name} onChange={this.changeHandler} />
                                <br />
                                <br />
                                <span className="d-flex justify-between">
                                    <label> لینک برچسب  :</label>
                                    <a href={window.location.origin + '/' + this.state.detail.slug}>
                                        {window.location.origin + '/'} <span>{this.state.detail.slug}</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
