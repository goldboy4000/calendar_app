/**
 * Created by LaBestia on 02.06.2017.
 */

define(['EventManager',
        'underscore',
        'text!../../../../html_templates/tmpl_weather_module.html'],
        function (eventManager, _, htmlStr)
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

        /**
         *
         */
        this.tmpl = _.template(htmlStr);

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
        var forecastArray = [];
        if (!jsonObj.list)
        {
            forecastArray.push(this.getForecastObject(jsonObj));
        }
        else
        {
            var today = new Date();
            var counter = 0;

            var forecastList = jsonObj.list;

            forecastList.forEach(function(forecast)
            {
                var forecastDate = new Date(forecast.dt_txt);
                if (today.getHours() > 12 && !counter)
                {
                    forecastArray.push(this.getForecastObject(forecast));
                    counter++;
                }
                if (forecastDate.getHours() === 12 && counter < 3)
                {
                    forecastArray.push(this.getForecastObject(forecast));
                    counter++;
                }
            }.bind(this));

        }
        this.element.innerHTML = this.tmpl({forecasts: forecastArray});
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

