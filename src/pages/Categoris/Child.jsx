
import React, { Component } from 'react'

import Table from '../../components/table/Table'

import Loader from '../../components/Loaders/ProductLoaders'

import { Link } from 'react-router-dom'


export default class ChildCategoris extends Component {

    constructor(){
        super();
        this.state = {
            loaded : false
        }
    }

    componentDidUpdate(){
        if(this.state.loaded === true){
            setTimeout(()=> {
                this.setState({
                    loaded: false
                })
            },1000)
        }
    }

    customerTableHead = [
        'id',
        'عکس',
        'نام',
        ' نامک ',
        ' اکشن ',
        ' زیر مجموعه ',
    ]

    handleEdit = item => {
        console.log(item)
    }
    handleTrash = id => {
        alert('click' + id)
    }

    renderHead = (item, index) => <th key={index}>{item}</th>

    renderBody = (item, slug) => (
        <>

            <tr key={item.id}>
                <td>{item.id}</td>
                <td> <img src={item.img} className="img-table" alt="img" /> </td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                    <button className="panel_item_button" onClick={() => this.handleEdit(item.id)} >
                        <i className='bx bx-edit panel_item_button_edit' ></i>
                    </button>
                    <button className="panel_item_button" onClick={() => this.handleTrash(item.id)} >
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
                                }} onClick={() => {this.setState({loaded: true})} } >
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
            <div>
                <h2 className="page-header">
                    دسته بندی
                </h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card animate-top">
                            <button className="button"
                             onClick={() => {
                                 this.props.history.go(-1)
                                 this.setState({loaded: true})
                                 }} >
                                بازگشت
                            </button>
                            <div className="card__body">
                                {
                                    this.state.loaded === true ? (
                                        <>
                                        <Loader/>
                                        <Loader/>
                                        </>
                                    ) : (
                                        <Table
                                        limit='5'
                                        headData={this.customerTableHead}
                                        renderHead={(item, index) => this.renderHead(item, index)}
                                        bodyData={this.props.location.state}
                                        renderBody={(item) => this.renderBody(item)}
                                    />
                                    )
                                }
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
