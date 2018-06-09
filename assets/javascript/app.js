$(document).ready(() => {
    var topics = ["Mickey Mouse", "Sponge Bob", "Bugs Bunny", "Donald Duck", "Pink panther", "Pinocchio", "Snow white", "Tiny toon", "The flinstones", "Scooby-Doo", "Garfield", "The Smurfs"];  // initial array of cartoons

    $("#start").on("click", function (event) {

    $("#jumbotron1").css("display", "none");
    $("body").css("background","url(./assets/images/cartoon-network-old-shows-2005-wallpaper-3.jpg)");
    $("#jumbotron2").css("display", "grid");

    });


    $("#addButton").on("click", function (event) {
        event.preventDefault();

        // Here we grab the text from the input box
        var text = $('#input').val().trim();

        topics.push(text);
        renderButtons();
        $('#input').val('').trim();

    });

    function callGiphy() {

        // Here we grab the text from the input box
        var a = $(this).attr("data-name");

        // change the limit to 10
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + a + "&api_key=bV49mdnvuKqv2rhb5kz2MFuwsFn1GPw8&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            //   $('#show-time').append(`<div>${response.Rated}</div>`);
            $('#show-time').empty();

            var newPanel = $("<div>");
            newPanel.addClass("panel panel-body");
            newPanel.attr("id", "panel");

            var listCartoons = response.data;

            for (let i = 0; i < listCartoons.length; i++) {
                var gif = $("<img>");
                var p = $('<p>');
                var newDiv = $('<div>');
                newDiv.addClass('eachImage');

                p.text(listCartoons[i].rating);

                // <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still=                              "https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">

                gif.addClass("imgCartoon");

                gif.attr("src", listCartoons[i].images.fixed_height_small_still.url);
                gif.attr("data-still", listCartoons[i].images.fixed_height_small_still.url);
                gif.attr("data-rating", listCartoons[i].rating);
                gif.attr("data-animate", listCartoons[i].images.fixed_height_small.url);
                gif.attr("data-state", "still");

                newDiv.append(p);
                newDiv.append(gif);

                newPanel.append(newDiv);

                $("#show-time").append(newPanel);
            }

        });

    }

    function stopMove() {

        var state = $(this).attr('data-state');


        // STEP THREE: Check if the variable state is equal to 'still',
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }

    function renderButtons() {

        $('#cartoonbuttons').empty();
        for (var i = 0; i < topics.length; i++) {
            var but = $(`<button>`);

            but.addClass("cartoon btn btn-primary btn-md");

            but.attr("data-name", topics[i]);

            but.text(topics[i]);

            $("#cartoonbuttons").append(but);
        }

    }

    renderButtons();

    $(document).on("click", ".cartoon", callGiphy);
    $(document).on("click", ".imgCartoon", stopMove);



})
