/**
 * Created by LaBestia on 02.06.2017.
 */

/**
 *
 * @param task
 * @param date
 * @constructor
 */
function Task(task, date)
{
    this.task = task;

    this.date = date;

    this.id = this.generateID();
}

/**
 * Creates and returns element "task"
 * @returns {Element}
 */
Task.prototype.getInstance = function ()
{
    var taskElement = document.createElement('li');
    taskElement.appendChild(utils.getTag(this.id, 'task', 'is-primary', 'is-small', this.task, true));

    return taskElement;
};

/**
 * Generates ID for every new task
 */
Task.prototype.generateID = (function ()
{
    var counter = 0;
    return function ()
    {
        return counter++;
    }
}());