import React, { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Table from '../../components/table/Table'
import Swal from 'sweetalert2'
import Api from '../../util/AxiosConfig'
import BeatLoader from "react-spinners/BeatLoader";
const Brands = () => {
    const history = useHistory();
    const [Brands, setBrands] = useState(null)




    // Geting Data server
    const getData = () => {
        Api.get('brand').then(
            (res) => {
                setBrands(res.result)
            }
        ).catch(
            (err) => {
                console.log(err.response)
            }
        )
    }


    const HandleEdit = item => {
        history.push({
            pathname: `/brands/edit/${item._id}`,
            state: { detail: item }
        })
    }
    const HandleTrash = id => {
        Swal.fire({
            title: ' ایا مطمعن هستید میخواهید حذف کنید',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'حذف شود',
            cancelButtonText: 'خیر'
        }).then((result) => {
            if (result.isConfirmed) {
                Api.delete(`brand/${id}`).then((res) => {
                    Swal.fire(
                        'حذف شد !',
                        'دسته بندی مورد نظر با موفقیت پاک شد ',
                        'success',
                        'بستن'
                    )
                    console.log(res)
                    setBrands(null)
                    getData()
                })
                    .catch((err) => {
                        console.log(err.response)
                    })
                
            }
        })
    }


    useLayoutEffect(() => {
        getData()
    }, [])
    // Table Data Configs

   const customerTableHead = [
        'ردیف',
        'نام',
        ' نامک ',
        ' اکشن '
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <>
            <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                    <button className="panel_item_button" onClick={() => HandleEdit(item)} >
                        <i className='bx bx-edit panel_item_button_edit' ></i>
                    </button>
                    <button className="panel_item_button" onClick={() => HandleTrash(item._id)} >
                        <i className='bx bx-trash panel_item_button_trash' ></i>
                    </button>

                </td>
            </tr>
        </>
    )

    
    return (
        <>
            <h2 className="page-header">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        برند ها
                    </span>
                    <span>
                        <button className="button" onClick={() => history.push('/brands/add')} >
                            افزودن جدید
                        </button>
                    </span>
                </div>
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card animate-top">
                        <div className="card__body">
                            {

                                
                                Brands === null ? (
                                    <>
                                      <div className="d-flex justify-center align-center flex-col " >
                                            <BeatLoader color={'#a1a1a1'} size={20}  />
                                            درحال بارگذاری
                                      </div>
                                    </>
                                ) : Brands.length === 0 ? (
                                    <>
                                    {console.log(Brands)}
                                    <span> برندی وجود ندارد</span>
                                    </>

                                ) : (
                                    <Table
                                        limit='5'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={Brands}
                                        renderBody={(item, index) => renderBody(item, index)}
                                    />
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Brands
