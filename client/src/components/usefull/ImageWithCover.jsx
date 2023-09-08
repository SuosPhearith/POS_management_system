import React from 'react';
import { Image } from 'antd';
import ImageNotFound from '../../images/image2.jpg';
const imageUrl = process.env.REACT_APP_IMAGE_URL;

const ImageWithCover = ({ src, alt }) => {
    let picture = imageUrl;
    if (src === "" || src === null) {
        picture = ImageNotFound;
    }else{
        picture = picture + src;
    }
    const containerStyle = {
        width: '50px', // Set the desired width
        height: '60px', // Set the desired height
        border: '1px solid #ccc',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const imageStyle = {
        width: '100%', // Set the image width to fill the container
        height: '100%', // Set the image height to fill the container
        objectFit: 'cover', // Make the image fit while maintaining its aspect ratio
    };

    return (
        <div style={containerStyle}>
            <Image src={picture} alt={alt} style={imageStyle} />
        </div>
    );
};

export default ImageWithCover;
