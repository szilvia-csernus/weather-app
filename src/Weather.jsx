import React from 'react';

const toQueryString = (obj) => {
    const parts = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
        }
    }
    return parts.join('&');
}

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
        };
        this.loadWeather = this.loadWeather.bind(this);
    }

    refresh() {
        console.log("refreshing!!!")
        this.loadWeather;
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.loadWeather);
    }


    loadWeather(location) {
        let url = 'http://api.openweathermap.org/data/2.5/weather?';
        let params = {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
        };
        url += toQueryString(params);
        url += '&units=metric'
        const apiKey = 'ba68169abc3d2e474681a3c7f6926179';
        url += `&APPID=${apiKey}&lang=en`;


        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
            //ready state of DONE means this is complete
            if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
                const data = JSON.parse(xmlhttp.responseText);
                this.setState({ weather: data });
            }
        };

        xmlhttp.open('GET', url, true);
        xmlhttp.send();

    }


    render() {
        let content = <div></div>;
        if (this.props.timeToRefresh) {
            this.refresh();
        }
        if (this.state.weather) {
            const weather = this.state.weather;
            console.log(weather);
            console.log(weather.weather[0].icon);
            const temp = weather.main.temp;
            const tempMin = weather.main.temp_min;
            const tempMax = weather.main.temp_max;
            const humidity = weather.main.humidity;
            const description = weather.weather[0].main;
            const icon = weather.weather[0].icon;
            content = <div>
                <div className="city">{weather.name}</div>
                <div className="temp">{temp.toFixed(1)}&#176;</div>
                <div className="weather-description">
                    <p>{description}</p>
                    <p>H: {tempMax}&#176;  L: {tempMin}&#176;</p>
                    <p>Humidity: {humidity} %</p>
                </div>
            </div>;
        } else {
            content = <div className='loading'>Loading weather...</div>;
        }
        return (
            <div className="weather">
                {content}
            </div>
        )
    }
}

export default Weather

