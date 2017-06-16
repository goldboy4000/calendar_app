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
            config: {
                fb: {
                    apiKey: "AIzaSyBmmNa8n2h_nBqIOJlNKgU6UCEEcG8wtBI",
                    authDomain: "calendar-62958.firebaseapp.com",
                    databaseURL: "https://calendar-62958.firebaseio.com",
                    projectId: "calendar-62958",
                    storageBucket: "calendar-62958.appspot.com",
                    messagingSenderId: "799452709521"
                }
            },
            baseUrl: 'js/app',
            paths: {
                app: 'main',
                underscore: '../libs/underscore',
                text: '../libs/text',
                firebase: 'https://www.gstatic.com/firebasejs/4.1.2/firebase'
            },
            shim: {
                'firebase': {
                    exports: 'firebase'
                }
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