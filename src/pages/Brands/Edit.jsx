import React, { useState, useLayoutEffect} from 'react'
import Swal from 'sweetalert2'
import { useLocation, useHistory } from 'react-router'
import Api from '../../util/AxiosConfig'
export const EditBrands = () => {
    const location = useLocation();
    const history = useHistory();
    // State Management
    const [Detail, setDetail] = useState({
        name: ''
    })
    const [Error, setError] = useState('')
    const [Loading, setLoading] = useState(false)

    // Mounting Founction
    useLayoutEffect(() => {
        console.log(location)
        setDetail({name: location.state.detail.name})
    }, [])

    // Functions Handles
    const updateHandler = async () => {
        if (Detail.name === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام برند را وارد کنید!!!  '
            })
        } else {
            setLoading(true)
            console.log('salam')
            await Api.put(`brand/${location.state.detail._id}`, Detail).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: ' بروز رسانی شد',
                })
                setLoading(false)
            })
                .catch((err) => {
                    console.log(err + 'بروز رسانی به مشکل بر خورده است')
                })
        }
    }
    const changeHandler = (e) => {
        setDetail({name: e.target.value})
    }

    return (
        <div>
            <h2 className="page-header top-sticky">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        ویرابش برند
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
                            <label> نام برند </label>
                            <input type="text" className="form-control" name="title" value={Detail.name} onChange={(e) => changeHandler(e)} />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

