import React, { Component, useState } from 'react'

import Table from '../../components/table/Table'

import Loader from '../../components/Loaders/ProductLoaders'

import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export default class Categoris extends Component {

    constructor() {
        super();
        this.state = {
            categoris: null
        }
    }


      // Geting Data server
      getData() {
        axios.get('http://localhost:5000/categori').then(
            (res) => {
                this.setState({
                    categoris: res.data
                })
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }

  
    HandleEdit = item => {
        this.props.history.push({
            pathname: `/edit/categori/${item.slug}`,
            state: { detail: item }
        })
    }
    HandleTrash = id => {
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
                    this.setState({categoris: null})
                    this.getData()
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    }

  
    componentDidMount() {
        this.getData()
    }
    // Table Data Configs

    customerTableHead = [
        'id',
        'عکس',
        'نام',
        ' نامک ',
        ' اکشن ',
        'زیر مجموعه'
    ]
 
    renderHead = (item, index) => <th key={index}>{item}</th>

    renderBody = (item, index) => (
        <>
            <tr key={index}>
                <td>{item.id}</td>
                <td> <img src={item.img} alt="عکس محصول" className="img-table" /> </td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                    <button className="panel_item_button" onClick={() => this.HandleEdit(item)} >
                        <i className='bx bx-edit panel_item_button_edit' ></i>
                    </button>
                    <button className="panel_item_button" onClick={() => this.HandleTrash(item.id)} >
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


    render() {
        return (
            <>
                <h2 className="page-header">
                    <div className="d-flex justify-between align-center">
                        <span className="animate">
                            دسته بندی ها
                        </span>
                        <span>
                            <button className="button" >
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
                                    this.state.categoris === null ? (
                                        <>
                                            <Loader />
                                            <Loader />
                                        </>
                                    ) : this.state.categoris.length === 0 ? (
                                        <span> دسته بندی وجود ندارد</span>

                                    ) : (
                                        <Table
                                            limit='5'
                                            headData={this.customerTableHead}
                                            renderHead={(item, index) => this.renderHead(item, index)}
                                            bodyData={this.state.categoris}
                                            renderBody={(item, index) => this.renderBody(item, index)}
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
}

