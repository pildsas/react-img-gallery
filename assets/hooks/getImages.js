import React from 'react';
import axios from 'axios';

export const getImages = async (page = 1) => {

    const res = await axios.get(`http://127.0.0.1:8000/gallery?page=${page}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
};
