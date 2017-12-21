var app = {
    categories: ["Actions", "Animals","Emotions","Food & Drink", "Holidays", "People", "Sports", "Technology"],
    registerButtons: function() {
        for(var i = 0; i < this.categories.length; i++) {
            var categoryButton = $("<button>").addClass("category-button");
            categoryButton.text(this.categories[i]);
            $(".categories").append(categoryButton);
        }
    }
}

app.registerButtons();

