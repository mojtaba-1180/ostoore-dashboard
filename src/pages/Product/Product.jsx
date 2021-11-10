import React, { useState, useLayoutEffect } from 'react'
import Table from '../../components/table/Table'
import axios from 'axios'
import Swal from 'sweetalert2'
import BeatLoader from "react-spinners/BeatLoader";
import { useHistory } from 'react-router-dom'
const Product = () => {
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const getData = async () => {
        await axios.get('https://ostoore-sport.ir/api/v1/admin/product').then((res) => {
            console.log(res)
            setTimeout(() => {
                setProduct(res.data.result)
            }, 500
            )
        }).catch((err) => {
            console.log(err)
        })
    }
    useLayoutEffect(() => {
        getData()
    }, [])



    const HandleEdit = item => {
        this.props.history.push({
            pathname: `/products/edit/${item.slug}`,
            state: { detail: item }
        })
    }
    const handleTrash = id => {
        Swal.fire({
            title: ' ایا مطمعن هستید میخواهید حذف کنید',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--main-color)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'حذف شود',
            cancelButtonText: 'خیر'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://ostoore-sport.ir/api/v1/admin/product/${id}`).then((res) => {
                    Swal.fire(
                        'حذف شد !',
                        'محصول مورد نظر با موفقیت پاک شد ',
                        'success',
                        'بستن'
                    )
                    this.setState({ product: null })
                    this.getData()
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    }

    const customerTableHead = [
        'id',
        'عکس',
        'نام',
        ' نامک ',
        ' اکشن '
    ]
    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <>
            <tr key={item.id} >
                <td>{item.id}</td>
                <td> <img src={item.img} alt="عکس محصول" className="img-table" /> </td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                    <button className="panel_item_button" onClick={() => HandleEdit(item)} >
                        <i className='bx bx-edit panel_item_button_edit' ></i>
                    </button>
                    <button className="panel_item_button" onClick={() => handleTrash(item.id)} >
                        <i className='bx bx-trash panel_item_button_trash' ></i>
                    </button>
                </td>
            </tr>
        </>
    )

    return (
        <>
            <div>
                <h2 className="page-header">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            محصولات
                        </span>
                        <button className="button" onClick={() => history.push('/products/add/')} >
                            افزودن محصول
                        </button>
                    </div>
                </h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card animate-top">
                            <div className="card__body">
                                {
                                    product === null ? (
                                        <>
                                            <div className="d-flex justify-center align-center flex-col " >
                                                <BeatLoader color={'#a1a1a1'} size={20} />
                                                درحال بارگذاری
                                            </div>
                                        </>
                                    ) : product.length === 0 ? (
                                        <p> محصولی یافت نشد </p>
                                    ) : (
                                        <>
                                            <Table
                                                limit='5'
                                                headData={customerTableHead}
                                                renderHead={(item, index) => renderHead(item, index)}
                                                bodyData={product}
                                                renderBody={(item, index) => renderBody(item, index)}
                                            />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Product;