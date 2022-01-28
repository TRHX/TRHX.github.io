document.addEventListener('DOMContentLoaded', function () {
    // auto dark
    // var hour = new Date().getHours();
    // if (hour >= 18 || hour <= 6) {
    //     bw();
    // }
    bw()

    function updateClock() {
        var now = new Date();
        document.getElementById('time').innerHTML = now
        .toLocaleTimeString('en-US', {
            timeZone: 'Asia/Shanghai',
            timeZoneName: 'short',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: "numeric"
        })
        .replace(/:/g, ' : ');
        // document.getElementById('time').innerHTML = now
        //     .toLocaleTimeString('en-US', {
        //         timeZone: 'America/Los_Angeles',
        //         hour12: false,
        //         hour: 'numeric',
        //         minute: 'numeric',
        //         // second: "numeric"
        //     })
        //     .replace(/:/g, ' : ');

        // call this function again in 1000ms
        setTimeout(updateClock, 1000);
    }
    updateClock(); // initial call;

    function bw() {
        if (
            getComputedStyle(document.documentElement)
                .getPropertyValue('--background')
                .trim() == '#fff'
        ) {
            document.documentElement.style.setProperty('--primary', '#f6f6f6');
            document.documentElement.style.setProperty('--background', '#111');
        } else {
            document.documentElement.style.setProperty('--primary', '#353535');
            document.documentElement.style.setProperty('--background', '#fff');
        }
    }

    document.getElementById('where').addEventListener(
        'click',
        function (event) {
            bw();
        },
        false
    );

    function hoverWhere() {
        var sections = document.getElementsByClassName('section');
        for (var i = 0; i < sections.length; i++) {
            sections[i].addEventListener('mouseenter', function () {
                this.querySelector('.where').classList.add('vis');
            });
            sections[i].addEventListener('mouseleave', function () {
                this.querySelector('.where').classList.remove('vis');
            });
        }
    }
    hoverWhere();
});

function toggleDetail(e) {
    // var detailItem = e.currentTarget.querySelector('.details');
    var detailItem = e.currentTarget.nextElementSibling;
    detailItem.classList.toggle('vis');
}

function toggleSections(e) {
    // e.currentTarget.nextElementSibling.classList.toggle('vis')
    var detailItems =
        e.currentTarget.nextElementSibling.querySelectorAll('.details');
    for (var i = 0; i < detailItems.length; i++) {
        // console.log(detailItems[i]);
        detailItems[i].classList.add('vis');
    }
}
