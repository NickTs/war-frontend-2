import React from 'react';

const imgWithClick = {cursor: 'pointer'};

const PhotoUserValues = ({index, onClick, photo, margin, direction, top, left}) => {
    const imgStyle = {margin: margin};
    if (direction === 'column') {
        imgStyle.position = 'absolute';
        imgStyle.left = left;
        imgStyle.top = top;
    }

    const handleClick = event => {
        onClick(event, {photo, index});
    };

    return (
        <div style={{position: 'absolute', margin: margin-15, padding: 15, left: left, top: top, width: photo.width, height: photo.height, margin: margin, backgroundColor: '#FFFFFF'}}>
            <a href={photo.goto}>
            <img  style={onClick ? {cursor: 'pointer'} : {}}
                  src={photo.src} width={photo.width} height={photo.height - 60}

            />
            </a>
            <div style={{position: 'absolute', left: 0+15, top: photo.height - 60+15, width: photo.width, height: 60, overflow: 'hidden'}}>
                <table><tbody>
                <tr><td style={{fontSize: '16px', whiteSpace: 'nowrap'}}>{photo.title}</td></tr>
                <tr><td style={{fontSize: '16px', whiteSpace: 'nowrap', color: '#B9B9B9'}}>{photo.author}</td></tr>
                </tbody></table>
            </div>
        </div>
    );
};

export default PhotoUserValues;