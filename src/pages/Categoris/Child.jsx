import React from 'react'

import Table from '../../components/table/Table'

import { Link } from 'react-router-dom'


const customerTableHead = [
    'id',
    'عکس',
    'نام',
    ' نامک ',
    ' اکشن ',
]

const handleEdit = item => {
    console.log(item)
}
const handleTrash = id => {
    alert('click' + id)
}

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index, slug) => (
    <>
    {
        console.log(item)
    }
    <tr key={index}>
        <td>{item.id}</td>
        <td> <img src={item.img} alt="img" width="50px" srcset="" /> </td>
        <td>{item.name}</td>
        <td>{item.slug}</td>
        <td>
            <button className="panel_item_button" onClick={() => handleEdit(item.id)} >
                <i className='bx bx-edit panel_item_button_edit' ></i>
            </button>
            <button className="panel_item_button" onClick={() => handleTrash(item.id)} >
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

const Customers = props => {
    return (
        <div>
            <h2 className="page-header">
                دسته بندی 
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                    <button className="button_goback" onClick={() => props.history.go(-1) } >
                    بازگشت
                </button>
                        <div className="card__body">
                            {
                                console.log('render' , props.location.state )
                            }
                            <Table
                                limit='5'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={ props.location.state }
                                renderBody={(item, index) => renderBody(item, index, props.location.pathname)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
