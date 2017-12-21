var app = {
    categories: ["Actions", "Animals","Emotions","Food & Drink", "Holidays", "People", "Sports", "Technology"],
    displayButtons: function() {
        for(var i = 0; i < this.categories.length; i++) {
            var categoryButton = $("<button>").addClass("category-button");
            // attribute used for search query
            categoryButton.attr("data-category", this.categories[i]);
            categoryButton.text(this.categories[i]);
            $(".categories").append(categoryButton);
        }
    },
    apiRequest: function(searchQuery) {
        // Encode query string for spaces and special characters
        var encodedQuery = encodeURIComponent(searchQuery);
        console.log(`Searching for ${encodedQuery}`);
        var queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=psbvNW4hbQGb5pxrjJ1nxEpppgE9jFT4&q=${searchQuery}&limit=25&offset=0&rating=G&lang=en`;
        $.ajax({url: queryUrl, method: "GET"}).done(function(data){
            console.log(data);
            app.displayGifs(data.data);
        });
    },
    displayGifs: function(data) {

        // clear out any previous searches
        var gifContainer = $(".gifs").empty();
        // hide while loading gifs
        gifContainer.hide();
        for(var i = 0; i < data.length; i++) {
            var gifElement = $("<div>");
            gifElement.append($("<img/>",{src: data[i].images.fixed_width_still.url, class: "gif"}));
            gifElement.append($("<p>").text(`Rating: ${data[i].rating.toUpperCase()}`))
            gifContainer.append(gifElement);
        }
        gifContainer.show();
    }
}

// Show default buttons
app.displayButtons();


$(document).on("click",".category-button", function() {
    var category = $(this).attr("data-category");
    app.apiRequest(category);
});

// Set mouseover functions to play/pause gifs
$(document).on("mouseover", ".gif", function(){
    var $this = $(this);
    // replaces still image src with live gif
    var src = $this.attr("src").replace("200w_s","200w");
    $this.attr("src", src);
})

$(document).on("mouseout", ".gif", function(){
    var $this = $(this);
    // replaces live gif src with still image
    var src = $this.attr("src").replace("200w","200w_s");
    $this.attr("src", src);
})

