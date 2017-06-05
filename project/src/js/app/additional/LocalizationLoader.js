/**
 * Created by LaBestia on 02.06.2017.
 */

define(['EventManager'], function (eventManager)
{
    /**
     *
     * @constructor
     */
    function LocalizationLoader(srcLocalization)
    {
        this.localization = 'ru';
        this.source = srcLocalization;

        this.init();
    }

    /**
     *
     */
    LocalizationLoader.prototype.init = function ()
    {
        this.setupHandlers().subscribeHandlers();
    };

    /**
     *
     * @returns {LocalizationLoader}
     */
    LocalizationLoader.prototype.setupHandlers = function ()
    {
        this.langChangeHandler = this.langChange.bind(this);

        return this;
    };

    /**
     *
     * @returns {LocalizationLoader}
     */
    LocalizationLoader.prototype.subscribeHandlers = function ()
    {
        eventManager.subscribe('lang_changed', this.langChangeHandler);

        return this;
    };

    /**
     *
     */
    LocalizationLoader.prototype.load = function ()
    {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', this.readyStateChangeHandler.bind(this));
        xhr.open('GET', this.source, true);
        xhr.send();
    };

    /**
     *
     * @param str
     */
    LocalizationLoader.prototype.parse = function(str)
    {
        try
        {
            var locParams = JSON.parse(str);
        }
        catch(err)
        {
            return null;
        }

        return locParams[this.localization + 'Lang'];
    };

    /**
     *
     * @param lang
     */
    LocalizationLoader.prototype.langChange = function (lang)
    {
        this.localization = lang;

        this.load();
    };

    /**
     *
     * @param e
     */
    LocalizationLoader.prototype.readyStateChangeHandler = function (e)
    {
        if (e.target.readyState !== 4)
        {
            return;
        }

        if (e.target.status !== 200)
        {
            console.log('status = ' + e.target.status);
        }
        else
        {
            var locObj = this.parse(e.target.responseText);
            if (locObj)
            {
                eventManager.dispatch('localization_load', {
                    namesOfDays: locObj.namesOfDays,
                    namesOfMonths: locObj.namesOfMonths
                });
            }
        }
    };

    return LocalizationLoader;

});

