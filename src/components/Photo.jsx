import React from "react";
import PropTypes from 'prop-types'


function Photo({photo, onDelete}) {

    return (
        <div className="photo">
            <img src={photo.url}/>
            <button onClick={() => onDelete(photo.id)}>&#10060;</button>
        </div>
    );
}

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default Photo