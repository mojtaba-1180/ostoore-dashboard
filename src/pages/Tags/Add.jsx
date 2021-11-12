
import { useState, useLayoutEffect } from 'react'
import { useHistory } from 'react-router'

import Swal from 'sweetalert2'
//Editor Required File
import 'froala-editor/css/froala_editor.pkgd.min.css'

import Api from '../../util/AxiosConfig'

import FormData from 'form-data'
const AddTags = () => {
    const history = useHistory();
    const [FormData, setFormData] = useState({
        detail: {
            name: ''
        }
    })
const updateHandler = () => {
        Api.post('hashtag', FormData.detail).then(() => {
            Swal.fire({
                icon: 'success',
                title: '   برچسب شما اضافه شد  ',
            })
            history.push('/tags')
        })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'مشکلی پیش آمده است',
                    text: 'لطفا برسی کنید با سازنده سایت تماس برقرار کنید'
                })
                console.log(err.response)
            })
    }
    const changeHandler = (data) => {
        if (data.target.name === 'title') {
            setFormData({
                detail: {
                    name: data.target.value,
                }
            })
        }
    }

    return (
        <div>
            <h2 className="page-header top-sticky">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        افزودن برچسب
                    </span>
                    <span className="d-flex " >
                        <button className="button bg-sucess ml-2" onClick={updateHandler} >
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
                            <label> نام برچسب </label>
                            <input type="text" className="form-control" name="title" value={FormData.detail.name} onChange={(e) => changeHandler(e)} />
                          </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddTags