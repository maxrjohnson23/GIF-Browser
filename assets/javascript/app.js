var app = {
    categories: ["Actions", "Animals","Emotions","Food & Drink", "Holidays", "People", "Sports", "Technology"],
    displayButtons: function() {
        for(var i = 0; i < this.categories.length; i++) {
            var categoryButton = $("<button>").addClass("category-button");
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
            app.displayGifs(data);
        });
    },
    displayGifs: function(data) {
        var gif = data.data[0];
        var gifElement = $("<div>").addClass("gif");
        console.log(gif.embed_url);
        gifElement.append($("<img/>",{src: gif.embed_url}));
        $(".gifs").append(gifElement);
    }
}

// Show default buttons
app.displayButtons();


$(document).on("click",".category-button", function() {
    var category = $(this).attr("data-category");
    app.apiRequest(category);
});

