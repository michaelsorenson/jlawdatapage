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
            useHTML: true,
            text: '<b>Jennifer Lawrence TV/Movie Categories and Rating</b>' +
            '<br><b>Size</b> = popularity of movie in terms of number of reviews' + 
            '<br><b>Hover</b> over movies to see average rating' +
            '<br><b>Note:</b> Movies can be part of multiple categories (click a ' +
            '<br>category on the bottom to remove/add that category)'
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
            useHTML: true,
            text: '<b>Total Earnings and Breakdown of "The Hunger Games"</b>' +
            '<br>Starting with total revenue, then international, then breaking ' +
            '<br>domestic revenue down by week'
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
            useHTML: true,
            text: '<b>Connection of Actors through Jennifer Lawrence</b>' +
            '<br><b>Connections:</b> Actors are connected if they were in a movie' +
            '<br>together that Jennifer Lawrence was also in, with their connection' +
            '<br>value being the number of movies in common between them'
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