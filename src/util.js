import React from 'react'
import {Circle,Popup} from 'react-leaflet'
import numeral from 'numeral'
import { red } from '@material-ui/core/colors';

const casesTypeColors = {
     cases: {
       hex: 'blue',
        multiplier: 100,
     },
     recovered: {
       hex: 'green',
       multiplier: 420,
     },
     deaths: {
       hex: 'red',
        multiplier: 600,
     },
   };



export const sortData =function(data){
     const sortedData=data;
     
     return sortedData.sort((a,b)=>(a.cases>b.cases)?-1:1);
};



export const ShowDataonMap=({ data, casesType })=>{
    console.log("casesType", data, casesType, casesTypeColors[casesType]?.hex)
    if(!data) {
      return null;
    }
    return data?.map((country)=>(
       <Circle
         center={[country.countryInfo.lat,country.countryInfo.long]}
         pathOptions={{
          color: casesTypeColors[casesType].hex,
          fillColor: casesTypeColors[casesType].hex
          }}
         fillOpacity={0.4}
         casesType={casesType}
         radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
       >
         <Popup>
         <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
         </Popup>
       </Circle>
    ))
    }
