function grafico1b(x1,x2,x3){
    Plotly.purge("mappa");
    if(x1<1950 ||x1>2014 ||x2<1950 || x2>2014 ||x1>x2){
        document.getElementById("mappa").innerHTML = "<p>Inserisci anni compresi tra 1950-2014</p>";
        return;
    }
    Plotly.d3.csv("terremoti.csv", function (error, data) {
        if (error) {
            console.error(data);
            document.getElementById("mappa").innerHTML = "Cannot load data!";
            return;
        }
        document.getElementById("mappa").innerHTML = "";
        let lt = [];
        let ln = [];
        let desc = [];
        let mag = [];

        for (let i = 0; i < data.length; ++i) {
            let row = data[i];
            if(row['Year']>=x1&&row['Year']<=x2 && row['MwDef']>x3) {


                lt.push(row['LatDef']);
                ln.push(row['LonDef']);
                desc.push("Magnitudo: "+row['MwDef']+" - "+row['EpicentralArea']+"<br>Data: "+row['Year']+"-"+row['Mo']+"-"+row["Da"]);
                mag.push(row['MwDef']);
            }
        }

        let dati = [{
            type: 'scattergeo',
            lat: lt,
            lon: ln,
            mode: 'markers',
            marker: {
                size : 8,
                autocolorscale : true,
                color: mag,
                cmin: 3,
                cmax: 6.5,
                colorbar : {
                    title: "Magnitudo (Mw)"
                },
            },
            text: desc,

        }];

        let layout = {
            margin: {l: 25, r: 10, b: 20, t: 30},
            width: 600,
            height: 600,
            title: {
                text: "ScatterGeoPlot su mappa degli epicentri",
                font: {
                    family: 'Georgia, serif',
                    size: 17,

                },
            },
            geo: {
                projection: {type: "equirectangular"},
                lataxis: {range: [35, 48]},
                lonaxis: {range: [6, 19]},
                scope: "europe", resolution: "50",
                showocean: true, oceancolor: "lightblue",
            },

        };

        Plotly.plot('mappa', dati, layout);

    });
}

function grafico2 (x1, x2){
    Plotly.purge("numerosita");
    if(x1<1950 ||x1>2014 ||x2<1950 || x2>2014 ||x1>x2){
        document.getElementById("numerosita").innerHTML = "<p>Inserisci anni compresi tra 1950-2014</p>";
        return;
    }
    Plotly.d3.csv("terremoti.csv", function (error, data) {
        if (error) {
            console.error(data);
            document.getElementById("numerosita").innerHTML = "Cannot load data!";
            return;
        }
        document.getElementById("numerosita").innerHTML = "";
        const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
        let year = [];
        let qtemp = 0;
        let qta = [];
        let ytemp = 0;


        for (let i = 0; i < data.length; ++i) {
            let row = data[i];
            if(row['Year']>=x1 && row['Year']<=x2) {
                if(year.length==0)
                    year.push(row['Year']);
                if (year.includes(row['Year']))
                    qtemp++;
                else{
                    qta.push(qtemp);
                    year.push(row['Year']);
                    qtemp = 1;}
            }
        }
        qta.push(qtemp);

        let dati2 = [{
            name:'frequenza',
            mode: 'lines+markers',
            x: year,
            y: qta,

        },
            {
                name: 'media',
                mode: 'lines',
                x: year,
                y: year.map (a => arrAvg(qta)),
                line:{
                    dash: 'dashdot',
                },

            }];

        let layout2 = {
            margin: {l: 25, r: 10, b: 20, t: 30},
            width: 800,
            height: 400,
            title: {text: "Numero di terremoti per anno",
                font: {
                    family: 'Georgia, serif',
                    size: 17,
                },
            automargin: true,},
            yaxis: {range: [0,100],
            title: "Numero terremoti",
            automargin: true},
            xaxis: {
                title: "Anno",
                automargin: true
            }

        };

        Plotly.plot('numerosita', dati2, layout2);
    });



}


function grafico3 (x1, x2) {
    Plotly.purge("magalta");
    if(x1<1950 ||x1>2014 ||x2<1950 || x2>2014 ||x1>x2){
        document.getElementById("magalta").innerHTML = "<p>Inserisci anni compresi tra 1950-2014</p>";
        return;
    }
    Plotly.d3.csv("terremoti.csv", function (error, data) {
        if (error) {
            console.error(data);
            document.getElementById("magalta").innerHTML = "Cannot load data!";
            return;
        }

        document.getElementById("magalta").innerHTML = "";
        let year = [];
        let max = [];
        let epi = [];
        let mtemp = 0;
        let etemp;


        for (let i = 0; i < data.length; ++i) {
            let row = data[i];
            if (row['Year'] >= x1 && row['Year'] <= x2) {
                if (year.length == 0)
                    year.push(row['Year']);
                if (year.includes(row['Year'])){
                    if(row['MwDef']>mtemp){
                        mtemp = row['MwDef'];
                        etemp = row['EpicentralArea']
                    }}
                else {
                    max.push(mtemp);
                    epi.push("Località: "+etemp);
                    year.push(row['Year']);
                    mtemp = row['MwDef'];
                }
            }
        }
        max.push(mtemp);
        epi.push(etemp);

        let dati2 = [{

            type:'scatter',
            x:year,
            y:max,
           // width: 0.7,
            text: epi,
           // opacity: 0.7,
            mode: 'markers',
            marker: {
                color: 'rgba(222,45,38,0.8)',
                size: 8,
                line: {
                    color: 'rgb(107,29,16)',
                    width: 1.5
                }
            }

        }];

        let layout2 = {
            margin: {l: 25, r: 25, b: 30, t: 30},
            width: 900,
            height: 400,
            title: {
                text: "Magnitudo più alta per anno",
                font: {
                    family: 'Georgia, serif',
                    size: 17,
                },
                automargin: true,
            },


            yaxis: {
                range:[4 ,7],
                title: "Magnitudo",
                automargin: true
            },
            xaxis:{
                title: "Anno",
                automargin: true
            }




        };

        Plotly.plot('magalta', dati2, layout2);
    });
}




function grafico4 () {
    Plotly.purge("numperluogo");
    Plotly.d3.csv("terremoti.csv", function (error, data) {
        if (error) {
            console.error(data);
            document.getElementById("numperluogo").innerHTML = "Cannot load data!";
            return;
        }


        let epi = [];
        let qta = [];
        let numLoc = new Array();


        for(let i=0; i<data.length; i++) {
            let row = data[i];
            if(row['Year']>=1950) {
                if (!epi.includes(row['EpicentralArea'])) {
                    epi.push(row['EpicentralArea']);
                    qta.push(1);
                } else {
                    for (let j = 0; j < epi.length; j++) {
                        if (epi[j] == (row['EpicentralArea'])) {
                            qta[j]++;
                        }
                    }
                }
            }
        }

        for (let j = 0; j < epi.length; j++){
            if(qta[j]<20){
                qta.splice(j,1);
                epi.splice(j,1);
                j--;
            }
        }

        let dati2 = [{
            type:'bar',
            x:qta,
            y:epi,
            orientation: 'h',

            transforms:[{
                type: 'sort',
                target: 'x',
                order: 'ascending'
            }],
            opacity: 0.6,
            marker: {
                color: 'rgb(225,112,66)',
                line: {
                    color: 'rgb(107,29,16)',
                    width: 1.5
                }
            }

        }];

        let layout2 = {
            margin: {l: 200, r: 10, b: 20, t: 30},
            width: 700,
            height: 600,
            title:{text: "Numerosità di eventi per località",
                font: {
                    family: 'Georgia, serif',
                    size: 17,
                },
                automargin: true,
            },

            xaxis:{
                title: "Numero terremoti",
                automargin: true
            }



        };

        Plotly.plot('numperluogo', dati2, layout2);
    });
}


