var app = {
    categories: ["Actions", "Animals","Emotions","Food & Drink", "Holidays", "People", "Sports", "Technology"],
    displayButtons: function() {
        for(var i = 0; i < this.categories.length; i++) {
            app.addButton(this.categories[i]);
        }
    },
    apiRequest: function(searchQuery) {
        // Encode query string for spaces and special characters
        var encodedQuery = encodeURIComponent(searchQuery);
        // fetch 25 gifs based on search string
        var queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=psbvNW4hbQGb5pxrjJ1nxEpppgE9jFT4&q=${searchQuery}&limit=25&offset=0&lang=en`;
        $.ajax({url: queryUrl, method: "GET"}).done(function(data){
            app.displayGifs(data.data);
        });
    },
    displayGifs: function(data) {

        // clear out any previous searches
        var gifContainer = $(".gifs").empty();
        // hide while loading gifs
        gifContainer.hide();
        for(var i = 0; i < data.length; i++) {
            var gifDiv = $("<div>").addClass("gif-div");
            gifDiv.append($("<img/>",{src: data[i].images.fixed_width_still.url, class: "gif"}));
            gifDiv.append($("<p>").text(`Rating: ${data[i].rating.toUpperCase()}`))
            gifContainer.append(gifDiv);
        }
        gifContainer.show();
    },
    addButton: function(text) {
        var categoryButton = $("<button>").addClass("category-button");
        // attribute used for search query
        categoryButton.attr("data-category", text);
        categoryButton.text(text);
        $(".button-list").append(categoryButton);
    }
}

// Show default buttons
app.displayButtons();

// Add new category button event
$("#add-button").on("click", function(){
    var newCategory = $("#add-input").val().toLowerCase();
    // only add if user typed something
    if(newCategory) {
        // Uppercase first letter
        newCategory = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
       app.addButton(newCategory);
    }
});

// Button click event to make the API call
$(document).on("click",".category-button", function() {
    var category = $(this).attr("data-category");
    app.apiRequest(category);
});

// Set click function  to play/pause gifs
$(document).on("click", ".gif", function(){
    // toggle still image with live gif.  _s suffix indicates still image
    var src = $(this).attr("src");
    if(src.indexOf("200w_s") !== -1){
        src = src.replace("200w_s","200w");
    } else {
        src = src.replace("200w","200w_s");
    }
    $(this).attr("src", src);
});

