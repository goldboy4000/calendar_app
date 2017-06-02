/**
 * Created by LaBestia on 01.06.2017.
 */

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
 * @param initMonth
 * @param initYear
 * @constructor
 */
function CalendarModel(initMonth, initYear)
{
    /**
     * _private_
     * Constant names of days of week
     * @type {[*]}
     */
    var NAMES_OF_DAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

    /**
     *
     * @type {number}
     */
    this.day = new Date().getDate();

    /**
     *
     * @type {number}
     */
    this.month = !isNaN(+initMonth) ? +initMonth : new Date().getMonth();

    /**
     *
     * @type {number}
     */
    this.year = !isNaN(+initYear) ? +initYear : new Date().getFullYear();

    /**
     *
     * @type {{}}
     */
    this.tasks = {};

    /**
     *
     * @type {*[]}
     */
    this.namesOfDays = NAMES_OF_DAYS;

    /**
     *
     * @type {*[]}
     */
    this.namesOfMonths = NAMES_OF_MONTHS;

    /**
     *
     * @returns {{}}
     */
    this.toJSON = function()
    {
        return this.tasks;
    };

    /**
     * Key of tasks for local storage
     * @type {string}
     */
    this.tasksLocalStorageKey = 'tasks';
}

/**
 *
 */
CalendarModel.prototype.init = function ()
{
    this.loadTasksFromStorage();
};

/**
 *
 * @param day
 */
CalendarModel.prototype.setDay = function (day)
{
    this.day = day;

    eventManager.dispatch('day_changed');
};

/**
 *
 * @param langObj
 */
CalendarModel.prototype.setLang = function (langObj)
{
    this.namesOfDays = langObj.namesOfDays;
    this.namesOfMonths = langObj.namesOfMonths;

    eventManager.dispatch('calendar_lang_change');
};

/**
 * Adds new task
 * @param message
 * @returns {CalendarModel}
 */
CalendarModel.prototype.addTask = function (message)
{
    var task = new Task(message, new Date(this.year, this.month, this.day));

    var key = this.month + '_' + this.year;
    if (!this.tasks[key])
    {
        this.tasks[key] = [];
    }
    this.tasks[key].push(task);

    eventManager.dispatch('task_added');
};

/**
 * Removes task
 * @param id
 * @returns {CalendarModel}
 */
CalendarModel.prototype.removeTask = function (id)
{
    if (this.tasks[this.month + '_' + this.year])
    {
        var currentMonthTasks = this.tasks[this.month + '_' + this.year];
        currentMonthTasks.forEach(function(task, index, tasks)
        {
            if (task instanceof Task && task.id === id)
            {
                tasks.splice(index, 1);
            }
        }.bind(this));
    }
    eventManager.dispatch('task_removed');
};

/**
 * Changes month to previous
 */
CalendarModel.prototype.previous = function ()
{
    if (--this.month === -1)
    {
        this.month = 11;
        this.year--;
    }
    eventManager.dispatch('date_changed');
};

/**
 * Changes month to next
 */
CalendarModel.prototype.next = function ()
{
    if (++this.month === 12)
    {
        this.month = 0;
        this.year++;
    }
    eventManager.dispatch('date_changed');
};

/**
 * Loads saves tasks from local storage
 */
CalendarModel.prototype.loadTasksFromStorage = function ()
{
    var data = localStorage.getItem(this.tasksLocalStorageKey);

    try
    {
        var tasksObj = JSON.parse(data);

        for (var key in tasksObj)
        {
            this.tasks[key] = [];
            tasksObj[key].forEach(function (obj)
            {
                var task = new Task(obj.task, new Date(obj.date));
                this.tasks[key].push(task);
            }.bind(this));
        }
    }
    catch(err)
    {
        this.tasks = {};
    }
    eventManager.dispatch('tasks_loaded');
};

/**
 * Saves tasks to local store
 */
CalendarModel.prototype.saveTasksToStorage = function ()
{
    localStorage.removeItem(this.tasksLocalStorageKey);
    localStorage.setItem(this.tasksLocalStorageKey, JSON.stringify(this));
};