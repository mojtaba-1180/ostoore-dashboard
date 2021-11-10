import { useState, useLayoutEffect } from 'react'
import { useHistory } from 'react-router'
import Table from '../../components/table/Table'
import Loader from '../../components/Loaders/ProductLoaders'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Api from '../../util/AxiosConfig'
import BeatLoader from "react-spinners/BeatLoader";


const Categoris = () => {

    const history = useHistory();

    const [Categoris, setCategoris] = useState(null)

    // Geting Data server
    const getData = () => {
        console.log('get data check')
        Api.get('category').then(
            (res) => {
                console.log({ catehoris: res.data})
                // setCategoris(res.data)
        }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }


    const HandleEdit = item => {
        history.push({
            pathname: `/edit/categories/${item.slug}`,
            state: { detail: item }
        })
    }

    const HandleAddNew = () => {
        history.push('/add/categories/');
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
                axios.delete(`http://localhost:5000/categori/${id}`).then((res) => {
                    Swal.fire(
                        'حذف شد !',
                        'دسته بندی مورد نظر با موفقیت پاک شد ',
                        'success',
                        'بستن'
                    )
                    setCategoris( null )
                    getData()
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    }


    useLayoutEffect(() => {
        getData()
    }, [])
    // Table Data Configs

   const customerTableHead = [
        'id',
        'عکس',
        'نام',
        ' نامک ',
        ' اکشن ',
        'زیر مجموعه'
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <>
            <tr key={index}>
                <td>{item.id}</td>
                <td> <img src={item.img} alt="عکس محصول" className="img-table" /> </td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                    <button className="panel_item_button" onClick={() => HandleEdit(item)} >
                        <i className='bx bx-edit panel_item_button_edit' ></i>
                    </button>
                    <button className="panel_item_button" onClick={() => HandleTrash(item.id)} >
                        <i className='bx bx-trash panel_item_button_trash' ></i>
                    </button>

                </td>
                <td>
                    {
                        item.ancestors ? (
                            <span className="btn_toggle">
                                <Link to={{
                                    pathname: `/categories/${item.slug}`,
                                    state: item.ancestors,
                                    old: {
                                        title: item.name
                                    }
                                }}>
                                    <span>
                                        زیر مجموعه

                                    </span>
                                    <i className='bx bx-chevron-left'></i>

                                </Link>
                            </span>
                        ) :
                            null
                    }
                </td>
            </tr>
        </>
    )



    return (
        <>
            <h2 className="page-header">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        دسته بندی ها
                    </span>
                    <span>
                        <button className="button" onClick={() => HandleAddNew()} >
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
                                Categoris === null ? (
                                    <>
                                    <div className="d-flex justify-center align-center flex-col " >
                                            <BeatLoader color={'#a1a1a1'} size={20}  />
                                            درحال بارگذاری
                                      </div>
                                    </>
                                ) : Categoris.length === 0 ? (
                                    <span> دسته بندی وجود ندارد</span>

                                ) : (
                                    <Table
                                        limit='5'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={Categoris}
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

export default Categoris