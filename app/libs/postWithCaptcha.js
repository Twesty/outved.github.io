jQuery(document).ready(function ($) {
    //console.log(location.hostname);
    $('form.outved-send-form').submit(function() {
    	var outvedForm = $(this);
    	var outvedAction = $(this).attr('action');
        //if russian/english ver.
        if(location.hostname == 'outved.pro'){
            var reCaptchaKey = '6LfbFrkUAAAAAJPe6m0lWVzAhYs1FLGnMIrgk_NI';
        }else{
            var reCaptchaKey = '6LcKY8EUAAAAAJC7kdrIDvtAO4eJWHGSCazft9Bj';
        }
        // go reCaptcha3
        grecaptcha.ready(function() {
            grecaptcha.execute(reCaptchaKey, {action: 'send_form'}).then(function(token) {
                var formOrderData = outvedForm.serialize() + '&captcha=' + token + '&action=send_form';
                $.post(outvedAction, formOrderData).done(function(data) {
                    data = JSON.parse(data);
                    //console.log(data.status);
                    if(data.status == 'error'){
                        alert(data.content);
                    }else{

                        successUrl = outvedForm.find('input[name=success__url]').attr('value');

                        if(typeof successUrl !== "undefined"){
                            window.location = successUrl;
                        }else{
                            window.location = "https://outved.pro/thanks/";
                        }

                    }
                });
            },'json');
        });
        return false;
    });
});