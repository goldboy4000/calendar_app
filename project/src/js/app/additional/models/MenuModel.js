/**
 * Created by LaBestia on 01.06.2017.
 */

define(['EventManager'], function (eventManager)
{
    /**
     * Constant names of months
     * @type {[*]}
     */
    var NAMES_OF_MONTHS =  ['Январь', 'Февраль', 'Март',
        'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь'];

    /**
     *
     * @constructor
     */
    function MenuModel()
    {
        this.namesOfMonths = NAMES_OF_MONTHS;

        this.localization = 'ru';

        this.selectedMonth = 0;
        this.selectedYear = 0;
    }

    /**
     *
     * @param indexes
     */
    MenuModel.prototype.setSelected = function(indexes)
    {
        this.selectedMonth = indexes.month;
        this.selectedYear = indexes.year;
    };

    /**
     *
     * @param index
     */
    MenuModel.prototype.setSelectedYear = function(index)
    {
        this.selectedYear = index;
    };

    /**
     *
     * @param lang
     */
    MenuModel.prototype.setLocalization = function (lang)
    {
        this.localization = lang;

        eventManager.dispatch('lang_changed', this.localization)
    };

    /**
     *
     * @param names
     */
    MenuModel.prototype.setNamesOfMonths = function (names)
    {
        this.namesOfMonths = names;

        eventManager.dispatch('menu_lang_change');
    };

    return MenuModel;
});

