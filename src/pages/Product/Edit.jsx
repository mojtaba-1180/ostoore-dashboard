import { useState, useLayoutEffect, useRef, useEffect } from 'react'
import Swal from 'sweetalert2'
import Api from '../../util/AxiosConfig'
//Editor Required File
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Router 
import { useHistory, useParams } from 'react-router'
// loaders import 
import BeatLoader from "react-spinners/BeatLoader";


// Axios config import 
import API from '../../util/AxiosConfig'
// material ui components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, Modal, Switch } from '@mui/material'
import GalleryModal from '../../components/Gallery/gallery'
// tabs components
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import './Product.css'

const AddProduct = () => {
    const { id } = useParams();
    // filed State
    const [Loading, setLoading] = useState(false)
    const [LoadingPage, setLoadingPage] = useState(false)

    // Base State
    const history = useHistory();
    const [Detail, setDetail] = useState({
        id: id,
        name: '',
        abstract: '',
        description: '',
        basePrice: '',
        hashtags: "",
        images: "",
        brand: "",
        size: "",
        stock: '',
        isDisable: false,
        categoryId: '',
    })
    const [Category, setCategory] = useState(null)
    const [Brands, setBrands] = useState(null)
    const [SearchCategory, setSearchCategory] = useState(Category)
    const [SearchBrands, setSearchBrands] = useState(Brands)
    const [Size, setSize] = useState(null)
    const [SearchSize, setSearchSize] = useState(Size)
    const [Tags, setTags] = useState([])
    const [checkedCategory, setCheckedCategory] = useState([]);
    // const [checkedBrands, setCheckedBrands] = useState([]);
    const [checkedSize, setCheckedSize] = useState([]);
    const [Image, setImage] = useState([])
    const [ImageId, setImageId] = useState([])
    const [imageGeter, setImageGeter] = useState([false])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Geting Data 
    useLayoutEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
            setLoadingPage(true)
            API.get('hashtag').then((res) => {
                setTags(res.result.map(item => {
                    return { label: item.name, id: item._id }
                }))

            }).catch((err) => {
                console.log(err.response)
            })
            API.get('category').then((res) => {
                setCategory(res.result)
                setSearchCategory(res.result)
            }).catch((err) => {
                console.log(err.response)
            })
            API.get('brand').then((res) => {
                setBrands(res.result)
                setSearchBrands(res.result)
            }).catch((err) => {
                console.log(err.response)
            })
            API.get('size').then((res) => {
                setSize(res.result)
                setSearchSize(res.result)
            }).catch((err) => {
                console.log(err.response)
            })
            API.get('product').then(res => {
                const data = res.result.filter(item => item._id === id)
                data.map(async (item) => {
                    await API.get('image').then(async (res) => {
                        await setImageGeter(res.result)
                    })
                    setCheckedSize(item.size)
                    setCheckedCategory(item.categoryId)
                    setImageId(item.images)
                    setDetail({
                        name: item.name,
                        abstract: item.abstract,
                        description: item.description,
                        basePrice: item.basePrice,
                        hashtags: item.hashtags,
                        images: item.images,
                        brand: item.brand,
                        size: item.size,
                        stock: item.stock,
                        isDisable: item.isDisable,
                        categoryId: item.categoryId.map(item => item._id),
                    })
                    setCheckedCategory(item.categoryId.map(item => item._id))
                    setLoadingPage(false)

                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            // console.log('close')
        }
        return () => {
            isCancelled = true
        }
    }, [])
    const updateHandler = () => {
        setLoading(true)
        if (Detail.name === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام محصول را وارد کنید!!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.images === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا عکس محصول را انتخاب کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.brand === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا برند محصول را انتخاب کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.size === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا سایز محصول را انتخاب کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.hashtags === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا برچسب  محصول را انتخاب کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.stock === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا موجودی محصول را وارد کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.description === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا توضیحات محصول را وارد کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.abstract === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا توضیحات کوتاه محصول را وارد کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.basePrice === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا قیمت محصول را وارد کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else if (Detail.categoryId === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا دسته بندی محصول را وارد کنید !!!  ',
                confirmButtonText: ' تایید '

            })
            setLoading(false)
        } else {
            // console.log(Detail)
            Api.put(`product/${id}`, Detail).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: ' محصول شما بروزرسانی شد  ',
                    confirmButtonText: ' تایید '

                })
                setLoading(false)
                history.push('/products')
            })
                .catch((err) => {
                    setLoading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'مشکلی پیش آمده است',
                        text: 'لطفا برسی کنید با سازنده سایت تماس برقرار کنید',
                        confirmButtonText: ' تایید '

                    })
                    console.log(err)
                })

        }
    }

    //  Editor Handler change 


    const handleToggleCategory = (value) => () => {

        const currentIndex = checkedCategory.indexOf(value);
        const newCheckedCategory = [...checkedCategory];
        // console.log(newCheckedCategory)
        if (currentIndex === -1) {
            newCheckedCategory.push(value);
        } else {
            newCheckedCategory.splice(currentIndex, 1);
        }
        setCheckedCategory(newCheckedCategory);
        setDetail(prev => ({
            name: prev.name,
            abstract: prev.abstract,
            description: prev.description,
            basePrice: prev.basePrice,
            hashtags: prev.hashtags,
            images: prev.images,
            brand: prev.brand,
            stock: prev.stock,
            size: prev.size,
            isDisable: prev.isDisable,
            categoryId: newCheckedCategory.length >= 1 ? newCheckedCategory : null,
        }))
    };
    const handleToggleBrands = (value) => () => {
        setDetail(prev => ({
            name: prev.name,
            abstract: prev.abstract,
            description: prev.description,
            basePrice: prev.basePrice,
            hashtags: prev.hashtags,
            images: prev.images,
            brand: value,
            stock: prev.stock,
            size: prev.size,
            isDisable: prev.isDisable,
            categoryId: prev.categoryId
        }))
    };
    const handleToggleSize = (value) => () => {

        const currentIndex = checkedSize.indexOf(value);
        const newChecked = [...checkedSize];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedSize(newChecked);
        setDetail(prev => ({
            name: prev.name,
            abstract: prev.abstract,
            description: prev.description,
            basePrice: prev.basePrice,
            hashtags: prev.hashtags,
            images: prev.images,
            brand: prev.brand,
            size: newChecked.length >= 1 ? newChecked : null,
            stock: prev.stock,
            isDisable: prev.isDisable,
            categoryId: prev.categoryId
        }))
    };

    // category search
    const handleSearchCategory = (val) => {
        const data = Category.filter(e => {
            return e.name.includes(val.target.value)
        }
        )
        setSearchCategory(data)

    }
    const handleSearchBrands = (val) => {
        const data = Brands.filter(e => {
            return e.name.includes(val.target.value)
        }
        )
        setSearchBrands(data)
    }
    const handleSearchSize = (val) => {
        const data = Size.filter(e => {
            return e.name.includes(val.target.value)
        }
        )
        setSearchSize(data)
    }
    const handleImage = (e) => {
        setOpen(false)
        setImage([...Image, e])
        setImageId(prev => 
            [
                ...prev, e._id
            ]
        )
        // console.log(Image)

    }
    useEffect(() => {
        setDetail(prev => ({
            name: prev.name,
            abstract: prev.abstract,
            description: prev.description,
            basePrice: prev.basePrice,
            hashtags: prev.hashtags,
            images: ImageId,
            brand: prev.brand,
            stock: prev.stock,
            size: prev.size,
            isDisable: prev.isDisable,
            categoryId: prev.categoryId
        }))
    }, [ImageId])
    const handleChangeDetailProduct = (e, id) => {
        if (e.target.id === 'name') {
            setDetail(prev => ({
                name: e.target.value,
                abstract: prev.abstract,
                description: prev.description,
                basePrice: prev.basePrice,
                hashtags: prev.hashtags,
                images: prev.images,
                brand: prev.brand,
                stock: prev.stock,
                size: prev.size,
                isDisable: prev.isDisable,
                categoryId: prev.categoryId
            }))
        } else if (e.target.id === 'stock') {
            setDetail(prev => ({
                name: prev.name,
                abstract: prev.abstract,
                description: prev.description,
                basePrice: prev.basePrice,
                hashtags: prev.hashtags,
                images: prev.images,
                brand: prev.brand,
                stock: e.target.value,
                isDisable: prev.isDisable,
                categoryId: prev.categoryId
            }))
        } else if (e.target.id === 'isDisable') {
            setDetail(prev => ({
                name: prev.name,
                abstract: prev.abstract,
                description: prev.description,
                basePrice: prev.basePrice,
                hashtags: prev.hashtags,
                images: prev.images,
                brand: prev.brand,
                stock: prev.stock,
                size: prev.size,
                isDisable: e.target.checked,
                categoryId: prev.categoryId
            }))
        }
        else if (e.target.id === 'brand') {
            setDetail(prev => ({
                name: prev.name,
                abstract: prev.abstract,
                description: prev.description,
                basePrice: prev.basePrice,
                hashtags: prev.hashtags,
                images: prev.images,
                brand: e.target.checked,
                stock: e.target.value,
                isDisable: prev.isDisable,
                categoryId: prev.categoryId
            }))
        } else if (e.target.id === 'baseprice') {
            setDetail(prev => ({
                name: prev.name,
                abstract: prev.abstract,
                description: prev.description,
                basePrice: parseInt(e.target.value),
                hashtags: prev.hashtags,
                images: prev.images,
                brand: prev.brand,
                stock: prev.stock,
                size: prev.size,
                isDisable: prev.isDisable,
                categoryId: prev.categoryId
            }))
        } else if (e.target.id === 'categoryId') {
            setDetail(prev => ({
                name: prev.name,
                abstract: prev.abstract,
                description: prev.description,
                basePrice: prev.basePrice,
                hashtags: prev.hashtags,
                images: prev.images,
                brand: prev.brand,
                stock: prev.stock,
                size: prev.size,
                isDisable: prev.isDisable,
                categoryId: e.target.checked
            }))
        }

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        backgroundColor: 'var(--main-bg)',
        borderRadius: '20px',
        padding: '20px'
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                style={{ width: '74%' }}
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}

            >
                {value === index && (
                    <Box sx={{ p: 3, color: 'var(--text-color)' }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const delHandlerImage = (id) => {
        setImage(Image.filter(item => item._id != id))
        setImageId(ImageId.filter(item => item != id))
    }

    return (


        <div className={LoadingPage ? 'pending' : ''} >
            <h2 className="page-header top-sticky">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        افزودن محصول
                    </span>
                    {
                        LoadingPage && (
                            <div className="d-flex justify-center align-center " >
                                در حال بارگذاری
                                {' '}  <BeatLoader color={'#a1a1a1'} size={10} />  {' '}
                            </div>
                        )
                    }
                    <span>
                        <button className={Loading ? " button bg-sucess disable" : "button bg-sucess"} onClick={() => { updateHandler() }} >
                            {
                                Loading ? (
                                    <>
                                        <span>  درحال بارگذاری  </span>
                                        <i classList='bx bx-loader bx-spin'></i>
                                    </>
                                ) : (
                                    <span>
                                        ذخیره
                                    </span>
                                )
                            }

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
                            <label> نام محصول </label>
                            <input type="text" className="form-control" id="name" value={Detail.name} name="title" onChange={handleChangeDetailProduct} />
                            <br />
                            <br />
                            <span className="d-flex justify-between">
                                {/* <label> لینک محصول  :</label> */}
                                {/* <a href={window.location.origin + '/' + state.detail.slug}>
                                {window.location.origin + '/'} <span>{state.detail.slug}</span> </a> */}
                            </span>
                        </div>
                        <div className="card-body">
                            <span>
                                <label > توضیحات کوتاه محصول</label>
                                <br />
                            </span>

                            <CKEditor

                                editor={ClassicEditor}
                                data={Detail.abstract}

                                onBlur={(event, editor) => {
                                    const data = editor.getData();
                                    console.log(data);
                                    setDetail(prev => ({
                                        name: prev.name,
                                        abstract: data,
                                        description: prev.description,
                                        basePrice: prev.basePrice,
                                        hashtags: prev.hashtags,
                                        images: prev.images,
                                        brand: prev.brand,
                                        stock: prev.stock,
                                        size: prev.size,
                                        isDisable: prev.isDisable,
                                        categoryId: prev.categoryId
                                    }))
                                }}

                            />
                            <br />
                            <span>
                                <label > توضیحات کامل محصول</label>
                                <br />
                            </span>
                            <br />
                            <CKEditor

                                editor={ClassicEditor}
                                data={Detail.description}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}

                                onBlur={(event, editor) => {
                                    const description = editor.getData();
                                    console.log(description);
                                    setDetail(prev => ({
                                        name: prev.name,
                                        abstract: prev.abstract,
                                        description: description,
                                        basePrice: prev.basePrice,
                                        hashtags: prev.hashtags,
                                        images: prev.images,
                                        brand: prev.brand,
                                        stock: prev.stock,
                                        size: prev.size,
                                        isDisable: prev.isDisable,
                                        categoryId: prev.categoryId
                                    }))
                                }}
                            // onFocus={ ( event, editor ) => {
                            //     console.log( 'Focus.', editor );
                            // } }
                            />
                            <div className="d-flex justify-between w-100">
                                <div className="w-100" >
                                    <span>
                                        <br />
                                        <label > عکس محصول </label>
                                        <br />
                                    </span>

                                    <div className="upload_image d-flex">
                                        <div className="w-100" >
                                            <button className="button " onClick={() => { handleOpen() }}>
                                                انتخاب عکس
                                            </button>
                                        </div>


                                        <div className="w-100 d-flex ">
                                            {
                                                console.log(imageGeter)
                                            }
                                            {imageGeter && imageGeter.filter(item => ImageId.includes(item._id)).map((item, index) => {
                                                return (

                                                    <div key={index} className='d-flex flex-col justify-center align-center' style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '15px', padding: '10px' }} >
                                                        <img src={item.url} alt="" width="120px" height="120px" />
                                                        <div>
                                                            <button onClick={() => delHandlerImage(item._id)} style={{ backgroundColor: '#f40', padding: '3px', margin: '2px', borderRadius: '10px' }}>
                                                                <i class='bx bx-trash-alt'></i>
                                                            </button>
                                                            {item.name}
                                                        </div>
                                                    </div>

                                                )
                                            }) 
                                                        }
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="d-flex justify-between">
                        <div className="card" style={{ width: '49%' }}>
                            <label > برچسب ها  </label>
                            {/* {
                                    console.log(Tags.filter(item => Detail.hashtags.includes(item.id)))
                                } */}
                            <Autocomplete
                                multiple
                                size="small"
                                disablePortal
                                id="combo-tags"
                                value={Tags.filter(item => Detail.hashtags.includes(item.id))}
                                options={Tags}
                                onChange={(event, value) => {
                                    setDetail(prev => ({
                                        name: prev.name,
                                        abstract: prev.abstract,
                                        description: prev.description,
                                        basePrice: prev.basePrice,
                                        hashtags: value.map(item => item.id),
                                        images: prev.images,
                                        brand: prev.brand,
                                        stock: prev.stock,
                                        size: prev.size,
                                        isDisable: prev.isDisable,
                                        categoryId: prev.categoryId
                                    }))
                                }}
                                sx={{ width: '100%', backgroundColor: 'var(--second-bg)', color: 'var(--txt-color)', marginTop: '10px' }}
                                renderInput={(params) => <TextField label="Filled" variant="filled" {...params} sx={{ border: '0px', backgroundColor: 'var(--second-bg)', color: 'var(--txt-color)' }} label=" " />}
                            />
                        </div>
                        <div className=" card" style={{ width: '49%' }} >
                            <label > دسته بندی  </label>
                            <input type="text" placeholder="جستجو..." className="form-control" onChange={(e) => handleSearchCategory(e)} />
                            <List dense sx={{ width: '100%', bgcolor: 'var(--second-bg)', marginTop: '10px', borderRadius: '10px', overflow: 'auto', maxHeight: '200px', }}>


                                {
                                    SearchCategory === null ? (
                                        <>
                                            <div className="d-flex justify-center align-center flex-col " >
                                                <BeatLoader color={'#a1a1a1'} size={10} />
                                                در حال بارگذاری
                                            </div>
                                        </>
                                    ) : SearchCategory.length === 0 ? (
                                        <>
                                            <div className="d-flex justify-center align-center flex-col " >
                                                دسته بندی موجود نیست
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                {SearchCategory.map((item) => {

                                                    return (
                                                        <ListItem
                                                            key={item._id}
                                                            secondaryAction={
                                                                <Checkbox
                                                                    style={{ color: 'var(--main-color)' }}
                                                                    edge="end"
                                                                    onChange={handleToggleCategory(item._id)}
                                                                    checked={checkedCategory.indexOf(item._id) !== -1}
                                                                    inputProps={{ 'aria-labelledby': item._id }}
                                                                />
                                                            }
                                                            disablePadding
                                                        >
                                                            <ListItemButton>
                                                                <ListItemText id={item._id} primary={item.name} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    );
                                                })}
                                            </>
                                        )}
                            </List>
                        </div>
                        <div className="card w-50 col-6 col-md-12"  >
                            <label >قیمت  (تومان)   </label>
                            <input type="number" placeholder="قیمت" style={{ marginBottom: '10px' }} id="baseprice" value={Detail.basePrice} onChange={handleChangeDetailProduct} className="form-control w-100" />
                            <label > تعداد موجودی  </label>
                            <input type="number" placeholder="تعداد" id="stock" value={Detail.stock} style={{ marginBottom: '10px' }} onChange={(e) => handleChangeDetailProduct(e)} className="form-control w-100" />
                            <div className="d-flex" style={{ alignItems: 'center' }} >
                                <label > وضعیت  </label>
                                <Switch
                                    checked={Detail.isDisable}
                                    id="isDisable"
                                    onChange={handleChangeDetailProduct}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <div className="d-flex" style={{ alignItems: 'center' }} >
                                    <Tooltip title="  وضعیت موجودی یا ناموجودی محصول را تعیین کنید. " arrow>
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Tooltip>
                                </div>
                            </div>

                        </div>
                        <div className=" card" style={{ width: '49%' }} >
                            <label > برند  </label>
                            <input type="text" placeholder="جستجو..." className="form-control" onChange={(e) => handleSearchBrands(e)} />
                            <List dense sx={{ width: '100%', bgcolor: 'var(--second-bg)', marginTop: '10px', borderRadius: '10px', overflow: 'auto', maxHeight: '200px', }}>
                                {
                                    SearchBrands === null ? (
                                        <>
                                            <div className="d-flex justify-center align-center flex-col " >
                                                <BeatLoader color={'#a1a1a1'} size={10} />
                                                در حال بارگذاری
                                            </div>
                                        </>
                                    ) : SearchBrands.length === 0 ? (
                                        <>
                                            <div className="d-flex justify-center align-center flex-col " >
                                                برندی موجود نیست
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <RadioGroup
                                                    name="radio-buttons-group-brand"

                                                >
                                                    {SearchBrands.map((item, index) => {
                                                        return (
                                                            <FormControlLabel key={index} onChange={handleToggleBrands(item._id)} checked={Detail.brand === item._id ? true : false} value={item._id} control={<Radio style={{ color: 'var(--main-color)' }} />} label={item.name} />
                                                        );
                                                    })}

                                                </RadioGroup>
                                            </>
                                        )}
                            </List>
                        </div>
                        <div className=" card" style={{ width: '49%' }} >
                            <label > سایز  </label>
                            <input type="text" placeholder="جستجو..." className="form-control" onChange={(e) => handleSearchSize(e)} />
                            <List dense sx={{ width: '100%', bgcolor: 'var(--second-bg)', marginTop: '10px', borderRadius: '10px', overflow: 'auto', maxHeight: '200px', }}>


                                {
                                    SearchSize === null ? (
                                        <>
                                            <div className="d-flex justify-center align-center flex-col " >
                                                <BeatLoader color={'#a1a1a1'} size={10} />
                                                در حال بارگذاری
                                            </div>
                                        </>
                                    ) : SearchSize.length === 0 ? (
                                        <>
                                            <div className="d-flex justify-center align-center flex-col " >
                                                سایزی موجود نیست
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                {SearchSize.map((item) => {

                                                    return (
                                                        <ListItem
                                                            key={item._id}
                                                            secondaryAction={
                                                                <Checkbox
                                                                    style={{ color: 'var(--main-color)' }}
                                                                    edge="end"
                                                                    onChange={handleToggleSize(item._id)}
                                                                    checked={checkedSize.indexOf(item._id) !== -1}
                                                                    inputProps={{ 'aria-labelledby': item._id }}
                                                                />
                                                            }
                                                            disablePadding
                                                        >
                                                            <ListItemButton>
                                                                <ListItemText id={item._id} primary={item.name} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    );
                                                })}
                                            </>
                                        )}
                            </List>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <div style={style}>
                    <GalleryModal data={handleImage} />
                </div>
            </Modal>
        </div>
    )
}

export default AddProduct