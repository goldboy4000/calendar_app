/**
 * Created by LaBestia on 01.06.2017.
 */

/**
 *
 * @constructor
 */
function ExtendedDate()
{
    // Date.apply(this, arguments);
    return new Date();
}

/**
 *
 * @type {Date}
 */
ExtendedDate.prototype = Date.prototype;

/**
 *
 * @type {ExtendedDate}
 */
ExtendedDate.prototype.constructor = ExtendedDate;

/**
 * Calculates days in month
 * @returns {number}
 */
ExtendedDate.prototype.daysInMonth = function()
{
    return 32 - new Date( this.getFullYear(), this.getMonth(), 32 ).getDate();
};

/**
 * Calculates full weeks (rows for calendar) in month
 * @returns {number}
 */
ExtendedDate.prototype.fullWeeksInMonth = function()
{
    var day = new Date( this.getFullYear(), this.getMonth(), 1 ).getDay();
    day = day || 7;
    var sumOfDays = day - 1 + this.daysInMonth();

    return Number(Math.floor(sumOfDays / 7) + Boolean(sumOfDays % 7));
};




// /**
//  * Calculates days in month
//  * @returns {number}
//  */
// Date.prototype.daysInMonth = function()
// {
//     return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
// };
//
// /**
//  * Calculates full weeks (rows for calendar) in month
//  * @returns {number}
//  */
// Date.prototype.fullWeeksInMonth = function()
// {
//     var day = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
//     day = day === 0 ? 7 : day;
//     var sumOfDays = day - 1 + this.daysInMonth();
//
//     return Number(Math.floor(sumOfDays / 7) + Boolean(sumOfDays % 7));
// };