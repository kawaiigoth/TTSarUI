import App from './index.jsx';
/*
(function () {
    var Form = document.getElementById('UserForm');
    document.getElementById('parent').addEventListener('click',function(e) {
        console.log("you clicked " + e.target);
        console.log(this.id);
        e.preventDefault();
    });
    if (Form.addEventListener) {
        Form.addEventListener("submit", function (e) {
            alert(this.id);
            e.preventDefault();
            Send();
            return false;  //This doesn't prevent the form from submitting.
        }, false);  //Modern browsers
    } else if (Form.attachEvent) {
        Form.attachEvent('onsubmit', function (e) {
            e.preventDefault();
            Send();
            return false;  //This doesn't prevent the form from submitting.
        });            //Old IE
    }

    function Send() {
        "use strict";
        var fd = new FormData(Form);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('location', position.coords.latitude);
                fd.append('latitude', position.coords.latitude);
                fd.append('longitude', position.coords.longitude);
                ajaxCall();
            });
        } else {
            ajaxCall();
        }


        var myHeaders = new Headers();

        function ajaxCall() {
            fetch("/api/send-message",
                {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: fd
                })
                .then(function (res) {
                    if (res.status >= 200 && res.status < 300) {
                        return res.statusText;
                    } else {
                        var error = new Error(res.statusText);
                        error.response = res;
                        throw error
                    }
                })
                .then(function (data) {
                    Form.reset();

                }).catch(function (error) {
                console.log(error);
            });
        }


    }
}());*/
