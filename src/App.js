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
  const [lat,setlat]=useState(34.0746)
  const [lng,setlng]=useState(40.4796)

  const [plat,setplat]=useState(null)
  const [plng,setplng]=useState(null)

  const [mapcountry,setmapcountry]=useState([]);
  const [casesType,setCasesType]=useState("cases");
  const [bool,setbool]=useState(0);
  const [isRed,setIsRed]=useState(true);
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

  const gooo=()=>{
    setplng(lng);
    setplat(lat);
  }

 

  const onCountryChange=async (event)=>{
    const countrycode=event.target.value;
      setcountry(countrycode);

      const url=
      countrycode==='worldwide'?'https://disease.sh/v3/covid-19/all':
      `https://disease.sh/v3/covid-19/countries/${countrycode}`;

      await fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
       
        setmapcenter({lat:data.countryInfo.lat,lng:data.countryInfo.long})
        setcountry(countrycode);
        setcountryInfo(data);
        setmapzoom(4);
       
       
      });

   

  };

  

  return (
    <div className="app">
     
    <div className="app_left">
    <div className="app_header">
    <changeMapView></changeMapView>
        <h1 style={{color:'black'}}>Welocome to COVID-19 Tracker</h1>
        <FormControl className="app_dropdown" style={{backgroundColor:'white'}}>
          <Select 
          onChange={onCountryChange}
          variant="outlined" value={country } style={{color:'black',fontWeight:'bold'}}  >
            
             
             <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <Infobox  onClick={(e) => {setCasesType("cases");
        setIsRed(true);}} title="Corona Virus Cases" 
          isRed = {isRed}
          casesType={casesType}
          color={"blue"}
          active={casesType==='cases'}
        cases={CountryInfo.todayCases} total={CountryInfo.cases}></Infobox>

        <Infobox onClick={(e) => {setCasesType("recovered");
        console.log( casesType);
        setIsRed(false);}} title="Recovered"  isRed= {isRed} cases={CountryInfo.todayRecovered} 
          active={casesType==='recovered'}
          casesType={casesType}
          color={"green"}
        total={CountryInfo.recovered}></Infobox>
        <Infobox onClick={(e) => setCasesType("deaths")} title="Deaths" cases={CountryInfo.deaths}
            active={casesType==='deaths'}
            casesType={casesType}
            color={"red"}
         total={CountryInfo.deaths}></Infobox>
      </div>

     
    
   
      <Map 

        
countries={mapcountry}
casesType={casesType}

  center={mapcenter}
 


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
              Worldwide new {casesType}
            </h3>
         
             <LineGraph casesType={casesType}/> 
          </CardContent>
    </Card>
    
    </div>
  );
}

export default App;
