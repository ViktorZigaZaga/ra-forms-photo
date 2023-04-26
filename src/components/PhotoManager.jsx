import React, { useState } from 'react';
import Photo from './Photo';

function PhotoManager() {

    const [photoList, setPhotoList] = useState([]);

    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
        
            fileReader.addEventListener('load', evt => {
                resolve(evt.currentTarget.result);
            });
          
            fileReader.addEventListener('error', evt => {
                reject(new Error(evt.currentTarget.error));
            });
          
            fileReader.readAsDataURL(file);
        });
    };
      
    const handleSelect = async (evt) => {
        const files = [...evt.target.files];
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        console.log(urls);
        // У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img
        setPhotoList([...photoList, ...urls.map((url, i) => ({url: url, id: (Date.now() + i)}))]);
    };

    const onDelete = (id) => {
        setPhotoList(photoList.filter(photo => photo.id !== id));
    };

    return (
        <div className='photo-manager'>
            <form>
                <div>
                    <label className='manager-label' for="file">Click to select</label>
                    <input className='manager-input' type='file' id="file" onChange={handleSelect} multiple />
                </div>
            </form>
            {photoList.map((photo) => <Photo key={photo.id} photo={photo} onDelete={onDelete} />)}
        </div>
    );
}

export default PhotoManager