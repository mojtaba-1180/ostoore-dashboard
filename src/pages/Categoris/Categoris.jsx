import React from 'react'

import Table from '../../components/table/Table'

import categoriList from '../../assets/JsonData/Categori.json'

import { Link } from 'react-router-dom'
import Modal from '../../components/Modals/modal'

const customerTableHead = [
    'id',
    'عکس',
    'نام',
    ' نامک ',
    ' اکشن ',
    'زیر مجموعه'
]

const handleEdit = item => {
    console.log(item)
}
const handleTrash = id => {
    alert('click' + id)
}

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <>
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

const Customers = () => {
    
    return (
        <>
        <div>
            <h2 className="page-header">
                یوزر ها
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='5'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={categoriList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal>
            slaam
        </Modal>
        </>
    )
}

export default Customers
