// cookie csrf function
function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i]);
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}

var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


var city = $("#city").val()
var key1 = $('#keyWord1').val()
var key2 = $('#keyWord2').val()
var key3 = $('#keyWord3').val()


function getJobsDice(){
    $("#dice").html("")
    $("#dice").append("<tr><td> Dice: <br><br>")
    var $table = $("<p>")
    $.ajax('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + key1 + '+' + key2 + '+' + key3 + '&city=' + city + '&sort=1').done(function (stuff){
        console.log(stuff.resultItemList)
        var openings = stuff.resultItemList
        for (var i = 0; i < openings.length; i++){
           $table.html($table.html() + "<br><a href=" + openings[i]['detailUrl'] + " target='_blank'>" + openings[i]['jobTitle'] + "</a><br>"
                                     + openings[i]['company'] + "<br>" + openings[i]['location'] + " " + openings[i]['date'] + "<br>")
           $('#count').text(openings.length + " jobs found");
           $('#kw1').text($('#keyWord1').val());
           $('#kw2').text($('#keyWord2').val());
           $('#kw3').text($('#keyWord3').val());
           $('#dice').append($table)
        }
    })
}


function getJobsIndeed(){
    city = $("#city").val()
    key1 = $('#keyWord1').val()
    key2 = $('#keyWord2').val()
    key3 = $('#keyWord3').val()
    $("#indeed").html("")
    $("#indeed").append("<tr><td> Indeed: <br><br>")
    var $table = $("<p>")
    $.ajax('http://api.indeed.com/ads/apisearch?publisher=6844415622929466&format=json&q=' + key1 + '+' + key2 + '+' + key3 + '&l=' + city + '&sort=date&radius=40&st=&jt=&start=&limit=50&fromage=30&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2').done(function (stuff){
        console.log(stuff.results)
        var openings = stuff.results
        for (var i = 0; i < openings.length; i++){
           $table.html($table.html() + "<br><a href=" + openings[i]['url'] + " target='_blank'>" + openings[i]['jobtitle'] + "</a><br>"
                                     + openings[i]['company'] + "<br>" + openings[i]['city'] + ", " + openings[i]['date'] + "<br>")
           $('#count').text(openings.length + " jobs found");
           $('#kw1').text($('#keyWord1').val());
           $('#kw2').text($('#keyWord2').val());
           $('#indeed').append($table)
        }
    })
}

function search(){
    getJobsIndeed();
    getJobsDice();
}

$('#search').click(search)
