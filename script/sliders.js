/*
MIT LICENSE 
    Copyright 2018 Rodrigo Zepeda
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
    associated documentation files (the "Software"), to deal in the Software without restriction, 
    including without limitation the rights to use, copy, modify, merge, publish, distribute, 
    sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
    is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial 
    portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


//Initial values for parameters
var Initial_Values = {"S": 75.55, "I": 24.45, "Beta": 0.24, "Gamma": 0.06}, 
    Ranges         = {"S"    : {"min": 0, "max": 100},
                      "I"    : {"min": 0, "max": 100},
                      "Beta" : {"min": 0, "max": 1},
                      "Gamma": {"min": 0, "max": 1}};
    suffixes = {"S": "%","I": "%","Beta": "contact/day", "Gamma": "infection/day"};


function setsliders(Initial_Values, Ranges, suffixes, plotparams){

    //Get sliders
    var slider = document.getElementsByClassName('uislider');
    [].slice.call(slider).forEach(function(slider, index ){
        noUiSlider.create(slider, {
            start: [ Initial_Values[slider.id] ],
            step: 0.01,
            behaviour: 'snap',
            connect: [true, false],
            range: {
                'min': Ranges[slider.id]["min"],
                'max': Ranges[slider.id]["max"]
            },
            tooltips: true,
            format: wNumb({
                decimals: 2,
                suffix: ' ' + suffixes[slider.id],
            })
        });
    });

    var Sslider     = document.getElementById("S");
    var Islider     = document.getElementById("I");
    var betaslider  = document.getElementById("Beta");
    var gammaslider = document.getElementById("Gamma");

    Sslider.noUiSlider.on('slide', function(values, handle){
        var Sval = Sslider.noUiSlider.get();
            Sval = Number(Sval.substring(0, Sval.length - suffixes["S"].length));

        var Ival = Islider.noUiSlider.get();
            Ival = Number(Ival.substring(0, Ival.length - suffixes["I"].length));

        var betaval = betaslider.noUiSlider.get();
            betaval = Number(betaval.substring(0, betaval.length - suffixes["Beta"].length));

        var gammaval = gammaslider.noUiSlider.get();
            gammaval = Number(gammaval.substring(0, gammaval.length - suffixes["Gamma"].length));
        
        Islider.noUiSlider.set(100 - Sval);

        removePlotdata();
        var newdata = SIR(Sval/100, Ival/100, betaval, gammaval);
        setPlotdata(plotparams, newdata);

    });

    Islider.noUiSlider.on('slide', function(values, handle){
        var Sval = Sslider.noUiSlider.get();
            Sval = Number(Sval.substring(0, Sval.length - suffixes["S"].length));

        var Ival = Islider.noUiSlider.get();
            Ival = Number(Ival.substring(0, Ival.length - suffixes["I"].length));
        
        Sslider.noUiSlider.set(100 - Ival);

        var betaval = betaslider.noUiSlider.get();
        betaval = Number(betaval.substring(0, betaval.length - suffixes["Beta"].length));

        var gammaval = gammaslider.noUiSlider.get();
            gammaval = Number(gammaval.substring(0, gammaval.length - suffixes["Gamma"].length));
        
        removePlotdata();
        var newdata = SIR(Sval/100, Ival/100, betaval, gammaval);
        setPlotdata(plotparams, newdata);
    });

    betaslider.noUiSlider.on('slide', function(values, handle){
        var Sval = Sslider.noUiSlider.get();
            Sval = Number(Sval.substring(0, Sval.length - suffixes["S"].length));

        var Ival = Islider.noUiSlider.get();
            Ival = Number(Ival.substring(0, Ival.length - suffixes["I"].length));

        var betaval = betaslider.noUiSlider.get();
            betaval = Number(betaval.substring(0, betaval.length - suffixes["Beta"].length));

        var gammaval = gammaslider.noUiSlider.get();
            gammaval = Number(gammaval.substring(0, gammaval.length - suffixes["Gamma"].length));

        removePlotdata();
        var newdata = SIR(Sval/100, Ival/100, betaval, gammaval);
        setPlotdata(plotparams, newdata);

    });

    gammaslider.noUiSlider.on('slide', function(values, handle){
        var Sval = Sslider.noUiSlider.get();
            Sval = Number(Sval.substring(0, Sval.length - suffixes["S"].length));

        var Ival = Islider.noUiSlider.get();
            Ival = Number(Ival.substring(0, Ival.length - suffixes["I"].length));

        var betaval = betaslider.noUiSlider.get();
            betaval = Number(betaval.substring(0, betaval.length - suffixes["Beta"].length));

        var gammaval = gammaslider.noUiSlider.get();
            gammaval = Number(gammaval.substring(0, gammaval.length - suffixes["Gamma"].length));

        removePlotdata();
        var newdata = SIR(Sval/100, Ival/100, betaval, gammaval);
        setPlotdata(plotparams, newdata);

    });

};