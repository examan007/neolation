activeImage();
function activeImage () {
    var funcname = 'activeimage';
    console.log(funcname + '(); executing');
    var classes = [{
            name: 'first-slide',
            width: 332,
            height: 152
        },{
            name: 'second-slide',
            width: 324,
            height: 155
        },{
            name: 'third-slide',
            width: 324,
            height: 242
        }
    ];
    function resize() {
        var minH = parseInt($(window).height());
        var minW = parseInt($(window).width());
        var maxH = 475;
        for (c in classes) {
            var name = classes[c].name;
            var imgs = document.getElementsByClassName(name);
            var i;
            for (i = 0; i < imgs.length; i++) {
                try {
                    var height = Math.trunc(minW * classes[c].height / classes[c].width);
                    var width = minW;
                    if (height > maxH) {
                        width = Math.trunc(maxH * classes[c].width / classes[c].height);
                        if (width > minW) {
                            width = minW;
                        }
                        height = Math.trunc(width * classes[c].height / classes[c].width);
                    }
                    $(imgs[i]).width(width);
                    $(imgs[i]).height(height);
                    console.log('width=[' + width + '] minW=[' + minW + ']');
                    console.log('height=[' + height + '] minH=[' + minH + ']');
                } catch (e) {
                    console.log('resize ' + e.toString());
                }
                console.log(imgs[i]);
            }
        }
    }
    $(window).resize(resize);
    resize();
}