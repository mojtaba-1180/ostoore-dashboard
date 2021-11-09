
import { useState } from 'react'
import { useHistory } from 'react-router'

import Swal from 'sweetalert2'
//Editor Required File
import 'froala-editor/css/froala_editor.pkgd.min.css'

import Api from '../../util/AxiosConfig'

const EditCategory = () => {
    const history = useHistory();
    const [FormData, setFormData] = useState({
        detail: {
            name: '',
            parent_id: '',
            img: ''
        }
    })



    const imgBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const updateHandler = () => {
        Api.post('category', FormData).then(() => {
            Swal.fire({
                icon: 'success',
                title: '  دسته بندی شما اضافه شد  ',
            })
            history.push('/category')
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
    const changeHandler = (data) => {
        if (data.target.name === 'title') {
            setFormData((prev) => ({
                detail: {
                    name: data.target.value,
                    parent_id: prev.detail.parent_id,
                    img: prev.detail.img
                }
            }))
        } else if (data.target.name === 'parent') {
            setFormData((prev) => ({
                detail: {
                    name: prev.detail.name,
                    parent_id: data.target.value,
                    img: prev.detail.img
                }
            }))
        } else if (data.target.name === 'ProductImage') {
            // Convert file to Base 64
            const file = data.target.files[0]
            imgBase64(file).then((data) => {
                setFormData((prev) => ({
                    detail: {
                        name: prev.detail.name,
                        parent_id: prev.detail.parent_id,
                        img: data
                    }
                }))
            })
        }
    }

    return (
        <div>
            <h2 className="page-header top-sticky">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        افزودن دسته بندی
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
                            <label> نام دسته بندی </label>
                            <input type="text" className="form-control" name="title" value={FormData.detail.name} onChange={changeHandler} />
                            <br />
                            <br />
                            <label>  دسته بندی مادر </label>
                            <select  className="form-control" name="parent" value={FormData.detail.parent_id} onChange={changeHandler} >
                                <option value=""> انتخاب کنید </option>
                                <option value="1"> one </option>
                                <option value="2"> 3 </option>
                                <option value="3"> 4 </option>
                            </select>
                            
                            {/* <span className="d-flex justify-between">
                                <label> لینک محصول  :</label>
                                <a href={window.location.origin + '/' + state.detail.slug}>
                                    {window.location.origin + '/'} <span>{state.detail.slug}</span>
                                </a>
                            </span> */}
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-center">
                                <div>
                                    <span>
                                        <br />
                                        <label > عکس دسته بندی </label>
                                        <br />
                                    </span>
                                    <div className="upload_image">

                                        <input type="file" className="d-none" id="images" name="ProductImage" onChange={changeHandler} />
                                        <button className="button " onClick={() => { document.getElementById('images').click() }}>
                                            انتخاب عکس
                                        </button>
                                        <button className="button bg-danger" onClick={() => { setFormData({ detail: { img: '' } }) }}>
                                            حذف عکس
                                        </button>
                                        <img src={FormData.detail.img} alt="" width="120" />
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
export default EditCategory