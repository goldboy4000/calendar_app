/**
 * Created by LaBestia on 01.06.2017.
 */

define(['fb', 'EventManager', 'underscore', 'additional/Utils', 'text!../../../../html_templates/tmpl_main_menu.html'], function (fb, eventManager, _, utils, htmlStr)
{
    /**
     *
     * @param model
     * @param selector
     * @constructor
     */
    function MenuView(model, selector)
    {
        this.model = model;

        this.selector = selector;

        this.el = document.querySelector(this.selector);

        this.tmpl = _.template(htmlStr);

        this.buttonId = 'show-button';
        this.monthSelectorId = 'month-selector';
        this.yearSelectorId = 'year-selector';

        this.init().render();
    }

    /**
     *
     */
    MenuView.prototype.init = function()
    {
        this.el.addEventListener('click', this.clickHandler.bind(this));
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
    MenuView.prototype.fillYearSelector = function ()
    {
        var element = document.getElementById(this.yearSelectorId);
        element.innerHTML = '';
        element.appendChild( utils.getOption(-1, '-choose year-') );

        for (var year = new Date().getFullYear(); year >= 1900; year--)
        {
            element.appendChild( utils.getOption(year, year) );
        }
        element.selectedIndex = this.model.selectedYear;
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
            ruLangButton.classList.add('is-active');
            enLangButton.classList.remove('is-active');
        }
        else
        {
            ruLangButton.classList.remove('is-active');
            enLangButton.classList.add('is-active');
        }
    };

    /**
     *
     */
    MenuView.prototype.render = function ()
    {
        this.el.innerHTML = '';
        this.el.innerHTML = this.tmpl({user: fb.getUserIsAuth()});

        this.fillMonthSelector();
        this.fillYearSelector();
    };

    /**
     *
     * @param e
     */
    MenuView.prototype.clickHandler = function(e)
    {
        var target = e.target;

        // show button
        if (target.id === this.buttonId && !target.hasAttribute('disabled'))
        {
            var monthSelector = document.getElementById(this.monthSelectorId);
            var yearSelector = document.getElementById(this.yearSelectorId);

            eventManager.dispatch('date_changed', {
                month: monthSelector[monthSelector.selectedIndex].value,
                year: yearSelector[yearSelector.selectedIndex].value
            });
        }

        // lang buttons
        if (target.id.indexOf('lang-button') !== -1)
        {
            eventManager.dispatch('change_lang', target.id.slice(0, 2));

            this.toggleLocButtons();
        }

        // sign in
        if (target.classList.contains('sign-in'))
        {
            fb.signIn();
        }

        // sign out
        if (target.classList.contains('sign-out'))
        {
            fb.signOut();
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

        eventManager.dispatch('change_selected', {month: monthSelector.selectedIndex, year: yearSelector.selectedIndex});

        if (monthSelector.selectedIndex !== 0 && yearSelector.selectedIndex !== 0)
        {
            showButton.removeAttribute('disabled');
        }
        else
        {
            showButton.setAttribute('disabled', '');
        }
    };

    return MenuView;

});

