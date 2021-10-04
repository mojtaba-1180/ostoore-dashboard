import React, { Component } from 'react'
import Table from '../../components/table/Table'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../../components/Loaders/ProductLoaders'
export default class Product extends Component {
    constructor() {
        super();
        this.state = {
            product: null
        }
    }
     getData = async () =>{
       await axios.get('http://localhost:5000/products').then((res) => {
            console.log(res)
            setTimeout(() => {
                this.setState({
                    product: res.data
                })
            }, 500
            )
        }).catch((err) => {
            console.log(err)
        })
    }
    componentDidMount() {
       this.getData()
    }
    
    
    HandleEdit = item => {
        this.props.history.push({
            pathname: `/products/edit/${item.slug}`,
            state: { detail: item }
        })
    }
    handleTrash = id => {
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
                axios.delete(`http://localhost:5000/products/${id}`).then((res) => {
                    Swal.fire(
                        'حذف شد !',
                        'محصول مورد نظر با موفقیت پاک شد ',
                        'success',
                        'بستن'
                    )
                    this.setState({product: null})
                    this.getData()
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    }

    customerTableHead = [
        'id',
        'عکس',
        'نام',
        ' نامک ',
        ' اکشن '
    ]
    renderHead = (item, index) => <th key={index}>{item}</th>

    renderBody = (item, index) => (
        <>
            <tr key={item.id} >
                <td>{item.id}</td>
                <td> <img src={item.img} alt="عکس محصول" className="img-table" /> </td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                    <button className="panel_item_button" onClick={() => this.HandleEdit(item)} >
                        <i className='bx bx-edit panel_item_button_edit' ></i>
                    </button>
                    <button className="panel_item_button" onClick={() => this.handleTrash(item.id)} >
                        <i className='bx bx-trash panel_item_button_trash' ></i>
                    </button>
                </td>
            </tr>
        </>
    )

    render() {

        return (
            <>
                <div>
                    <h2 className="page-header">
                        <div className="d-flex justify-between align-center">
                            <span className="animate">
                                محصولات
                            </span>
                            <button className="button" onClick={() => this.props.history.push('/products/add')} >
                                افزودن محصول
                            </button>
                        </div>
                    </h2>
                    <div className="row">
                        <div className="col-12">
                            <div className="card animate-top">
                                <div className="card__body">
                                    {
                                        this.state.product === null ? (
                                            <>
                                                <Loader />
                                                <Loader />
                                            </>
                                        ) : this.state.product.length === 0 ? (
                                            <p> محصولی یافت نشد </p>
                                        ): (
                                            
                                            <Table
                                                limit='5'
                                                headData={this.customerTableHead}
                                                renderHead={(item, index) => this.renderHead(item, index)}
                                                bodyData={this.state.product}
                                                renderBody={(item, index) => this.renderBody(item, index)}
                                            />
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
}
