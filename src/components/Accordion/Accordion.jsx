import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'



import './Accordion.css'
const Accordion = props => {
    const history = useHistory();

    const [clicked, setClicked] = useState(false)
    const toggle = index => {
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }
    const handleEdit = item => {
        console.log(item)
        history.push({
            pathname: `/categories/edit/${item}`
        })
    }
    const handleTrash = id => {
        alert('click' + id)
    }
    // console.log(props.location)
    return (
        <>
            <div className="panel">
                <div className={`panel_title ${clicked === props.id ? 'active' : ''} `} >
                    <span>
                        <span>
                            {props.title}
                        </span>
                    </span>
                    <span>
                        {props.title}
                    </span>
                    <span>
                        {props.title}
                    </span>
                    <span>
                        <button className="panel_item_button" onClick={() => handleEdit(props.id)} >
                            <i className='bx bx-edit panel_item_button_edit' ></i>
                        </button>
                        <button className="panel_item_button" onClick={() => handleTrash(props.id)} >
                            <i className='bx bx-trash panel_item_button_trash' ></i>
                        </button>
                        {
                            props.body ? (
                                <span className="btn_toggle" onClick={() => toggle(props.id)}>
                                    <Link to={{
                                        pathname: `${props.slug}/${props.title}`,
                                        state: props.body,
                                        old: {
                                            title: props.title
                                        }
                                    }}>

                                        {
                                            clicked === props.id ? (<i className='bx bx-chevron-right'></i>) : (<i className='bx bx-chevron-left'></i>)
                                        }
                                    </Link>
                                </span>
                            ) :
                                null
                        }

                    </span>
                </div>
                {/* <hr className={`panel_title_line ${clicked === props.id ? 'active' : ''} `} /> */}
            </div>

        </>
    )
}

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array,
    data: PropTypes.array,
    slug: PropTypes.string,
    id: PropTypes.number,

}

export default Accordion
