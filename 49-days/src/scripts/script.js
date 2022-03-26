AFRAME.registerComponent('handle-events', {
    init: function () {
        var el = this.el;  // <a-box>
        // 遊戲說明
        el.addEventListener('mouseenter', function () {
            el.setAttribute('position', '0 0 10000')
            el.setAttribute('visible', false)
            bg.setAttribute('src', '#imgbg02')
            startbtn.setAttribute('visible', true)
            startbtn.setAttribute('position', '0 -1 -6')
        });
        // 開始遊戲
        startbtn.addEventListener('mouseenter', function () {
            startbtn.setAttribute('position', '0 0 10000')
            startbtn.setAttribute('visible', false)
            bg.setAttribute('src', '#imgbg03')
            no01.setAttribute('visible', true)
            no01.setAttribute('position', '-4.98 2 1.11')
            scary01.setAttribute('position', '-6.58 12.99 -17.16')
            scary02.setAttribute('position', '-20 -12.18 0')
            scary03.setAttribute('position', '15 0 0')
            scary04.setAttribute('position', '0 0 22')
            scary05.setAttribute('position', '6.76 20 0')
            scary06.setAttribute('position', '28.91 -16.94 -25.51')
            scary07.setAttribute('position', '12.55 10.5 -10.07')
        });
        // 數字01被找到
        no01.addEventListener('mouseenter', function () {
            no02.setAttribute('visible', true)
            no02.setAttribute('position', '6.2 9.17 -5.76')
            findit.setAttribute('visible', true)
            findit.setAttribute('position', '-4.98 2 1.11')
            findit.setAttribute('rotation', '0 93.39 0')
        });
        // 數字02被找到
        no02.addEventListener('mouseenter', function () {
            no03.setAttribute('visible', true)
            no03.setAttribute('position', '-8.41 7.81 -16.14')
            no01.setAttribute('visible', false)
            no01.setAttribute('position', '0 0 100000')
            findit.setAttribute('position', '6.2 9.17 -5.76')
            findit.setAttribute('rotation', '6.302535746439055 -56.14986392282068 -2.291831180523293')
        });
        // 數字03被找到
        no03.addEventListener('mouseenter', function () {
            no04.setAttribute('visible', true)
            no04.setAttribute('position', '3.15 8.51 14.28')
            no02.setAttribute('visible', false)
            no02.setAttribute('position', '0 0 100000')
            findit.setAttribute('position', '-8.41 7.81 -16.14')
            findit.setAttribute('rotation', '30.939720937064457 38.96113006889598 20.626480624709636')
        });
        // 數字04被找到
        no04.addEventListener('mouseenter', function () {
            no05.setAttribute('visible', true)
            no05.setAttribute('position', '5.85 -6.61 0.42')
            no03.setAttribute('visible', false)
            no03.setAttribute('position', '0 0 100000')
            findit.setAttribute('position', '3.15 8.51 14.28')
            findit.setAttribute('rotation', '31.51267873219528 -154.12564689019143 1.1459155902616465')
        });
        // 數字05被找到
        no05.addEventListener('mouseenter', function () {
            refindbtn.setAttribute('visible', true)
            refindbtn.setAttribute('position', '1.5 0 -6')
            no04.setAttribute('visible', false)
            no04.setAttribute('position', '0 0 100000')
            findit.setAttribute('position', '5.85 -6.61 0.42')
            findit.setAttribute('rotation', '-53.285074947166564 -79.64113352318442 -2.291831180523293')
            anserbtn.setAttribute('visible', true)
            anserbtn.setAttribute('position', '-1.5 0 -6')
            bg.setAttribute('src', '#imgbg04')
        });
        // 重找數字
        refindbtn.addEventListener('mouseenter', function () {
            no05.setAttribute('visible', false)
            no05.setAttribute('position', '0 0 100000')
            refindbtn.setAttribute('visible', false)
            refindbtn.setAttribute('position', '0 0 10000')
            anserbtn.setAttribute('visible', false)
            anserbtn.setAttribute('position', '0 0 10000')
            findit.setAttribute('visible', false)
            findit.setAttribute('position', 'position', '0 0 10000')
            no01.setAttribute('visible', true)
            no01.setAttribute('position', '-4.98 2 1.11')
            bg.setAttribute('src', '#imgbg03')
        });
        // 回答問題
        anserbtn.addEventListener('mouseenter', function () {
            refindbtn.setAttribute('visible', false)
            refindbtn.setAttribute('position', '0 0 10000')
            anserbtn.setAttribute('visible', false)
            anserbtn.setAttribute('position', '0 0 10000')
            findit.setAttribute('visible', false)
            findit.setAttribute('position', 'position', '0 0 10000')
            no05.setAttribute('visible', false)
            no05.setAttribute('position', '0 0 100000')
            bg.setAttribute('src', '#imgbg05')
            gotoanserbtn.setAttribute('visible', true)
            gotoanserbtn.setAttribute('position', '0 0 -6')
        });
        // 嚇人
        scary01.addEventListener('mouseenter', function () {
            scary01.setAttribute('position', '-1 3 -2')
            scary01.setAttribute('animation', 'property: position; to: 1 -2 2;dur: 800;')
            scary01.setAttribute('src', '#imgscary01')
            scary01.setAttribute('opacity', '0.99')
        });
        scary02.addEventListener('mouseenter', function () {
            scary02.setAttribute('position', '-2 -1 0')
            scary02.setAttribute('animation', 'property: position; to: 2 3.5 0;dur: 800;')
            scary02.setAttribute('src', '#imgscary02')
            scary02.setAttribute('opacity', '0.99')
        });
        scary03.addEventListener('mouseenter', function () {
            scary03.setAttribute('position', '2 1 0')
            scary03.setAttribute('animation', 'property: position; to: -2 1 0;dur: 800;')
            scary03.setAttribute('src', '#imgscary03')
            scary03.setAttribute('opacity', '0.99')
        });
        scary04.addEventListener('mouseenter', function () {
            scary04.setAttribute('position', '0 1 2')
            scary04.setAttribute('animation', 'property: position; to: 0 1 -2;dur: 800;')
            scary04.setAttribute('src', '#imgscary04')
            scary04.setAttribute('opacity', '0.99')
        });
        scary05.addEventListener('mouseenter', function () {
            scary05.setAttribute('position', '2 7 0')
            scary05.setAttribute('animation', 'property: position; to: -2.76 -3 0;dur: 800;')
            scary05.setAttribute('src', '#imgscary05')
            scary05.setAttribute('opacity', '0.99')
        });
        scary06.addEventListener('mouseenter', function () {
            scary06.setAttribute('position', '3 -0.6 -3.5')
            scary06.setAttribute('animation', 'property: position; to: -2 1.6 2.5;dur: 800;')
            scary06.setAttribute('src', '#imgscary06')
            scary06.setAttribute('opacity', '0.99')
        });
        scary07.addEventListener('mouseenter', function () {
            scary07.setAttribute('position', '2.2 3 -2.5')
            scary07.setAttribute('animation', 'property: position; to: -2.2 0 2;dur: 800;')
            scary07.setAttribute('src', '#imgscary07')
            scary07.setAttribute('opacity', '0.99')
        });
    }
});