var perc_80;
var perc_60;
var perc_40;
var perc_20;

function generateAccessibilty(data, total_80, total_60, total_40, total_20) {




    perc_80 = total_80;
    perc_60 = total_60;
    perc_40 = total_40;
    perc_20 = total_20;

    addLegend();
    L.geoJson(data,
            {
                style: style,
                onEachFeature: onEachFeature
            }
    ).addTo(map);

    googlegeocode(309233);

}



function getColor(d) {

    return d > perc_80 ? "#00FF00" :
            d > perc_60 ? "#CCFF00" :
            d > perc_40 ? "#FFFF00" :
            d > perc_20 ? "#FF9900" :
            "#FF0000";

}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 0.1,
        opacity: 1,
        fillOpacity: 0.7
    };
}
function addLegend() {
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, Math.round(perc_20 * 100) / 100,
                    Math.round(perc_40 * 100) / 100,
                    Math.round(perc_60 * 100) / 100,
                    Math.round(perc_80 * 100) / 100],
                //grades = scale,
                labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 0.2) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
}

// If wanna add feature to each layer can do it here 
// L.geoJson(test, {style: style,onEachFeature: onEachFeature}).addTo(map);
function onEachFeature(feature, layer) {
    layer.on("click", function (e) {
        //alert("hawkercentre: " + feature.properties.hawkercentre_score);
        starplot(feature);
    });
}

function starplot(feature) {
    
    var data = [
        {
            "Overall": feature.properties.density,
            "Result": feature.properties.result,
            "Full": feature.properties.full_mark,
            "Hawkercentre": feature.properties.hawkercentre_score,
            "Childcare": feature.properties.childcare_score,
            "Chasclinics": feature.properties.chasclinic_score
        }
    ];
    var margin = {
        top: 32,
        right: 50,
        bottom: 20,
        left: 50
    };
    var width = 240 - margin.left - margin.right;
    var height = 240 - margin.top - margin.bottom;
    var labelMargin = 8;

    var scale = d3.scale.linear()
            .domain([0, 5])
            .range([0, 100]);


    var star = d3.starPlot()
            .width(width)
            .properties([
                'Hawkercentre',
                'Childcare',
                'Chasclinics'
            ])
            .scales(scale)
            .labels([
                'Hawkercentre',
                'Childcare',
                'Chasclinics'
            ])
            .title(function (d) {
                return "Score: " + d.Result + " / " + d.Full + " = " + d3.round(d.Overall, 2);
            })
            .margin(margin)
            .labelMargin(labelMargin);

    data.forEach(function (d, i) {
        if (d.Hawkercentre === -1) {
            d.Hawkercentre = 0;
        }
        if (d.Childcare === -1) {
            d.Childcare = 0;
        }
        if (d.Chasclinics === -1) {
            d.Chasclinics = 0;
        }

        star.includeLabels(i % 4 === 0 ? true : false);
        
        d3.select('#target').remove();
        
        $('#home').append("<div id='target'></div>");
        
        var wrapper = d3.select('#target').append('div')
                .attr('class', 'wrapper');
        
        var svg = wrapper.append('svg')
                .attr('class', 'chart')
                .attr('width', width + margin.left + margin.right)
                .attr('height', width + margin.top + margin.bottom);

        var starG = svg.append('g')
                .datum(d)
                .call(star)
                .call(star.interaction)

        var interactionLabel = wrapper.append('div')
                .attr('class', 'interaction label')

        var circle = svg.append('circle')
                .attr('class', 'interaction circle')
                .attr('r', 5)

        var interaction = wrapper.selectAll('.interaction')
                .style('display', 'none');

        svg.selectAll('.star-interaction')
                .on('mouseover', function (d) {
                    svg.selectAll('.star-label')
                            .style('display', 'none');

                    interaction
                            .style('display', 'block')


                    circle
                            .attr('cx', d.x)
                            .attr('cy', d.y)

                    $interactionLabel = $(interactionLabel.node());
                    interactionLabel
                            .text(d.key + ': ' + d.datum[d.key])
                            .style('left', d.xExtent - ($interactionLabel.width() / 2))
                            .style('top', d.yExtent - ($interactionLabel.height() / 2))
                })
                .on('mouseout', function (d) {
                    interaction
                            .style('display', 'none')

                    svg.selectAll('.star-label')
                            .style('display', 'block')
                })


    });

}

function googlegeocode(postalcode) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': "Singapore" + " " + postalcode}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            var latlng = [lat, lng];

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}
