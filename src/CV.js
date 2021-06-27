import React from 'react'
import { useMap } from 'react-leaflet';

function CV({center,zoom}) {
    console.log(center);
    console.log(zoom)

    const map=useMap();
    map.setView(center,zoom);

    return null;
}

export default CV
