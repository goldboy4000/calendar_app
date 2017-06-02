/**
 * Created by LaBestia on 01.06.2017.
 */

/**
 *
 * @constructor
 */
function MenuModel()
{
    this.namesOfMonths = NAMES_OF_MONTHS;

    this.localization = 'ru';

    this.selectedMonth = 0;
}

/**
 *
 * @param index
 */
MenuModel.prototype.setSelectedMonth = function(index)
{
    this.selectedMonth = index;
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