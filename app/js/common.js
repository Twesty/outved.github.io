$( document ).ready(function () {

    // Custom tabs

    {
        let wrap = $('.custom-tabs');

        wrap.each(function () {
            let tabs = $( this ).find('.custom-tabs__tab');
            let contents = $( this ).find('.custom-tabs__contents');
            let arrowPrev = $( this ).find('.custom-tabs__arrow--prev');
            let arrowNext = $( this ).find('.custom-tabs__arrow--next');

            contents.slick({
                waitForAnimate: false,
                swipe: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            adaptiveHeight: true
                        }
                    }
                ]
            });

            arrowNext.on('click', function () {
                let currentTab = $('.custom-tabs__tab.active');
                let currentTabId = parseInt(currentTab.attr('data-tab-id'));

                currentTab.removeClass('active');

                let nextTabId = currentTabId + 1;

                if(nextTabId >= tabs.length + 1) {
                    nextTabId = 1;
                }

                contents.slick('slickGoTo', nextTabId - 1);

                $('.custom-tabs__tab[data-tab-id=' + nextTabId + ']').addClass('active');
            });

            arrowPrev.on('click', function () {
                let currentTab = $('.custom-tabs__tab.active');
                let currentTabId = parseInt(currentTab.attr('data-tab-id'));

                currentTab.removeClass('active');

                let prevTabId = currentTabId - 1;

                if(prevTabId <= 0) {
                    prevTabId = tabs.length;
                }

                contents.slick('slickGoTo', prevTabId - 1);

                $('.custom-tabs__tab[data-tab-id=' + prevTabId + ']').addClass('active');
            });

            tabs.each(function () {
                $( this ).on('click', function () {
                    let tabId = $( this ).attr('data-tab-id');

                    contents.slick('slickGoTo', tabId - 1);

                    $('.custom-tabs__tab').removeClass('active');
                    $( this ).addClass('active');
                })
            })
        })
    }

    // Dropdown
    {
        let button = $('[data-dropdown]');

        button.on('click', function () {
            let target = $( this ).attr('data-dropdown-target');

            if($(target).is(':visible')) {
                $(target).slideUp(200);
            } else {
                $(target).slideToggle(200);
            }

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

    // Mobile menu show

    {
        let button = $('.header__bars');
        let menu = $('.mobile-menu');

        button.on('click', function () {
            menu.toggleClass('active');
            $( this ).toggleClass('active');
        });

        $( document ).mouseup(function(e)
        {
            let container = menu;
            let openButton = button;

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0 && !openButton.is(e.target) && openButton.has(e.target).length === 0)
            {
                container.removeClass('active');
                button.removeClass('active');
            }
        });
    }

});