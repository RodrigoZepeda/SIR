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


function dF(S,I, beta = 1/2, gamma = 1/3){
    return {"s": - beta*S*I, "i": beta*S*I - gamma*I};
}


function SIR(S0 = 1 - 1.27e-6, I0 = 1.27e-6, beta = 1/2, gamma = 1/3, time = 50, dt = 1){
    /*
    DESCRIPTION: Function that runs the SIR ordinary differential equation model via Runge-Kutta 4 algorithm

    INPUTS: 
        S0 .- Number of initial susceptible individuals %
        I0 .- Number of initial infected individuals %
        R0 .- Number of initial removed individuals %
        beta .- Recovery
        gamma .- Recovery
        time  .- Time frame
        dt .- Time step for numerical method

    OUTPUTS:
        data .- Array with each entry defined by 
        {
            "s": number of susceptible individuals, 
            "i": number of infected individuals,
            "t": time
        }
    */

    var k1,k2,k3,k4,
        data = [{"s": S0, "i": I0, "t": 0}];
    do {
        
        k1 = dF(data[data.length - 1]["s"], data[data.length - 1]["i"], beta = beta, gamma = gamma);
        k2 = dF(data[data.length - 1]["s"] + 0.5*k1["s"]*dt, data[data.length - 1]["i"] + 0.5*k1["i"]*dt, beta = beta, gamma = gamma);
        k3 = dF(data[data.length - 1]["s"] + 0.5*k2["s"]*dt, data[data.length - 1]["i"] + 0.5*k2["i"]*dt, beta = beta, gamma = gamma);
        k4 = dF(data[data.length - 1]["s"] + k3["s"]*dt, data[data.length - 1]["i"] + k3["i"]*dt, beta = beta, gamma = gamma);

        data.push({
            "s": data[data.length - 1]["s"] + dt*(k1["s"] + 2*k2["s"] + 2*k3["s"] + k4["s"])/6.0, 
            "i": data[data.length - 1]["i"] + dt*(k1["i"] + 2*k2["i"] + 2*k3["i"] + k4["i"])/6.0, 
            "t": data[data.length - 1]["t"] + dt
        })

    } while (data[data.length - 1]["t"] < time);

    return data;
    
}