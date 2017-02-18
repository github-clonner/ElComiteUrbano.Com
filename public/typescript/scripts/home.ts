/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="MagnificPopup" />

import * as $ from 'jquery';

class HomeScript {

    constructor() {
        this.setCarousel();
        this.initMagnificPopup();
    }

    initMagnificPopup(): void {
        $('.mfp-video-popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    setCarousel(): void {
        $(document).ready(() => {
            const SLIDE_SHOW_TIME: int = 4000;

            $('.carousel').carousel({ interval: SLIDE_SHOW_TIME, pause: null });

            // $('.loading-bar').each(function (i, element) {
            //     _this.startProgressBar($(element), SLIDE_SHOW_TIME, 10);

            //     $('.carousel').on('slide.bs.carousel', function () {
            //         _this.startProgressBar($(element), SLIDE_SHOW_TIME, 10);
            //     });
            // });
        });
    }

    // startProgressBar($element: any, time: int, delta: int): Function {
    //     let counter = 0;
    //     let width = 0;

    //     const incrementWidth = setInterval(progress, delta);

    //     function progress() {
    //         counter += delta;
    //         width = width + 100 / (time / delta);
            
    //         if (counter >= time) {
    //             counter = 0;
    //             width = 0;
    //             clearInterval(incrementWidth);
    //         }

    //         $element.css({ width: `${width}%`);
    //     };
    // }
}

export = HomeScript;