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
function WeatherController(city, country, units, lang)
{
    this.model = new WeatherModel(city, country, units, lang);
    this.view = new WeatherView(this.model);

    this.init();
}

/**
 *
 * @returns {WeatherController}
 */
WeatherController.prototype.init = function ()
{
    this.setupHandlers().subscribeHandlers();

    return this;
};

/**
 *
 * @returns {WeatherController}
 */
WeatherController.prototype.setupHandlers = function()
{
    this.forecastRequestHandler = this.forecastRequest.bind(this);
    this.forecastLoadedHandler = this.forecastLoaded.bind(this);

    return this;
};

/**
 *
 * @returns {WeatherController}
 */
WeatherController.prototype.subscribeHandlers = function()
{
    eventManager.subscribe('forecast_request', this.forecastRequestHandler);
    eventManager.subscribe('forecast_loaded', this.forecastLoadedHandler);

    return this;
};

/**
 *
 * @param link
 */
WeatherController.prototype.forecastRequest = function(link)
{
    this.model.getInfo(link);
};

/**
 *
 * @param jsonObj
 */
WeatherController.prototype.forecastLoaded = function(jsonObj)
{
    this.view.render(jsonObj);
};