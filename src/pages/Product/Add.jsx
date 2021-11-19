import { useState, useLayoutEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import Api from '../../util/AxiosConfig'
//Editor Required File
import JoditEditor from "jodit-react";
import { useHistory } from 'react-router'
import { ImgBase64 } from '../../util/imgBase64'


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
import { Modal } from '@mui/material'
import GalleryModal from '../../components/Gallery/gallery'
// tabs components
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Product.css'

// list Tree category 
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';



const AddProduct = () => {
    // Editor State
    const editor = useRef(null)
    const editordescription = useRef(null)
    const [Abstract, setAbstract] = useState('')
    const [Description, setDescription] = useState('')

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    // Base State
    const history = useHistory();
    const [Detail, setDetail] = useState({
        name: '',
        abstract: '',
        description: '',
        basePrice: '',
        hashtags: '',
        images: '',
        brand: '',
        stock: true,
        isDisable: false,
        categoryId: '',
    })
    const [Category, setCategory] = useState(null)
    const [Brands, setBrands] = useState(null)
    const [SearchCategory, setSearchCategory] = useState(Category)
    const [SearchBrands, setSearchBrands] = useState(Brands)
    const [Tags, setTags] = useState([])
    const [checked, setChecked] = useState([]);
    const [Image, setImage] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Products Tabs components 

    const [value, setValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    // Geting Data 
    useLayoutEffect(() => {
        let isCancelled = false
        if (!isCancelled) {
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
        } else {
            console.log('close')
        }
        return () => {
            isCancelled = true
        }
    }, [])
    const updateHandler = () => {
        if (Detail.name === '') {
            Swal.fire({
                icon: 'error',
                title: '  لطفا نام محصول را وارد کنید!!!  '
            })
        } else {
            console.log('chnages')
            Api.post('/product', Detail).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: ' محصول شما اضافه شد  ',
                })
                history.push('/products')
            })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'مشکلی پیش آمده است',
                        text: 'لطفا برسی کنید با سازنده سایت تماس برقرار کنید'
                    })
                    console.log(err)
                })

        }
    }
   
    const handleToggle = (value) => () => {
        console.log(value)

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
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
    const handleImage = (e) => {
        setOpen(false)
        setImage(e)
        setDetail((prev) => ({
            name: prev.name,
            abstract: prev.abstract ,
            description: prev.description,
            basePrice: prev.basePrice,
            hashtags: prev.hashtags,
            images: e._id,
            brand: prev.brand,
            stock: prev.stock,
            isDisable: prev.isDisable,
            categoryId: prev.categoryId,
        }))

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '70vh',
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

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <div>
            {
                console.log(checked)
            }
            <h2 className="page-header top-sticky">
                <div className="d-flex justify-between align-center">
                    <span className="animate">
                        افزودن محصول
                    </span>
                    <span>
                        <button className="button bg-sucess" onClick={() => updateHandler()} >
                            ذخیره
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
                            <input type="text" className="form-control" name="title" value={Detail.name}
                            
                            onChange={(e) => setDetail((prev) => ({
                                name: e.target.value,
                                abstract: prev.abstract,
                                description: prev.description,
                                basePrice: prev.basePrice,
                                hashtags: prev.hashtags,
                                images: prev.images,
                                brand: prev.brand,
                                stock: prev.stock,
                                isDisable: prev.isDisable,
                                categoryId: prev.categoryId,
                            }))} />
                            <br />
                            <br />
                            <span className="d-flex justify-between">
                                {/* <label> لینک محصول  :</label> */}
                                {/* <a href={window.location.origin + '/' + state.detail.slug}>
                                        {window.location.origin + '/'} <span>{state.detail.slug}</span>
                                    </a> */}
                            </span>
                        </div>
                        <div className="card-body">
                            <span>
                                <label > توضیحات کوتاه محصول</label>
                                <br />
                            </span>

                            <JoditEditor
                                ref={editor}
                                value={Abstract}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={abstract => {
                                    setDetail((prev) => ({
                                        name: prev.name,
                                        abstract: abstract ,
                                        description: prev.description,
                                        basePrice: prev.basePrice,
                                        hashtags: prev.hashtags,
                                        images: prev.images,
                                        brand: prev.brand,
                                        stock: prev.stock,
                                        isDisable: prev.isDisable,
                                        categoryId: prev.categoryId,
                                    }))
                                    setAbstract(abstract)
                                 }} // preferred to use only this option to update the content for performance reasons
                                // onChange={() => {  }}
                            />
                            <br />
                            <span>
                                <label > توضیحات کامل محصول</label>
                                <br />
                            </span>
                            <br />
                            <JoditEditor
                                ref={editordescription}
                                value={Description}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={description => {
                                    setDetail((prev) => ({
                                        name: prev.name,
                                        abstract: prev.abstract ,
                                        description: description,
                                        basePrice: prev.basePrice,
                                        hashtags: prev.hashtags,
                                        images: prev.images,
                                        brand: prev.brand,
                                        stock: prev.stock,
                                        isDisable: prev.isDisable,
                                        categoryId: prev.categoryId,
                                    }))
                                    setDescription(description)
                                 }}
                                // onChange={newContent => { }}
                            />
                            <div className="d-flex justify-between w-100">
                                <div className="w-50" >
                                    <span>
                                        <br />
                                        <label > عکس محصول </label>
                                        <br />
                                    </span>

                                    <div className="upload_image d-flex">
                                        <div className="w-50" >
                                            <button className="button " onClick={() => { handleOpen() }}>
                                                انتخاب عکس
                                            </button>
                                            <button className="button bg-danger" onClick={() => { setImage(null) }}>
                                                حذف عکس
                                            </button>
                                        </div>
                                        <div className="w-50 d-flex justify-center align-center">
                                            <img src={Image ? Image.url : ''} alt="" width="100%" />
                                            {Image ? Image.name : ''}
                                        </div>


                                    </div>

                                </div>

                                {/* <div className="w-50" >
                                    <span>
                                        <br />
                                        <label > گالری محصول </label>
                                        <br />
                                    </span>
                                    <div className="upload_image">
                                        <div className="w-50">
                                            <button className="button " onClick={() => { document.getElementById('images').click() }}>
                                                انتخاب عکس
                                            </button>
                                            <button className="button bg-danger" onClick={() => { setDetail({ img: '' }) }}>
                                                حذف عکس
                                            </button>
                                        </div>
                                        <div className="w-50 d-flex justify-center align-center">
                                            <input type="file" className="d-none" id="images" name="ProductImage" onChange={(e) => changeHandler(e)} />
                                            <img src={Detail.img} alt="" width="100%" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                    </div>

                    <div className="d-flex justify-between">
                        <div className="card" style={{ width: '49%' }}>
                            <label > برچسب ها  </label>

                            <Autocomplete
                                multiple
                                size="small"
                                disablePortal
                                id="combo-tags"
                                options={Tags}
                                onChange={(event, value) => {
                                    setDetail((prev) => ({
                                        name: prev.name,
                                        abstract: prev.abstract ,
                                        description: prev.description,
                                        basePrice: prev.basePrice,
                                        hashtags: value,
                                        images: prev.images,
                                        brand: prev.brand,
                                        stock: prev.stock,
                                        isDisable: prev.isDisable,
                                        categoryId: prev.categoryId,
                                    }))
                                }}
                                sx={{ width: '100%', backgroundColor: 'var(--second-bg)', color: 'var(--txt-color)', marginTop: '10px' }}
                                renderInput={(params) => <TextField label="Filled" variant="filled" {...params} sx={{ border: '0px', backgroundColor: 'var(--second-bg)', color: 'var(--txt-color)' }} label=" " />}
                            />

                        </div>
                        <div className=" card" style={{ width: '49%' }} >
                            <label > دسته بندی ها   </label>
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
                                                                    onChange={handleToggle(item._id)}
                                                                    checked={checked.indexOf(item._id) !== -1}
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

                            {/* <TreeView
                                aria-label="file system navigator"
                                defaultCollapseIcon={<i className="bx bx-arrow-to-bottom" ></i>}
                                defaultExpandIcon={<i className="bx bx-arrow-to-left" ></i>}
                                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                            >
                                <TreeItem nodeId="1" label="Applications">
                                    <TreeItem nodeId="2" label="Calendar" />
                                </TreeItem>
                                <TreeItem nodeId="5" label="Documents">
                                    <TreeItem nodeId="10" label="OSS" />
                                    <TreeItem nodeId="6" label="MUI">
                                        <TreeItem nodeId="8" label="index.js" />
                                    </TreeItem>
                                </TreeItem>
                            </TreeView> */}
                        </div>
                        <div className="card w-50 col-6 col-md-12"  >
                            <Box
                                sx={{ flexGrow: 1, bgcolor: 'var(--main-bg)', color: 'var(--text-color)', display: 'flex', height: 224 }}
                            >
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={value}
                                    // indicatorColor="primary"
                                    onChange={handleChangeTab}
                                    aria-label="Vertical tabs example"
                                    sx={{ borderRight: 1, borderColor: 'var(--second-bg)', color: 'var(--text-color)' }}
                                >
                                    <Tab label=" اطلاعات محصول" sx={{ color: 'var(--text-color)', fontFamily: 'IRANSans' }} selectionFollowsFocus  {...a11yProps(0)} />
                                    <Tab label=" موجودی محصول" sx={{ color: 'var(--text-color)', fontFamily: 'IRANSans' }} {...a11yProps(1)} />
                                </Tabs>
                                <TabPanel value={value} index={0}>
                                    <label >قیمت  (تومان)   </label>
                                    <input type="number" placeholder="قیمت" style={{ marginBottom: '10px' }} className="form-control w-100" />
                                    <label   > قیمت ویژه (تومان)  </label>
                                    <input type="number" placeholder="قیمت فروش ویژه" className="form-control w-100" />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <label > تعداد موجودی  </label>
                                    <input type="number" placeholder=" تعداد" style={{ marginBottom: '10px' }} className="form-control w-100" />
                                    <div>
                                    <label  >  موجودی  </label>
                                    <FormControlLabel style={{width: '50%'}}  control={<Checkbox defaultChecked />} label=" موجود" />
                                    </div>
                                    <div>
                                   <label >  غیر فعال/فعال  </label>
                                    <FormControlLabel style={{width: '50%'}}  control={<Checkbox  />} label=" غیر فعال" />
                                    </div>
                                </TabPanel>
                            </Box>

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
                                                {SearchBrands.map((item) => {

                                                    return (
                                                        <ListItem
                                                            key={item._id}
                                                            secondaryAction={
                                                                <Checkbox
                                                                    style={{ color: 'var(--main-color)' }}
                                                                    edge="end"
                                                                    onChange={handleToggle(item._id)}
                                                                    checked={checked.indexOf(item._id) !== -1}
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