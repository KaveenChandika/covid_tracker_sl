import React, { useEffect, useState } from 'react';
import {FormControl,MenuItem,Select} from "@material-ui/core";
import './Feed.css';
import InfoBox from './InfoBox';
import { Pie ,Bar } from 'react-chartjs-2';
import Aos from 'aos';
import 'aos/dist/aos.css';
function Feed() {
    const [countryInfo,setCountryInfo] = useState([]);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfoGlo,setCountryInfoGlo] = useState([]);
    const [countryName, setCountryName] = useState("WorldWide");


    useEffect(()=>{
        const getCountries = async () =>{
            await fetch('https://disease.sh/v3/covid-19/countries')
            .then((res) => res.json())
            .then((data) =>{
               const countries = data.map((country) =>({
                   name:country.country,
                   value:country.countryInfo.iso2
               }));
               setCountries(countries);
            })
        }
        
        getCountries();
    })

    useEffect(() =>{
        Aos.init({duration:2000});
    });

    useEffect(()=>{
        const getCountryData = async () =>{
            await fetch("https://disease.sh/v3/covid-19/countries/LK")
            .then((res) => res.json())
            .then((data) =>{
                setCountryInfo(data);
            })
        }
        getCountryData();
    },[setCountryInfo]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
          .then((res) => res.json())
          .then((data) => {
            setCountryInfoGlo(data);
          });
      });

    const onCountryChange = async (event) =>{
        const countryCode = event.target.value;
        setCountry(countryCode);

        const url = 
            countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all": `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            setCountry(countryCode);
            setCountryInfoGlo(data);
            setCountryName(data.country);
        });
    }

    const dataBar = {
        labels: [ 'Today Cases',
                    'Today Recovered',
                    'Today Deaths'],
        datasets: [
          {
            label: [],
            backgroundColor: [ 'red','skyblue','blue'],
            borderColor:[ 'red','skyblue','blue'],
            borderWidth: 1,
            hoverBackgroundColor: [ 'red','skyblue','blue'],
            hoverBorderColor: [ 'red','skyblue','blue'],
            data: [countryInfoGlo.todayCases, countryInfoGlo.todayRecovered, countryInfoGlo.todayDeaths],
            displayName: 'DoughnutExample',
          }
        ]
      };

    return (
        <div className="feed">
            <div className="feed__left">
                <h2>Sri Lanka</h2>
                <div data-aos="fade-right" className="feed__left__card_sl">
                    <InfoBox 
                        title="Virus Cases"
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                        css="_red"
                    />
                    <InfoBox 
                        title="Recoverd"
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                        css="_skyblue"
                    />
                    <InfoBox 
                        title="Deaths"
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                        css="_blue"

                    />
                </div>
                <h2>World Wide</h2>

                <FormControl className="app__dropdown">
                    <Select
                        variant="outlined"
                        size="small"
                        onChange={onCountryChange}
                        value={country}
                    >
                    <MenuItem value="worldwide">Worlwide</MenuItem>
                        {countries.map((country) => (
                            <MenuItem value={country.value}>{country.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <div className="feed__left__card_global">
                    <InfoBox 
                        title="Virus Cases"
                        cases={countryInfoGlo.todayCases}
                        total={countryInfoGlo.cases}
                        css="_red"
                    />
                    <InfoBox 
                        title="Recoverd"
                        cases={countryInfoGlo.todayRecovered}
                        total={countryInfoGlo.recovered}
                        css="_skyblue"
                    />
                    <InfoBox 
                        title="Deaths"
                        cases={countryInfoGlo.todayDeaths}
                        total={countryInfoGlo.deaths}
                        css="_blue"

                    />
                </div>
            </div>
            <div className="feed__right">
                {/* <div  data-aos="fade-left" className="feed__pie">
                    <Pie 
                        data={data}
                        width={100}
                        height={90}
                    />
                </div> */}
                <h2>Covid-19 Summary In {countryName} </h2>
                <div data-aos="fade-up" className="feed__bar">
                    <Bar
                        data={dataBar}
                        width={100}
                        height={150}
                        options={{
                            maintainAspectRatio: false
                         }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Feed
