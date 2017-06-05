/**
 * Created by LaBestia on 01.06.2017.
 */

define(function ()
{
    /**
     *
     * @constructor
     */
    function EventManager()
    {
        this.events = {};
    }

    /**
     *
     * @param type
     * @param handler
     */
    EventManager.prototype.subscribe = function (type, handler)
    {
        if (!this.events[type])
        {
            this.events[type] = [];
        }

        this.events[type].push(handler);
    };

    /**
     *
     * @param type
     * @param data
     */
    EventManager.prototype.dispatch = function (type, data)
    {
        if (this.events[type] && this.events[type].length)
        {
            this.events[type].map(function(handler)
            {
                handler(data);
            });
        }
    };

    /**
     *
     * @param type
     * @param handler
     */
    EventManager.prototype.unsubscribe = function (type, handler)
    {

    };

    return new EventManager();
});
