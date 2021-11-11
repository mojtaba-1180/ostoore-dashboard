import React, { useState, useLayoutEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import Api from '../../util/AxiosConfig'
import Swal from 'sweetalert2'


const EditTags = () => {
    const location = useLocation();
    const history  = useHistory();
    const [Detail, setDetail] = useState({
        detail: {
            name: '',
            slug: ''
        }})
        const [Loading, setLoading] = useState(false)
    useLayoutEffect(() => {
        setDetail({
            detail: {
                name: location.state.detail.name
            }
        })
    }, [])

    const updateHandler = async () => {
        if (Detail.detail.name === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام محصول را وارد کنید!!!  '
            })
        } else {
            setLoading(true)
            await Api.put(`hashtag/${location.state.detail._id}`, Detail.detail).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: ' بروز رسانی شد',
                })
                setLoading(false)
            })
                .catch((err) => {
                    console.log(err + 'salama')
                })
        }
    }

    const changeHandler = (data) => {
        setDetail({
            detail: {
                name: data.target.value
              }
        })
    }

        return (
            <div>
                <h2 className="page-header top-sticky">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            ویرابش برچسب
                        </span>
                        <span>
                            <button className="button bg-sucess" onClick={() => updateHandler()} >
                                {
                                    Loading ? (
                                        <i className='bx bx-loader-alt bx-spin' ></i>
                                    ) : null
                                }
                                بروز رسانی
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
                                <input type="text" className="form-control" name="title" value={Detail.detail.name} onChange={(e)=> changeHandler (e)} />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


export default EditTags