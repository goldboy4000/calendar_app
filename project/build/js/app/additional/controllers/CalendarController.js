/**
 * Created by LaBestia on 01.06.2017.
 */

define(['additional/models/CalendarModel',
    'additional/views/CalendarView',
    'EventManager'], function (CalendarModel, CalendarView, eventManager)
{
    /**
     *
     * @param calendarNavContainer
     * @param calendarContainer
     * @constructor
     */
    function CalendarController(calendarNavContainer, calendarContainer)
    {
        this.model = new CalendarModel();
        this.view = new CalendarView(this.model, calendarNavContainer, calendarContainer);

        this.setupHandlers().subscribeHandlers();

        this.model.init();
    }

    /**
     *
     * @returns {CalendarController}
     */
    CalendarController.prototype.setupHandlers = function()
    {
        this.tasksLoadedHandler = this.tasksLoaded.bind(this);

        this.addTaskHandler = this.addTask.bind(this);
        this.taskAddedHandler = this.taskAdded.bind(this);
        this.removeTaskHandler = this.removeTask.bind(this);
        this.taskRemovedHandler = this.taskRemoved.bind(this);

        this.monthPreviousHandler = this.monthPrevious.bind(this);
        this.monthNextHandler = this.monthNext.bind(this);
        this.dateChangedHandler = this.dateChanged.bind(this);

        this.changeDayHandler = this.changeDay.bind(this);
        this.dayChangedHandler = this.dayChanged.bind(this);

        this.modalSuccessHandler = this.modalSuccess.bind(this);

        this.localizationLoadHandler = this.localizationLoad.bind(this);
        this.calendarLangChangedHandler = this.calendarLangChanged.bind(this);

        this.exitFromPageHandler = this.exitFromPage.bind(this);

        return this;
    };

    /**
     *
     */
    CalendarController.prototype.subscribeHandlers = function()
    {
        eventManager.subscribe('tasks_loaded', this.tasksLoadedHandler);

        eventManager.subscribe('add_task', this.addTaskHandler);
        eventManager.subscribe('task_added', this.taskAddedHandler);
        eventManager.subscribe('remove_task', this.removeTaskHandler);
        eventManager.subscribe('task_removed', this.taskRemovedHandler);

        eventManager.subscribe('month_previous', this.monthPreviousHandler);
        eventManager.subscribe('month_next', this.monthNextHandler);
        eventManager.subscribe('date_changed', this.dateChangedHandler);

        eventManager.subscribe('change_day', this.changeDayHandler);
        eventManager.subscribe('day_changed', this.dayChangedHandler);

        eventManager.subscribe('modal_success', this.modalSuccessHandler);

        eventManager.subscribe('localization_load', this.localizationLoadHandler);
        eventManager.subscribe('calendar_lang_change', this.calendarLangChangedHandler);

        eventManager.subscribe('exit_from_page', this.exitFromPageHandler);
    };

    /**
     *
     */
    CalendarController.prototype.tasksLoaded = function ()
    {
        this.view.render();
    };

    /**
     *
     * @param message
     */
    CalendarController.prototype.addTask = function(message)
    {
        this.model.addTask(message);
    };

    /**
     *
     */
    CalendarController.prototype.taskAdded = function()
    {
        this.view.render();
    };

    /**
     *
     * @param id
     */
    CalendarController.prototype.removeTask = function(id)
    {
        this.model.removeTask(id);
    };

    /**
     *
     */
    CalendarController.prototype.taskRemoved = function()
    {
        this.view.render();
    };

    /**
     *
     */
    CalendarController.prototype.monthPrevious = function()
    {
        this.model.previous();
    };

    /**
     *
     */
    CalendarController.prototype.monthNext = function()
    {
        this.model.next();
    };

    /**
     *
     * @param obj
     */
    CalendarController.prototype.dateChanged = function(obj)
    {
        if (obj)
        {
            this.view.render(obj.month, obj.year);
        }
        else
        {
            this.view.render();
        }
    };

    /**
     *
     */
    CalendarController.prototype.changeDay = function(day)
    {
        this.model.setDay(day);
    };

    /**
     *
     */
    CalendarController.prototype.dayChanged = function()
    {
        this.view.showModal();
    };

    /**
     *
     * @param message
     */
    CalendarController.prototype.modalSuccess = function(message)
    {
        this.view.modalSuccessHandler(message);
    };

    /**
     *
     * @param obj
     */
    CalendarController.prototype.localizationLoad = function(obj)
    {
        this.model.setLang(obj);
    };

    /**
     *
     */
    CalendarController.prototype.calendarLangChanged = function()
    {
        this.view.render();
    };

    /**
     *
     */
    CalendarController.prototype.exitFromPage = function()
    {
        this.model.saveTasksToStorage();
    };

    return CalendarController;
});



