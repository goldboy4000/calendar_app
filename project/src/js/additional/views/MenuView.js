/**
 * Created by LaBestia on 01.06.2017.
 */

/**
 *
 * @param model
 * @param selector
 * @param buttonId
 * @param monthSelectorId
 * @param yearSelectorId
 * @constructor
 */
function MenuView(model, selector, buttonId, monthSelectorId, yearSelectorId)
{
    this.model = model;

    this.selector = selector;

    this.el = document.querySelector(this.selector);

    this.buttonId = buttonId;
    this.monthSelectorId = monthSelectorId;
    this.yearSelectorId = yearSelectorId;

    this.init().render();
}

/**
 *
 */
MenuView.prototype.init = function()
{
    this.el.addEventListener('click', this.showButtonClickHandler.bind(this));
    this.el.addEventListener('change', this.selectorChangeHandler.bind(this));

    return this;
};

/**
 *
 */
MenuView.prototype.fillMonthSelector = function ()
{
    var element = document.getElementById(this.monthSelectorId);
    element.innerHTML = '';
    element.appendChild( utils.getOption(-1, '-choose month-') );

    for (var month = 0; month < this.model.namesOfMonths.length; month++)
    {
        element.appendChild( utils.getOption(month, this.model.namesOfMonths[month]) );
    }

    element.selectedIndex = this.model.selectedMonth;
};

/**
 *
 */
MenuView.prototype.toggleLocButtons = function()
{
    var ruLangButton = document.getElementById('ru-lang-button');
    var enLangButton = document.getElementById('en-lang-button');

    if (this.model.localization === 'ru')
    {
        ruLangButton.classList.add('is-outlined');
        enLangButton.classList.remove('is-outlined');
    }
    else
    {
        ruLangButton.classList.remove('is-outlined');
        enLangButton.classList.add('is-outlined');
    }
};

/**
 *
 */
MenuView.prototype.renderButton = function ()
{
    var showButton = utils.getSimpleButton(this.buttonId, 'Show', 'is-primary');
    showButton.setAttribute('disabled', '');

    this.el.appendChild(showButton);
};

/**
 *
 */
MenuView.prototype.renderSelectors = function ()
{
    var monthsSelector = utils.getSelector(this.monthSelectorId);
    this.el.appendChild(monthsSelector);
    this.fillMonthSelector();

    var yearSelector = utils.getSelector(this.yearSelectorId);
    yearSelector.appendChild( utils.getOption(-1, '-choose year-') );

    for (var year = new Date().getFullYear(); year >= 1900; year--)
    {
        yearSelector.appendChild( utils.getOption(year, year) );
    }
    this.el.appendChild(yearSelector);
};

/**
 *
 */
MenuView.prototype.renderLocalizationMenu = function ()
{
    var ruLangButton = utils.getSimpleButton('ru-lang-button', 'ru', 'is-info');
    ruLangButton.addEventListener('click', this.locClickHandler.bind(this));
    var enLangButton = utils.getSimpleButton('en-lang-button', 'en', 'is-info');
    enLangButton.addEventListener('click', this.locClickHandler.bind(this));

    this.el.appendChild(ruLangButton);
    this.el.appendChild(enLangButton);

    this.toggleLocButtons();
};

/**
 *
 */
MenuView.prototype.render = function ()
{
    this.el.innerHTML = '';

    this.renderButton();
    this.renderSelectors();
    this.renderLocalizationMenu();
};

/**
 *
 * @param e
 */
MenuView.prototype.showButtonClickHandler = function(e)
{
    var target = e.target;

    if (target.id === this.buttonId && !target.hasAttribute('disabled'))
    {
        var monthSelector = document.getElementById(this.monthSelectorId);
        var yearSelector = document.getElementById(this.yearSelectorId);

        eventManager.dispatch('date_changed', {
            month: monthSelector[monthSelector.selectedIndex].value,
            year: yearSelector[yearSelector.selectedIndex].value
        });
    }
};

/**
 *
 * @param e
 */
MenuView.prototype.selectorChangeHandler = function(e)
{
    var showButton = document.getElementById(this.buttonId);
    var monthSelector = document.getElementById(this.monthSelectorId);
    var yearSelector = document.getElementById(this.yearSelectorId);

    eventManager.dispatch('change_selected', monthSelector.selectedIndex);

    if (monthSelector.selectedIndex !== 0 && yearSelector.selectedIndex !== 0)
    {
        showButton.removeAttribute('disabled');
    }
    else
    {
        showButton.setAttribute('disabled', '');
    }
};

/**
 *
 * @param e
 */
MenuView.prototype.locClickHandler = function(e)
{
    eventManager.dispatch('change_lang', e.target.id.slice(0, 2));

    this.toggleLocButtons();
};