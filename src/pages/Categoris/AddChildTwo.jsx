

import Modal from '@mui/material/Modal';


import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'

import Swal from 'sweetalert2'
//Editor Required File
import 'froala-editor/css/froala_editor.pkgd.min.css'

import Api from '../../util/AxiosConfig'
import GalleryModal from '../../components/Gallery/gallery';
const AddChildCategoryTwo = () => {
    const { id } = useParams()
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [Image, setImage] = useState(null)
    const [CategoryList, setCategoryList] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [FormData, setFormData] = useState({
        detail: {
            name: '',
            parentId: id ,
            images: Image ? Image._id : ''
        }
    })
    const updateHandler = (data) => {
        setLoading(true)
        console.log(data)
        // post Data in added category
        if (FormData.detail.name === '') {
            Swal.fire({
                icon: 'warning',
                title: '  نام دسته بندی را وارد کنید ',
                confirmButtonText: ' تایید '
            })
            setLoading(false)
        } else if (FormData.detail.images === '') {
            Swal.fire({
                icon: 'warning',
                title: '  عکس دسته بندی را انتخاب کنید ',
                confirmButtonText: ' تایید '
            })
            setLoading(false)
        } else {
            Api.post('category', FormData.detail).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '  دسته بندی شما اضافه شد  ',
                    confirmButtonText: ' تایید '

                })
            setLoading(false)
                history.push('/categories')
            })
                .catch((err) => {
                setLoading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'مشکلی پیش آمده است',
                        text: 'لطفا برسی کنید با سازنده سایت تماس برقرار کنید',
                         confirmButtonText: ' تایید '

                    })
                })
        }
        
    }

    const changeHandler = (data) => {
        if (data.target.name === 'title') {
            setFormData((prev) => ({
                detail: {
                    name: data.target.value,
                    parentId: prev.detail.parentId,
                    images: prev.detail.images
                }
            }))
        } else if (data.target.name === 'parent') {
            setFormData((prev) => ({
                detail: {
                    name: prev.detail.name,
                    parentId: data.target.value,
                    images: prev.detail.images
                }
            }))}
    }

    const handlechanges = (e) => {
        setOpen(false)
        setImage(e)
        setFormData((prev) => (
            {
                detail: {
                    name: prev.detail.name,
                    parentId: prev.detail.parentId,
                    images: e._id,
                }
            }
        ))
        
    }
    const style = {
        position:'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        backgroundColor: 'var(--main-bg)',
        borderRadius: '20px',
        padding: '20px'
    };
    return (
        <div>
            <h2 className="page-header top-sticky">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        افزودن دسته بندی
                    </span>
                    <span className="d-flex " >
                    <button className={Loading ? " button bg-sucess disable" : "button bg-sucess"} onClick={updateHandler} >
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
                                        <div className="d-flex flex-col" >
                                            <button className="button " onClick={() => { handleOpen() }}>
                                                انتخاب عکس
                                            </button>
                                            <button className="button bg-danger" onClick={() => { setImage(null) }}>
                                                حذف عکس
                                            </button>
                                        </div>
                                        {Image && Image.name}
                                        <img src={Image ? Image.url : ''} alt="" width="120" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}>
                <div  style={style}>
                    <GalleryModal data={handlechanges} />
                </div>
            </Modal>
        </div>
    )
}
export default AddChildCategoryTwo