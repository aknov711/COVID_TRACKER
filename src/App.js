import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import './table.css'
/*
  https://disease.sh/v3/covid-19/countries
*/
import Infobox from './Infobox'


function App() {
  const [countries, setcountries] = useState([
  ]);
   
  const [country,setcountry]=useState('worldwide');

  const [CountryInfo,setcountryInfo]=useState({});
  const [tabledata,settabledata]=useState([]);

  const [mapcenter, setmapcenter] = useState({ lat: 34.0746, lng: 40.4796 });
  const [mapzoom,setmapzoom]=useState(3);
  const [lat,setlat]=useState(34.056)
  const [lng,setlng]=useState(89.890)
  const [mapcountry,setmapcountry]=useState([]);
  const [casesType,setCasesType]=useState("cases");

  const[prevlat,setPrevlat]=useState({ lat: 34.0746, lng: 40.4796 });
  

  useEffect(()=>{
     fetch('https://disease.sh/v3/covid-19/all')
     .then((response)=>response.json())
     .then((data)=>{
       setcountryInfo(data);
     })
  },[]);
  


  useEffect(
    () => {
      const getCountries = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
          .then((data) => {
            const countries = data.map((country) => (
              {
                name: country.country,
                value: country.countryInfo.iso2
              }
            ))
            const sortedData=sortData(data);

            settabledata(sortedData);
            setcountries(countries);
            setmapcountry(data)
          })
      }
      getCountries();
    }, []
  )

 

  const onCountryChange=async (event)=>{
    const countrycode=event.target.value;
      setcountry(countrycode);

      const url=
      countrycode==='worldwide'?'https://disease.sh/v3/covid-19/all':
      `https://disease.sh/v3/covid-19/countries/${countrycode}`;

      await fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
        
        setlat(data.countryInfo.lat);
        setlng(data.countryInfo.long);
        setcountry(countrycode);
        setcountryInfo(data);
        setmapzoom(7);
       
       
      });

   

  };

  

  return (
    <div className="app">
    <div className="app_left">
    <div className="app_header">
        <h1 style={{color:'tomato'}}>Welocome to COVID-19 Tracker</h1>
        <FormControl className="app_dropdown" style={{backgroundColor:'grey'}}>
          <Select 
          onChange={onCountryChange}
          variant="outlined" value={country } style={{color:'white'}}  >
            
             
             <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app_stats">
        <Infobox title="Corona Virus Cases" cases={CountryInfo.todayCases} total={CountryInfo.cases}></Infobox>
        <Infobox title="Recovered" cases={CountryInfo.todayRecovered} total={CountryInfo.recovered}></Infobox>
        <Infobox title="Deaths" cases={CountryInfo.deaths} total={CountryInfo.deaths}></Infobox>
      </div>
    

      
      <Map 

        
        countries={mapcountry}
        casesType={casesType}
         center={{lat:lat,lng:lng}}
       
         zoom={mapzoom}
       />
      
       
    </div>

    <Card className="app_right">
          <CardContent>
            <h3>
              Live Cases in Country
            </h3>
            <Table style={{height:'400px'}}countries={tabledata}></Table>
            <h3>
              Worldwide new Cases
            </h3>
         
             <LineGraph casesType='cases'/> 
          </CardContent>
    </Card>
    
    </div>
  );
}

export default App;
