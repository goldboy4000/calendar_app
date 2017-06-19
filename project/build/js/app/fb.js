/**
 * Created by LaBestia on 16.06.2017.
 */

define(['firebase', 'module', 'EventManager'], function (firebase, module, eventManager)
{

    return {

        /**
         *
         */
        init: function ()
        {
            firebase.initializeApp(module.config());

            this.userIsAuth = firebase.auth().currentUser || null;

            this.setupEvents();
        },

        /**
         *
         */
        setupEvents: function () {

            firebase.auth().onAuthStateChanged(function(user) {

                // if (user) {
                //
                //     var ref = firebase.database().ref('users/' + user.uid + '/tasks/');
                //     ref.on('value', function(snapshot)
                //     {
                //         radio.trigger('value_changed', snapshot.val());
                //     });
                //
                //     console.log('onAuth true');
                //     // User is signed in.
                // } else {
                //     console.log('onAuth false');
                //     // No user is signed in.
                // }

                this.setUserIsAuth(user);

            }.bind(this));

        },

        /**
         *
         */
        signInByEmail: function (email, password)
        {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function(error)
                {
                    var errorCode = error.code;

                    if (errorCode === 'auth/user-not-found')
                    {
                        eventManager.dispatch('user_not_found');
                    }
            });
        },

        /**
         *
         * @param email
         * @param password
         */
        signUpByEmail: function (email, password)
        {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log('code: ' + errorCode + ', message: ' + errorMessage);
            });
        },

        /**
         *
         */
        signInByGoogle: function ()
        {
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(function(result)
                {
                    this.userIsAuth = result.user;
                    this.setUserIsAuth(this.userIsAuth);

                }.bind(this))
                .catch(function(error)
                {
                    var errorMessage = error.message;
                    console.log('error: ' + errorMessage);
                });
        },

        /**
         *
         */
        signOut: function ()
        {
            firebase.auth().signOut()
                .then(function()
                {
                    this.userIsAuth = null;
                    this.setUserIsAuth(this.userIsAuth);
                }.bind(this))
                .catch(function(error)
                {
                    console.log('sign out error: ' + error);
                });
        },

        /**
         *
         * @returns {null|*}
         */
        getUserIsAuth: function()
        {
            return this.userIsAuth;
        },

        /**
         *
         * @param user
         */
        setUserIsAuth: function (user)
        {
            this.userIsAuth = user;
            eventManager.dispatch('user_state_change', user);
        }
    }
});