/**
 * Created by LaBestia on 18.06.2017.
 */

define(['fb', 'underscore', 'text!../../../../html_templates/tmpl_sign_in_window.html', 'EventManager'], function (fb, _, htmlStr, eventManager) {

    function SignInWindow()
    {
        this.selector = '#sign_in_window';

        this.tmpl = _.template(htmlStr);

        this.type = 'sign_in';

        this.el = this.createInstance();

        this.init();

        document.body.appendChild(this.el);
    }

    SignInWindow.prototype = {

        /**
         *
         */
        init: function () {

            this.setupHandlers().subscribeHandlers();
        },

        /**
         *
         */
        setupHandlers: function () {

            this.el.addEventListener('click', this.clickHandler.bind(this));
            this.el.addEventListener('keydown', this.keyDownHandler.bind(this));

            this.userNotFoundHandler = this.userNotFound.bind(this);

            return this;
        },

        /**
         *
         */
        subscribeHandlers:function () {

            eventManager.subscribe('user_not_found', this.userNotFoundHandler);
        },

        /**
         *
         * @returns {Element}
         */
        createInstance:function () {

            var element = document.createElement('div');

            return element;
        },

        /**
         *
         */
        render:function (type, signMethod) {

            this.el.innerHTML = this.tmpl({type: type, signBy:signMethod});
        },

        /**
         *
         */
        show: function (type) {

            this.type = type;
            this.render(this.type, null);

            var sign_win = document.querySelector(this.selector);
            sign_win.classList.add('is-active');
        },

        /**
         *
         */
        hide: function () {
            var sign_win = document.querySelector(this.selector);
            sign_win.classList.remove('is-active');
        },

        /**
         *
         */
        clickHandler: function (e) {

            var target = e.target;

            // sign by email
            if (target.classList.contains('sign-in-by-email'))
            {
                this.render(this.type, 'email');
            }

            // sign by google
            if (target.classList.contains('sign-in-by-google'))
            {
                fb.signInByGoogle();
                this.hide();
            }

            // "delete" button
            if (target.classList.contains('delete'))
            {
                this.hide();
            }

            // "back" button
            if (target.classList.contains('back'))
            {
                this.render(this.type, null);
            }

            // "sign-in" button
            if (target.classList.contains('sign-in'))
            {
                var emailInput = document.querySelector('#email-input');
                var passwordInput = document.querySelector('#password-input');

                fb.signInByEmail(emailInput.value, passwordInput.value);
                this.hide();
            }

            // "sign-up" button
            if (target.classList.contains('sign-up'))
            {
                emailInput = document.querySelector('#email-input');
                passwordInput = document.querySelector('#password-input');

                fb.signUpByEmail(emailInput.value, passwordInput.value);
                this.hide();
            }
        },

        /**
         *
         */
        keyDownHandler: function () {
            // console.log('keydown');
        },

        /**
         *
         */
        userNotFound:function () {

            console.log('sign window: user not found');
        }

    };

    return SignInWindow;
});