/**
 * Created by LaBestia on 01.06.2017.
 */

define(['additional/models/MenuModel',
    'additional/views/MenuView',
    'EventManager'], function (MenuModel, MenuView, eventManager)
{
    /**
     *
     * @param selector
     * @param buttonId
     * @param monthSelectorId
     * @param yearSelectorId
     * @constructor
     */
    function MenuController(selector, buttonId, monthSelectorId, yearSelectorId)
    {
        this.model = new MenuModel();
        this.view = new MenuView(this.model, selector, buttonId, monthSelectorId, yearSelectorId);

        this.setupHandlers().subscribeHandlers();
    }

    /**
     *
     */
    MenuController.prototype.setupHandlers = function()
    {
        this.changeSelectedHandler = this.changeSelected.bind(this);
        this.changeLocalizationHandler = this.changeLocalization.bind(this);
        this.localizationLoadHandler = this.localizationLoad.bind(this);
        this.menuLangChangeHandler = this.menuLangChange.bind(this);
        this.userStateChangeHandler = this.userStateChange.bind(this);

        return this;
    };

    /**
     *
     */
    MenuController.prototype.subscribeHandlers = function()
    {
        eventManager.subscribe('change_selected', this.changeSelectedHandler);
        eventManager.subscribe('change_lang', this.changeLocalizationHandler);
        eventManager.subscribe('localization_load', this.localizationLoadHandler);
        eventManager.subscribe('menu_lang_change', this.menuLangChangeHandler);
        eventManager.subscribe('user_state_change', this.userStateChangeHandler);

        return this;
    };

    /**
     *
     * @param indexes
     */
    MenuController.prototype.changeSelected = function(indexes)
    {
        this.model.setSelected(indexes);
    };

    /**
     *
     * @param lang
     */
    MenuController.prototype.changeLocalization = function(lang)
    {
        this.model.setLocalization(lang);
    };

    /**
     *
     * @param obj
     */
    MenuController.prototype.localizationLoad = function(obj)
    {
        this.model.setNamesOfMonths(obj.namesOfMonths);
    };

    /**
     *
     */
    MenuController.prototype.menuLangChange = function()
    {
        this.view.fillMonthSelector();
    };

    /**
     *
     */
    MenuController.prototype.userStateChange = function(userData)
    {
        this.view.render();
    };

    return MenuController;

});

