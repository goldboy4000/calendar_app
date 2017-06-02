/**
 * Created by LaBestia on 31.05.2017.
 */

(function (window)
{
    'use strict';

    /**
     *
     */
    var init = function ()
    {
        new LocalizationLoader('data.json');

        new WeatherController('Minsk', 'by', 'metric', 'ru');

        new MenuController('#menu_container', 'show-button', 'month-selector', 'year-selector');

        new CalendarController('#calendar_nav_container', '#calendar_container');
    };

    /**
     *
     */
    var pagehide = function ()
    {
        eventManager.dispatch('exit_from_page');
    };

    window.addEventListener('load', init);
    window.addEventListener('pagehide', pagehide);

})(window);