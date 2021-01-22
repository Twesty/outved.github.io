$( document ).ready(function () {

    // Custom tabs

    {
        let wrap = $('.custom-tabs');

        wrap.each(function () {
            let tabs = $( this ).find('.custom-tabs__tabs');
            let contents = $( this ).find('.custom-tabs__contents');
            let arrowPrev = $( this ).find('.custom-tabs__arrow--prev');
            let arrowNext = $( this ).find('.custom-tabs__arrow--next');
        })
    }

    // Dropdowm
    {
        let button = $('[data-dropdown]');

        button.on('click', function () {
            let target = $( this ).attr('data-dropdown-target');

            $(target).slideToggle(200);

            $( document ).mouseup(function(e)
            {
                let container = $( target );

                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0)
                {
                    container.slideUp(200);
                }
            });
        });
    }

});