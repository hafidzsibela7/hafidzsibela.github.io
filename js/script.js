(function ($) {

    "use strict";


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $("#navbar");
        var navLinks = $("#navbar > ul > li > a[href^='#']");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("#navbar .close-navbar");

        openBtn.on("click", function () {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function () {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })

        navLinks.on("click", function () {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        })
    }

    toggleMobileNavigation();


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function () {
                var height = $(this).position().top;
                var resize = height - $(window).scrollTop();
                var doParallax = -(resize / 5);
                var positionValue = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function () {
                var $this = $(this);
                var img = $this.children(img);
                var imgSrc = img.attr("src");

                $this.css({
                    backgroundImage: "url(" + imgSrc + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    // Flower pattern parallax setting
    function parallaxFlower() {
        if ($(".parallax-flower").length) {
            $(".parallax-flower").each(function () {
                var height = $(this).position().top;
                var resize = height - $(window).scrollTop();
                var doParallax = -(resize / 3);
                var pValueTopImg = doParallax + "px";
                var pvalueBtmImg = doParallax + "px";
                var img1 = $(this).data("bg-image-top");
                var img2 = $(this).data("bg-image-bottom");

                $(this).css({
                    backgroundImage: "url(" + img1 + ")" + ", " + "url(" + img2 + ")",
                    backgroundPosition: "0%" + pValueTopImg + ", " + "100%" + pvalueBtmImg
                });

            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function () {

                //active wow
                wow.init();

                // Call slider parallax function
                sliderBgSetting();

                //Active heor slider
                if ($(".hero-slider").length) {
                    $(".hero-slider").owlCarousel({
                        items: 1,
                        autoplay: true,
                        loop: true,
                        animateOut: 'fadeOut'
                    });
                }
            });
        }
    }



    /*------------------------------------------
        = ACTIVE CURRENT MENU WHILE SCROLLING
    -------------------------------------------*/
    // function for active menuitem
    var sections = $("section"),
        nav = $("#navbar"),
        nav_height = nav.outerHeight();

    function activeMenuItem() {
        var cur_pos = $(window).scrollTop() + 2;
        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("ul > li > a").parent().removeClass("active");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("active");
            } else if (cur_pos === 2) {
                nav.find("ul > li > a").parent().removeClass("active");
            }
        });
    }

    // smooth-scrolling
    $(function () {
        $("#navbar > ul > li > a[href^='#']").on("click", function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - 60
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }

            return false;
        });
    });


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/
    $(window).on("scroll", function () {
        var header = $("#header");
        var scroll = $(window).scrollTop();
        var top = $(".hero").height();

        if (scroll > top) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    });


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: true, // default
        live: true // default
    });


    /*------------------------------------------
        = BIGDAY COUNTDOWN
    -------------------------------------------*/
    if ($("#clock").length) {
        $('#clock').countdown('2023/05/14 20:00:00', function (event) {
            var $this = $(this).html(event.strftime('' +
                '<div class="box"><div>%D</div> <span>Hari</span> </div>' +
                '<div class="box"><div>%H</div> <span>Jam</span> </div>' +
                '<div class="box"><div>%M</div> <span>Menit</span> </div>' +
                '<div class="box"><div>%S</div> <span>Detik</span> </div>'));
        });
    }

    // // Target tanggal akhir countdown
    // const countDownDate = new Date("May 14, 2023 20:00:00").getTime();

    // // Perbarui hitungan mundur setiap 1 detik
    // const x = setInterval(function () {

    //     // Dapatkan waktu sekarang
    //     const now = new Date().getTime();

    //     // Hitung selisih waktu antara sekarang dan tanggal akhir countdown
    //     const distance = countDownDate - now;

    //     // Hitung waktu tersisa dalam hari, jam, menit, dan detik
    //     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //     // Tampilkan waktu tersisa dalam elemen dengan id "countdown"
    //     document.getElementById("clock").innerHTML = "Countdown: " + days + "d " + hours + "h " +
    //         minutes + "m " + seconds + "s ";



    /*------------------------------------------
        = THE WEDDING
    -------------------------------------------*/
    function eventClothFadeOut() {
        if ($(".events .event-boxes").length) {
            var eventBoxes = $('.event-boxes');
            var leftHalf = eventBoxes.find(".left-half");
            var rightHalf = eventBoxes.find(".right-half");
            var clip = eventBoxes.find(".clip");

            // If not ie and ie < 10 then do
            if (isIE() && !isIE() < 10) {
                leftHalf.css({
                    left: "-100%"
                });
                rightHalf.css({
                    right: "-100%"
                });

                clip.css({
                    opacity: 0
                })
            } else { // Not ie or geter than ie 10
                leftHalf.css({
                    left: 0
                });
                rightHalf.css({
                    right: 0
                });
            }

            eventBoxes.appear();
            $(document.body).on('appear', '.event-boxes', function () {
                if (!leftHalf.hasClass('appeared') || rightHalf.hasClass("appeared")) {
                    leftHalf.addClass('appeared slideOutLeft');
                    rightHalf.addClass('appeared slideOutRight');
                    clip.addClass('appeared clip-fade-out');
                }
            });

            $(document.body).on('disappear', '.event-boxes', function () {
                if (rightHalf.hasClass('appeared') || leftHalf.hasClass('appeared')) {
                    rightHalf.removeClass('appeared slideOutRight');
                    leftHalf.removeClass('appeared slideOutLeft');
                    clip.removeClass('appeared clip-fade-out');
                }
            });
        };
    }

    eventClothFadeOut();


    /*------------------------------------------
        = ACTIVE BQUOTE SLIDER
    -------------------------------------------*/
    if ($(".bquotes-slider").length) {
        $(".bquotes-slider").owlCarousel({
            items: 1,
            loop: true
        });
    }


    /*------------------------------------------
        = ACTIVE GROOMSMEN SLIDER
    -------------------------------------------*/
    if ($(".groomsmen-slider").length) {
        $(".groomsmen-slider").owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            dots: false,
            mouseDrag: false
        });
    }


    /*------------------------------------------
        = ACTIVE GROOMSMEN SLIDER
    -------------------------------------------*/
    if ($(".bridesmaids-slider").length) {
        $(".bridesmaids-slider").owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            dots: false,
            mouseDrag: false
        });
    }



    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            wrapCSS: "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid = $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();


    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/
    function map() {

        var locations = [
            ['Hotel royal international khulna ', -2.060969, 125.983422, 1],
            ['City inn khulna', -2.060969, 125.983422, 2],
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(-2.060969, 125.983422),
            zoom: 12,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: 'images/map-marker.png'
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    };


    /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
    if ($("#rsvp-form").length) {
        $("#rsvp-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",

                guest: {
                    required: true
                },

                events: {
                    required: true
                }

            },

            messages: {
                name: "Masukkan Nama",
                email: "Masukkan Email",
                guest: "Select your number of guest",
                events: "Pilih Kehadiran",
                notes: "Berikan Ucapan Untuk Kedua Mempelai"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $("#loader").hide();
                        $("#success").slideDown("slow");
                        setTimeout(function () {
                            $("#success").slideUp("slow");
                        }, 3000);
                        form.reset();
                    },
                    error: function () {
                        $("#loader").hide();
                        $("#error").slideDown("slow");
                        setTimeout(function () {
                            $("#error").slideUp("slow");
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
    $(window).on('load', function () {
        preloader();

        bgParallax();

        sliderBgSetting();

        parallaxFlower();

        masonryGridSetting();

        if ($(".map").length) {
            map();
        }
    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function () {
        activeMenuItem();

        bgParallax();

        parallaxFlower();
    });


})(window.jQuery);