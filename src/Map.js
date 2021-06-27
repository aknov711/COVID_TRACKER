import React from 'react'
import './Map.css'
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import { showDataonMap } from './util';
import CV from './CV'

function Map({countries,casesType,center,zoom}) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
      <CV center={center} zoom={zoom}/>
      <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataonMap(countries,casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map
