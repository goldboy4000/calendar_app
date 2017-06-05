/**
 * Created by LaBestia on 02.06.2017.
 */

define(['EventManager'], function (eventManager)
{
    /**
     *
     * @param model
     * @constructor
     */
    function WeatherView(model)
    {
        /**
         *
         */
        this.model = model;

        /**
         *
         * @type {Element}
         */
        this.element = document.querySelector('#weather-box');

        this.init();
    }

    /**
     *
     */
    WeatherView.prototype.init = function ()
    {
        this.setupHandlers();
    };

    /**
     *
     */
    WeatherView.prototype.setupHandlers = function ()
    {
        this.element.addEventListener('click', this.clickHandler.bind(this));
    };

    /**
     *
     * @param jsonObj
     */
    WeatherView.prototype.render = function(jsonObj)
    {
        if (!jsonObj.list)
        {
            this.element.appendChild(this.renderForecast(this.getForecastObject(jsonObj)));
        }
        else
        {
            this.element.removeChild(this.element.querySelector('.media'));

            var today = new Date();
            var counter = 0;

            var forecastList = jsonObj.list;

            forecastList.forEach(function(forecast)
            {
                var forecastDate = new Date(forecast.dt_txt);
                if (today.getHours() > 12 && !counter)
                {
                    this.element.appendChild(this.renderForecast(this.getForecastObject(forecast)));
                    counter++;
                }
                if (forecastDate.getHours() === 12 && counter < 3)
                {
                    this.element.appendChild(this.renderForecast(this.getForecastObject(forecast)));
                    counter++;
                }
            }.bind(this));
        }
    };

    /**
     *
     * @param forecastObj
     * @returns {Element}
     */
    WeatherView.prototype.renderForecast = function(forecastObj)
    {
        // image
        var img = document.createElement('img');
        img.src = forecastObj.image;
        img.alt = 'Image';

        var image = document.createElement('figure');
        image.className = 'image is-64x64';
        image.appendChild(img);

        var imageContainer = document.createElement('div');
        imageContainer.className = 'media-left';
        imageContainer.appendChild(image);

        // content
        var temperature = document.createElement('span');
        temperature.innerHTML = forecastObj.temperature;

        var city = document.createElement('span');
        city.innerHTML = forecastObj.city;

        var description = document.createElement('span');
        description.innerHTML = forecastObj.description;

        var br = document.createElement('br');

        var text = document.createTextNode(' ');

        var content = document.createElement('div');
        content.className = 'content';
        content.appendChild(temperature);
        content.appendChild(text);
        content.appendChild(city);
        content.appendChild(br);
        content.appendChild(description);

        var contentContainer = document.createElement('div');
        contentContainer.className = 'media-content';
        contentContainer.appendChild(content);

        // article
        var forecastArticle = document.createElement('article');
        forecastArticle.className = 'media';
        forecastArticle.appendChild(imageContainer);
        forecastArticle.appendChild(contentContainer);

        return forecastArticle;
    };

    /**
     *
     * @param jsonObj
     * @returns {{}}
     */
    WeatherView.prototype.getForecastObject = function(jsonObj)
    {
        var forecastObj = {};

        if (jsonObj.weather[0])
        {
            forecastObj.image = 'http://openweathermap.org/img/w/' + jsonObj.weather[0].icon + '.png';
            forecastObj.description = jsonObj.weather[0].description;
        }

        var sign = '';
        if (+jsonObj.main.temp > 0)
        {
            sign = '+';
        }
        else if (+jsonObj.main.temp < 0)
        {
            sign = '-';
        }

        forecastObj.temperature = sign + Math.floor(jsonObj.main.temp) + '\u2103';
        forecastObj.city = jsonObj.name || '';

        return forecastObj;
    };

    /**
     *
     * @param e
     */
    WeatherView.prototype.clickHandler = function (e)
    {
        if (e.target.id === 'close-weather')
        {
            this.element.style.display = 'none';
        }

        if (e.target.id === 'forecast-three-days')
        {
            eventManager.dispatch('forecast_request', 'http://api.openweathermap.org/data/2.5/forecast?q=');

            e.target.style.display = 'none';
        }
    };

    return WeatherView;

});

