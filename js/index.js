(function($) {

    new WOW().init();

    // dropdown hover
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseover', function() {
        dropdownMenu.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', function() {
        dropdownMenu.style.display = 'none';
    });

    // nhảy số phần giới thiệu
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // weather
    const APP_ID = 'cf26e7b2c25b5acd18ed5c3e836fb235';
    const DEFAULT_VALUE = '--';
    const searchInput = document.querySelector('#search-input');
    const cityName = document.querySelector('.city-name');
    const weatherState = document.querySelector('.weather-state');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');


    const sunrise = document.querySelector('.sunrise');
    const sunset = document.querySelector('.sunset');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind-speed');


    searchInput.addEventListener('change', (e) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
            .then(async res => {
                const data = await res.json();
                console.log('[Search Input]', data);
                cityName.innerHTML = data.name || DEFAULT_VALUE;
                weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
                weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
                temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

                sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
                sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
                humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
                windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
            });
    });


})(jQuery);