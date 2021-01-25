window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());

gtag('config', 'UA-34011940-1');

setTimeout(function () {
    gtag('event', location.pathname, {
        'event_category': 'Новый посетитель'
    });
}, 10000);