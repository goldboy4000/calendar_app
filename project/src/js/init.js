/**
 * Created by LaBestia on 05.06.2017.
 */
(function (window)
{
    'use strict';

    /**
     *
     */
    var init = function ()
    {
        requirejs.config({
            baseUrl: 'js/app',
            paths: {
                app: 'main'
            }
        });

        requirejs(['app'], function (app)
        {
            app.init();
        });
    };

    if (window.document.readyState === 'complete')
    {
        init();
    }
    else
    {
        window.addEventListener('load', init);
    }

})(window);