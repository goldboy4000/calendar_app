/**
 * Created by LaBestia on 02.06.2017.
 */

define(['EventManager',
        'text!../../../html_templates/tmpl_modal_window.html'],
        function (eventManager, htmlStr)
{
    /**
     *
     * @param selector
     * @constructor
     */
    function Modal (selector)
    {
        var container = document.querySelector(selector);

        this.modal = this.createInstance(htmlStr);
        container.appendChild(this.modal);

        this.init();
    }

    /**
     * Inits modal window
     */
    Modal.prototype.init = function ()
    {
        this.setupHandlers();

        this.modal.querySelector('#success_button').disabled = true;
    };

    /**
     * Setups handlers for modal window
     */
    Modal.prototype.setupHandlers = function ()
    {
        this.modal.addEventListener('click', this.modalClickHandler.bind(this));
        this.modal.addEventListener('keyup', this.modalKeyUpHandler.bind(this));
    };

    /**
     * Creates element from string
     */
    Modal.prototype.createInstance = function (htmlStr)
    {
        var tempEl = document.createElement('div');
        tempEl.innerHTML = htmlStr;

        return tempEl.firstChild;
    };

    /**
     *
     * @param e
     */
    Modal.prototype.modalClickHandler = function(e)
    {
        var target = e.target;

        if (target.id === 'success_button')
        {
            eventManager.dispatch('modal_success', this.modal.querySelector('#text_input').value);

            this.hide();
        }

        if (target.id === 'cancel_button' || target.id === 'close_button')
        {
            this.hide();
        }
    };

    /**
     *
     * @param e
     */
    Modal.prototype.modalKeyUpHandler = function(e)
    {
        var target = e.target;

        if (target.id === 'text_input')
        {
            this.modal.querySelector('#success_button').disabled = !target.value;
        }
    };

    /**
     * Shows modal window
     */
    Modal.prototype.show = function (title)
    {
        this.modal.querySelector('#title').innerHTML = title || 'New Event';
        this.modal.classList.add('is-active');
    };

    /**
     * Hides modal window
     */
    Modal.prototype.hide = function ()
    {
        this.modal.querySelector('#text_input').value = '';
        this.modal.classList.remove('is-active');
        this.modal.querySelector('#success_button').disabled = true;
    };

    return Modal;

});


