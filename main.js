function doMain() {
    renderBubble();
    renderFunnel();
    renderDep();
}

function renderBubble() {
    var bubbleSeries = [];
    for (catname in catdata) {
        var catentry = {
            'name': catname,
            'data': []
        };
        for (movie in catdata[catname]) {
            catentry['data'].push({
                'name': movie,
                'value': catdata[catname][movie]['value'],
                'avg': catdata[catname][movie]['avg']
            })
        }
        bubbleSeries.push(catentry)
    }
    console.log(JSON.stringify(bubbleSeries));
    Highcharts.chart('bubbleGraph', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'TV/Movie Categories and Ratings'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.avg} / 10'
        },
        legend: {

        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '90%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 300
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: bubbleSeries
    });
}

function renderFunnel() {
    var funnelSeries = [];
    for (funnelCat in budgetData) {
        funnelSeries.push([funnelCat, budgetData[funnelCat]])
    }
    console.log(JSON.stringify(funnelSeries));
    Highcharts.chart('funnelGraph', {
        chart: {
            type: 'funnel3d',
            options3d: {
                enabled: true,
                alpha: 10,
                depth: 50,
                viewDistance: 50
            }
        },
        title: {
            text: 'Hunger Games Earnings'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> (${point.y:,.0f})',
                    allowOverlap: false,
                    y: 10
                },
                neckWidth: '30%',
                neckHeight: '25%',
                width: '80%',
                height: '80%'
            }
        },
        series: [{
            name: 'Revenue',
            data: funnelSeries
        }]
    });
}

function renderDep() {
    Highcharts.chart('depGraph', {

        title: {
            text: 'Connections'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        accessibility: {
            point: {
                descriptionFormatter: function(point) {
                    var index = point.index + 1,
                        from = point.from,
                        to = point.to,
                        weight = point.weight;

                    return index + '. From ' + from + ' to ' + to + ': ' + weight + '.';
                }
            }
        },

        series: [{
            keys: ['from', 'to', 'weight'],
            data: depSeries,
            type: 'dependencywheel',
            name: 'Dependency wheel series',
            dataLabels: {
                color: '#333',
                textPath: {
                    enabled: true,
                    attributes: {
                        dy: 5
                    }
                },
                distance: 10
            },
            size: '95%'
        }]

    });

}

document.onload = doMain();