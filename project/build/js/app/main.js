/**
 * Created by LaBestia on 31.05.2017.
 */

define(['additional/controllers/CalendarController',
        'additional/controllers/MenuController',
        'additional/controllers/WeatherController',
        'additional/LocalizationLoader',
        'EventManager',
        'fb'
        ], function (CalendarController, MenuController, WeatherController, LocalizationLoader, eventManager, fb)
{
    return {

        init: function ()
        {
            fb.init();

            new LocalizationLoader('data.json');

            // нет возможности использовать API по протоколу https
            //new WeatherController('Minsk', 'by', 'metric', 'ru');

            new MenuController('#menu_container');

            new CalendarController('#calendar_nav_container', '#calendar_container');

            /**
             *
             */
            var pagehide = function ()
            {
                eventManager.dispatch('exit_from_page');
            };

            window.addEventListener('pagehide', pagehide);
        }
    }
});
