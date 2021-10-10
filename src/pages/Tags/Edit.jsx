import React, { Component } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
//Editor Required File
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'

export default class EditTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {
                name: '',
                slug: ''
            },
            loading: false,
            err: ''
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

    updateHandler = async () => {
        if (this.state.detail.name === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام محصول را وارد کنید!!!  '
            })
        } else {
            this.setState({
                loading: true
            })
            await axios.put(`http://localhost:5000/prodcuts/${this.props.location.state.detail.id}`, this.state.detail).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: ' بروز رسانی شد',
                })
                this.setState({
                    loading: false
                })
            })
                .catch((err) => {
                    console.log(err + 'salama')
                })
        }
    }
    componentDidMount() {
        this.setState({
            detail: {
                name: this.props.location.state.detail.name,
                slug: this.props.location.state.detail.slug
            }
        })
    }
    changeHandler = (data) => {
        this.setState(() => ({
            detail: {
                name: data.target.value,
                slug: data.target.value.replace(/\s+/g, '-')
            }
        }))
    }
    render() {
        return (
            <div>
                <h2 className="page-header top-sticky">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            ویرابش برچسب
                        </span>
                        <span>
                            <button className="button bg-sucess" onClick={this.updateHandler} >
                                {
                                    this.state.loading ? (
                                        <i className='bx bx-loader-alt bx-spin' ></i>
                                    ) : null
                                }
                                بروز رسانی
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
