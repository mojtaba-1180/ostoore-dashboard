import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './Accordion.css'

const Accordion = props => {

    const [clicked, setClicked] = useState(false)
    const [clickedChild, setClickedChild] = useState(false)
    const toggle = index => {
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }
    const toggleChild = index => {
        if (clickedChild === index) {
            return setClickedChild(null)
        }
        setClickedChild(index)
        console.log('click' + index)
    }
    return (
        <>
            <div className="panel">
                <div className={`panel_title ${clicked === props.id ? 'active' : ''} `} >
                    <span>
                        <span className="btn_toggle" onClick={() => toggle(props.id)}>
                            {
                                clicked === props.id ? (<i className='bx bx-minus' ></i>) : (<i className='bx bx-plus' ></i>)
                            }
                        </span>
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
                        <button className="panel_item_button" >
                            <i className='bx bx-edit panel_item_button_edit' ></i>
                        </button>
                        <button className="panel_item_button" >
                            <i className='bx bx-trash panel_item_button_trash' ></i>
                        </button>
                    </span>
                </div>
                <hr className={`panel_title_line ${clicked === props.id ? 'active' : ''} `} />
                {clicked === props.id ? (
                    <div className={`panel_body`}>
                        {
                            props.body.map((item, index) => (
                                <React.Fragment key={index}>
                                    {
                                        item.ancestors ? (
                                            <div key={index} className="panel_body_item_ancestors" >
                                                <div className="panel_title_ancestors" >
                                                    <span>
                                                        <span className="btn_toggle" onClick={() => toggleChild(index)} >
                                                            {
                                                                clickedChild === index ? (<i className='bx bx-minus' ></i>) : (<i className='bx bx-plus' ></i>)
                                                            }
                                                        </span>
                                                        <span>
                                                            {item.name}
                                                        </span>
                                                    </span>
                                                    <span>
                                                        {item.slug}
                                                    </span>
                                                    <span>
                                                        {item.slug}
                                                    </span>
                                                    <span>
                                                        <button className="panel_item_button" >
                                                            <i className='bx bx-edit panel_item_button_edit' ></i>
                                                        </button>
                                                        <button className="panel_item_button" >
                                                            <i className='bx bx-trash panel_item_button_trash' ></i>
                                                        </button>
                                                    </span>
                                                </div>
                                                {
                                                    clickedChild === index ? (
                                                        <div className="panel_body_ancestors ">
                                                    {
                                                        item.ancestors.map((item, index) => (
                                                            <div className="panel_body_ancestors_item" key={index}>
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                                <span>
                                                                    {item.slug}
                                                                </span>
                                                               
                                                                <span>
                                                                    <button className="panel_item_button" >
                                                                        <i className='bx bx-edit panel_item_button_edit' ></i>
                                                                    </button>
                                                                    <button className="panel_item_button" >
                                                                        <i className='bx bx-trash panel_item_button_trash' ></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                    ) : null
                                                }
                                                
                                            </div>
                                        ) : (
                                            <div key={index} className="panel_body_item" >

                                                <span>
                                                    {item.name}
                                                </span>
                                                <span>
                                                    {item.slug}
                                                </span>
                                                <span>
                                                    {item.slug}
                                                </span>
                                                <span>
                                                    <button className="panel_item_button" >
                                                        <i className='bx bx-edit panel_item_button_edit' ></i>
                                                    </button>
                                                    <button className="panel_item_button" >
                                                        <i className='bx bx-trash panel_item_button_trash' ></i>
                                                    </button>
                                                </span>
                                            </div>
                                        )
                                    }
                                </React.Fragment>
                            ))
                        }
                    </div>
                ) : null

                }

            </div>
        </>
    )
}

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array,
    slug: PropTypes.string,
    id: PropTypes.any
}

export default Accordion
