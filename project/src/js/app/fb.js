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
            this.userIsAuth = null;
            firebase.initializeApp(module.config());
        },

        /**
         *
         */
        signIn: function ()
        {
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(function(result)
                {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    this.userIsAuth = user;

                    eventManager.dispatch('user_state_change', this.userIsAuth);

                }.bind(this)).catch(function(error)
            {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...

                console.log('error: ' + errorMessage);
            });

            // console.log(user);

        },

        /**
         *
         */
        signOut: function ()
        {
            firebase.auth().signOut()
                .then(function()
                {
                    // Sign-out successful.
                    this.userIsAuth = null;
                    eventManager.dispatch('user_state_change', this.userIsAuth);
                }.bind(this))
                .catch(function(error)
                {
                    console.log('sign out error: ' + error);
                    // An error happened.
                });
        },

        /**
         *
         * @returns {null|*}
         */
        getUserIsAuth: function()
        {
            return this.userIsAuth;
        }
    }
});