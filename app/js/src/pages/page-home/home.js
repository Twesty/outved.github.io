$( document ).ready(function () {

    // Cover tabs open

    {
        let tabs = $('.cover-tab');

        tabs.each(function () {
            let container = $( this );
            let content = container.find('.cover-tab__content');
            let button = container.find('.cover-tab__expand-button');

            container.on('click', function () {
                if(content.is(':visible')) {
                    content.slideUp(200);
                    button.removeClass('active');
                } else {
                    $('.cover-tab__content').slideUp(200);
                    $('.cover-tab__expand-button').removeClass('active');

                    content.slideToggle(200);
                    button.toggleClass('active');
                }
            });

            $( document ).mouseup(function(e)
            {
                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0)
                {
                    content.slideUp(200);
                    button.removeClass('active');
                }
            });

        });
    }

});