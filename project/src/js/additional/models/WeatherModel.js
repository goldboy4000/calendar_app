/**
 * Created by LaBestia on 02.06.2017.
 */

/**
 *
 * @param city
 * @param country
 * @param units
 * @param lang
 * @constructor
 */
function WeatherModel(city, country, units, lang)
{
    this.city = city || 'Minsk';
    this.country = country || 'by';
    this.units = units || 'metric';
    this.lang = lang || 'ru';

    this.xhr = new XMLHttpRequest();

    this.init().getInfo();
}

/**
 *
 * @returns {WeatherModel}
 */
WeatherModel.prototype.init = function ()
{
    this.setupHandlers();

    return this;
};

/**
 *
 * @returns {WeatherModel}
 */
WeatherModel.prototype.setupHandlers = function ()
{
    this.xhr.addEventListener('load', this.loadWeatherHandler.bind(this));

    return this;
};

/**
 *
 * @param apiLink
 */
WeatherModel.prototype.getInfo = function (apiLink)
{
    var link = apiLink || 'http://api.openweathermap.org/data/2.5/weather?q=';

    this.xhr.open('GET', link + this.city + ',' + this.country + '&APPID=fac89aa646dd8482a386ae7aa00fcdbb&units=' + this.units + '&lang=' + this.lang, true);
    this.xhr.send();
};

/**
 *
 * @param jsonStr
 * @returns {null}
 */
WeatherModel.prototype.parse = function (jsonStr)
{
    try
    {
        var jsonObj = JSON.parse(jsonStr);
    }
    catch (err)
    {
        return null;
    }

    return jsonObj;
};

/**
 *
 * @param e
 */
WeatherModel.prototype.loadWeatherHandler = function (e)
{
    var xhr = e.target;
    if (xhr.status !== 200)
    {
        console.log('status = ' + xhr.status);
    }
    else
    {
        var jsonObj = this.parse(xhr.responseText);

        if (jsonObj)
        {
            eventManager.dispatch('forecast_loaded', jsonObj);
        }
    }
};