var Plugin = function () {
    var consolex = {
        log: function(msg) {},
    }
    function getParentName() {
        const urlParams = new URLSearchParams(window.location.search);
        const parentValue = urlParams.get('parent');
        console.log("Parent value:", parentValue);
        return parentValue
    }
    function getOrElse(value, defvalue) {
        if (value === null) {
            return defvalue
        } else
        if (typeof(value) === 'undefined') {
            return defvalue
        } else {
            return value
        }
    }

    function getWindowDimensions () {
        const width = window.innerWidth
        const height = window.innerHeight
        //console.log(`Window size is ${width}x${height}`);
        return {
            width: width,
            height: height,
        }
    }

    //traverse()

    function load () {}

    return {
        loadClients: function (classname) {
            const viewheight = getWindowDimensions().height
            const objectlist = document.getElementsByClassName(classname)
            function loadPortfolio(index, scale) {
                if (index < objectlist.length) {
                    const obj = objectlist[index]
                    const start = 0
                    const height = 500
                    const padding = viewheight - height - start * scale
                    const name = classname
                    const options = {
                        translateY: (0 -  start),
                        padding: padding,
                        tailing: 0,
                        offset: start,
                        ScrollMap: name,
                        ParentName: name
                    }
                    console.log("Plugin client options: " + JSON.stringify(options))
                    Portfolio(false, options)
                    loadPortfolio(index + 1, scale)
                }
            }
            loadPortfolio(0, 1)
            return this
        },
        loadServer: function (scrolltarget, delay) {
            const portfolio = Portfolio(true, {
                "ParentName": getParentName(),
                "LoadFunc": load,
                "ScrollTarget": scrolltarget,
                "translateY": 0
            })
            window.setTimeout(() => {
                console.log("set height: loadServer timer delay; parent: " + getParentName())
                portfolio.setHeight()
            }, getOrElse(delay, 3000))
            return this
        }
    }
}