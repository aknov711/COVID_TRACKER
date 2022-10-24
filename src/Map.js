import React from 'react'
import './Map.css'
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import { ShowDataonMap } from './util';
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
        <ShowDataonMap data={countries} casesType={casesType} />
      </LeafletMap>
    </div>
  )
}

export default Map
