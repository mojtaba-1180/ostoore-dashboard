import React from 'react'
import PropTypes from 'prop-types'
import './ListingItem.css'
const ListingItem = props => {

    return (
        <div id={props.id} className={`item ${props.active ? 'active' : ''}`} onClick={props.onClick} >
            <div>
            <i className={props.icon}></i>
            <label> {props.title} </label>
            </div>
            <span className="badge rouded">{props.number}</span>
        </div>
    )
}

ListingItem.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number,
    icon: PropTypes.string,
    active: PropTypes.bool,
    id: PropTypes.number
}

export default ListingItem
