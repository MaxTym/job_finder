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

partnerId =	'135478'
key = 'fItGuDKCqV9'
console.log("works")

function getJobs(){
    zip = $("#zip").val()
    key1 = $('#keyWord1').val()
    key2 = $('#keyWord2').val()
    key3 = $('#keyWord3').val()
    $("#jobs").html("")
    $("#jobs").append("<tr><td> Jobs: <br><br>")
    var $table = $("<p>")
    $.ajax('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + key1 + '+' + key2 + '+' + key3 + '&city=' + zip + '&sort=1').done(function (stuff){
        console.log(stuff.resultItemList)
        var openings = stuff.resultItemList
        for (var i = 0; i < openings.length; i++){
           $table.html($table.html() + "<br><a href=" + openings[i]['detailUrl'] + " target='_blank'>" + openings[i]['jobTitle'] + "</a><br> Company: "
                                     + openings[i]['company'] + "<br>" + openings[i]['location'] + " " + openings[i]['date'] + "<br>")

           $('#kw1').text($('#keyWord1').val());
           $('#kw2').text($('#keyWord2').val());
           $('#jobs').append($table)
           }
        })
}
    // $("#info").html("")
    //    $("#info").append("<tr><td> Characters: <br><br>")
    //    var $table = $("<p>")
    //    for (var j = 1; j < 10; j++){
    //        $.ajax('http://swapi.co/api/people?page=' +j).done(function (stuff){
    //        var people = stuff.results
    //        for (var i = 0; i < people.length; i++){
    //            $table.html($table.html() + "<tr><td>" + people[i]['name'] + "<br>")
    //            $('#info').append($table)
    //            }
    //        })
    //    }
$('#search').click(getJobs)
