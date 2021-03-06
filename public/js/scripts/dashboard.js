define(["require", "exports", "jquery", "firebase", "bootstrap", "bootstrap_validator"], function (require, exports, $, firebase) {
    "use strict";
    var Dashboard = (function () {
        function Dashboard(opts) {
            var _this = this;
            _this.initializeFirebase(opts);
            _this.initializeCreatePromo();
        }
        Dashboard.prototype.initializeFirebase = function (opts) {
            firebase.initializeApp(opts.FIREBASE);
            firebase.auth().getRedirectResult().then(function (response) {
                var result = response;
                var session = JSON.parse(window.sessionStorage.getItem('fb_usc'));
                if (session && session.credential) {
                    result = session;
                }
                if (!result.credential) {
                    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
                }
                window.sessionStorage.setItem('fb_usc', JSON.stringify(result));
            }).catch(function (error) { return console.log(error); });
        };
        Dashboard.prototype.initializeCreatePromo = function () {
            var $form = $('#create-promo-form');
            $form.validator().on('submit', function (e) {
                var is_valid = !e.isDefaultPrevented();
                if (!is_valid) {
                    return;
                }
                e.preventDefault();
                var file = e.target[3].files[0];
                if (!file) {
                    var form_data = "" + $($form).serialize();
                    ajax(form_data);
                    return false;
                }
                $($form).find(':submit').attr('disabled', 'disabled');
                var uploadTask = firebase.storage().ref().child("media/" + file.name).put(file, { contentType: file.type });
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $($form).find(':submit').html("Uploading... " + parseInt(progress, 10) + "%");
                }, function (error) { return console.log(error); }, function () {
                    $($form).find(':submit').html("Saving...");
                    var form_data = $($form).serialize() + "&downloadUrl=" + uploadTask.snapshot.downloadURL;
                    ajax(form_data);
                });
                function ajax(data) {
                    $.ajax({
                        url: '/dashboard/create/promo',
                        method: 'post',
                        data: data
                    }).then(function (res) {
                        $($form).find(':submit').html("Done");
                        window.location.replace('/dashboard');
                    });
                }
            });
        };
        return Dashboard;
    }());
    return Dashboard;
});
