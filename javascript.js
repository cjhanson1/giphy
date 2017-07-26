var searchItems = ["happy","sad","surprised","scared","regretful","hopeful"]

displayButtons()
clickButtons()

$("#submitNewSearch").on("click",function(event){
	event.preventDefault()
	arb = $("#newSearchInput").val()
	var arb2 = 0
	for (var i = 0; i < searchItems.length; i++) {
		if (arb===searchItems[i]) {
			arb2=arb2+1
			displayButtons()
			clickButtons()
		}
	}
	if (arb2===0) {
		searchItems.push(arb)
	displayButtons()
	clickButtons()
		
	}
	$("#newSearchInput").val("")
})


function displayButtons() {
	$(".button").remove()
for (var i = 0; i < searchItems.length; i++) {
	newButton=$("<button>")
	newButton.addClass("button")
	newButton.addClass("btn btn-primary")
	newButton.attr("data-search",searchItems[i])
	newButton.text(searchItems[i])
	newButton.val(searchItems[i])
	$("#buttons").append(newButton)
}
}

function clickButtons() {
$(".button").on("click",function() {
	var searchItem = $(this).val()
	var urlz = "https://api.giphy.com/v1/gifs/search?q="+searchItem+"&api_key=dc6zaTOxFJmzC&limit=10&rating=pg"
	$(".currentSearch").remove()


$.ajax({
  url: urlz,
  method: "GET"
}).done(function(response) {
	console.log(response)
	for (var i = 0; i < response.data.length; i++) {
		displayResult = $("<div>")
		displayResult.addClass("currentSearch")
		displayImage = $("<img>")
		displayImage.addClass("clickableImage")
		displayImage.attr("data-still",response.data[i].images.downsized_still.url)
		displayImage.attr("data-animate",response.data[i].images.downsized.url)
		displayImage.attr("data-state","still")
		displayImage.attr("src",response.data[i].images.downsized_still.url)
		displayRating = $("<p>")
		displayRating.text("Rating: "+response.data[i].rating)
		displayResult.append(displayImage)
		displayResult.append(displayRating)
		$("#gifs").append(displayResult)
	}

$(".clickableImage").on("click",function(){
		var dataStill = $(this).attr("data-still")
		var dataAnimate = $(this).attr("data-animate")
		var dataState = $(this).attr("data-state")
		if (dataState==="still") {
			$(this).attr("src",dataAnimate)
			$(this).attr("data-state","animate")
		}
		if (dataState==="animate") {
			$(this).attr("src",dataStill)
			$(this).attr("data-state","still")
		}
		
	})
});
})
}

