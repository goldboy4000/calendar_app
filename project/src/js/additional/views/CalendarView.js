/**
 * Created by LaBestia on 01.06.2017.
 */

/**
 *
 * @param model
 * @param navigation
 * @param container
 * @constructor
 */
function CalendarView(model, navigation, container)
{
    /**
     *
     */
    this.model = model;

    /**
     *
     */
    this.navigationContainer = navigation;

    /**
     *
     */
    this.calendarContainer = container;

    /**
     *
     * @type {string}
     */
    this.id = 'calendar';

    /**
     *
     * @type {string}
     */
    this.selector = '#' + this.id;

    /**
     *
     * @type {Modal}
     */
    this.modal = new Modal('.modal');

    this.init();
}

/**
 * Inits view of calendar
 */
CalendarView.prototype.init = function ()
{
    this.setupHandlers();
};

/**
 * Setups handlers for view of calendar
 * @returns {CalendarView}
 */
CalendarView.prototype.setupHandlers = function ()
{
    var navContainer = document.querySelector(this.navigationContainer);
    navContainer.addEventListener('click', this.calendarNavClickHandler.bind(this));

    var calContainer = document.querySelector(this.calendarContainer);
    calContainer.addEventListener('click', this.calendarClickHandler.bind(this));

    return this;
};

/**
 * Rendering navigation panel for calendar
 */
CalendarView.prototype.renderNavigationPanel = function ()
{
    var navigationContainer = document.querySelector(this.navigationContainer);
    navigationContainer.innerHTML = '';
    navigationContainer.appendChild( this.getNavigationElement( this.model.namesOfMonths[this.model.month] + ' ' + this.model.year ) );
};

/**
 * Rendering calendar
 */
CalendarView.prototype.renderCalendar = function ()
{
    var calendarContainer = document.querySelector(this.calendarContainer);
    var table = calendarContainer.querySelector(this.selector);
    if (table)
    {
        calendarContainer.removeChild(table);
    }
    calendarContainer.appendChild(this.getCalendarElement());
};

/**
 * Rendering tasks
 */
CalendarView.prototype.renderTasks = function ()
{
    var currentMonthTasks = this.model.tasks[this.model.month + '_' + this.model.year];

    if (currentMonthTasks)
    {
        currentMonthTasks.forEach(function(task)
        {
            var calendar = document.querySelector(this.selector);

            if (task instanceof Task)
            {
                var taskDay = calendar.querySelector('#day' + task.date.getDate());
                var taskList = taskDay.querySelector('.task_list');
                if (!taskList)
                {
                    taskList = this.getTaskList();
                    taskDay.insertBefore(taskList, taskDay.childNodes[0]);
                }
                taskList.appendChild(task.getInstance());
            }
        }.bind(this));
    }
};

/**
 * Full rendering calendar
 * @param renderMonth
 * @param renderYear
 * @returns {CalendarView}
 */
CalendarView.prototype.render = function (renderMonth, renderYear)
{
    this.model.month = !isNaN(+renderMonth) ? +renderMonth : this.model.month;
    this.model.year = !isNaN(+renderYear) ? +renderYear : this.model.year;

    this.renderNavigationPanel();

    this.renderCalendar();

    this.renderTasks();

    return this;
};

/**
 * Creates navigation for calendar
 * @param title
 * @returns {Element}
 */
CalendarView.prototype.getNavigationElement = function (title)
{
    var nav = document.createElement('div');
    nav.className = 'columns';
    nav.appendChild(utils.getColumn(utils.getButton('previous', '', 'fa fa-arrow-circle-o-left')));
    nav.appendChild(utils.getColumn(utils.getTag('date', 'title', 'is-primary', 'is-large', title), 'is-three-quarters'));
    nav.appendChild(utils.getColumn(utils.getButton('next', '', 'fa fa-arrow-circle-o-right')));

    return nav;
};

/**
 * Creates header element for calendar
 * @param namesOfDays
 * @returns {Element}
 */
CalendarView.prototype.getHeader = function (namesOfDays)
{
    var headerRow = document.createElement('tr');

    for (var i = 0; i < namesOfDays.length; i++)
    {
        headerRow.appendChild( this.getHeaderCell(namesOfDays[i]) );
    }

    var thead = document.createElement('thead');
    thead.appendChild(headerRow);

    return thead;
};

/**
 * Creates cell for header of calendar
 * @param value
 * @returns {Element}
 */
CalendarView.prototype.getHeaderCell = function (value)
{
    var cell = document.createElement('th');
    cell.innerHTML = value;

    return cell;
};

/**
 * Creates body element for calendar
 * @param year
 * @param month
 * @returns {Element}
 */
CalendarView.prototype.getBody = function (year, month)
{
    var tbody = document.createElement('tbody');

    var inputDate = new Date(year, month);
    var dayOfWeek = inputDate.getDay() || 7;
    var daysInMonth = inputDate.daysInMonth();

    var dayOfMonth = 1;
    var weeks = [];
    var firstWeek = true;
    for (var week = 0; week < inputDate.fullWeeksInMonth(); week++)
    {
        weeks[week] = document.createElement('tr');
        tbody.appendChild(weeks[week]);

        for (var day = 1; day <= 7; day++)
        {
            column = document.createElement('td');
            if (day < dayOfWeek && firstWeek || dayOfMonth > daysInMonth)
            {
                column.innerHTML = '&nbsp';
            }
            else
            {
                column.setAttribute('id', 'day' + dayOfMonth);
                column.innerHTML = dayOfMonth++;
                firstWeek = false;
            }
            weeks[week].appendChild(column);
        }
    }

    return tbody;
};

/**
 * Creates table element "calendar"
 * @returns {Element}
 */
CalendarView.prototype.getCalendarElement = function ()
{
    var calendar = document.createElement('table');
    calendar.className = 'table is-bordered';
    calendar.setAttribute('id', this.id);

    calendar.appendChild( this.getHeader( this.model.namesOfDays ) );
    calendar.appendChild( this.getBody( this.model.year, this.model.month ) );

    return calendar;
};

/**
 * Creates ul element "task list"
 * @returns {Element}
 */
CalendarView.prototype.getTaskList = function ()
{
    var taskList = document.createElement('ul');
    taskList.setAttribute('class', 'task_list');

    return taskList;
};

/**
 *
 * @param e
 */
CalendarView.prototype.calendarNavClickHandler = function (e)
{
    var target = e.target;

    while (target.id !== this.navigationContainer.slice(1))
    {
        if (target.id === 'previous')
        {
            eventManager.dispatch('month_previous');
            break;
        }
        if (target.id === 'next')
        {
            eventManager.dispatch('month_next');
            break;
        }
        target = target.parentNode;
    }
};

/**
 *
 * @param e
 */
CalendarView.prototype.calendarClickHandler = function (e)
{
    var target = e.target;

    if (target.id === 'delete')
    {
        var idToRemove = +target.closest('.task').id;
        if (!isNaN(idToRemove))
        {
            eventManager.dispatch('remove_task', idToRemove);
        }

        return;
    }

    var cell = target.closest('td');
    if (cell && cell.innerHTML !== '&nbsp;')
    {
        eventManager.dispatch('change_day', cell.id.slice(3));
    }
};

/**
 *  Shows modal window
 */
CalendarView.prototype.showModal = function ()
{
    this.modal.show('Event on ' + this.model.day + ' ' + this.model.namesOfMonths[this.model.month] + ' ' + this.model.year);
};

/**
 *
 * @param message
 */
CalendarView.prototype.modalSuccessHandler = function (message)
{
    eventManager.dispatch('add_task', message);
};