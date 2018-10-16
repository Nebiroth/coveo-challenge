// default is index 0
var startingResult = 0;
var totalResults = 0;

$("#searchTerm").focus();
$("#searchTerm").on("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    $("#submitButton").click();
  }
});

// prev page and next page buttons are hidden
$("#prevButton").hide();
$("#prevButton").on('click', function() { changePage(-1); });

$("#nextButton").hide();  
$("#nextButton").on('click', function() { changePage(1); });


function changePage(num) {
  if (num === -1 && (startingResult + ($("#numberResultsSelect").val() * num) >= 0)) {
    startingResult += ($("#numberResultsSelect").val() * num);
    $('#submitButton').click();
  } else if (startingResult + ($("#numberResultsSelect").val() * num) < totalResults) {
    startingResult += ($("#numberResultsSelect").val() * num);
    $('#submitButton').click();
  }
}

$(function updateIndex() {
    $('.search-button, .options-price-button').on('click', function() {
        $.post("/ApiRequest", {term: $("#searchTerm").val(), minPrice: parseInt($("#minPrice").val()), maxPrice: parseInt($("#maxPrice").val()), numberOfResults: $("#numberResultsSelect").val(), firstResult: startingResult, sortBy: $('#sortBySelect').val()}, function(json) {
            var data = JSON.parse(json.body);  
            $("#resultsDiv").empty();
            
            if (data.results.length === 0) {
                const noResultsFound = $('<text></text>').text("No results found for: " + $("#searchTerm").val());
                $('#resultsDiv').append(noResultsFound);
                $("#prevButton").hide();
                $("#nextButton").hide();
        
              } else {
                $("#resultsInfoText").text((startingResult + 1) + "-" + Math.min(parseInt($("#numberResultsSelect").val()) + startingResult, data.totalCountFiltered) + " of " + data.totalCountFiltered + " results for " + $("#searchTerm").val());
                totalResults = data.totalCountFiltered;        
        
                // extract data for each valid result
                Array.from(data.results, result => {
                  const newCard = $('<div></div>').attr({'class' : 'card'});
                  const cardLayout = $('<div></div>').attr({'class': 'card-details'});
        
                  // title, image, price, all detail tags, 
                  const resultTitle = $('<a></a>').attr({'class' : 'card-title', 'href' : result.ClickUri}).text(result.title);
                  const resultImage = $('<img></img>').attr({'class' : 'image', 'src' : result.raw.tpthumbnailuri})
                  const priceText = $('<h1></h1>').text(result.raw.tpprixnormal);
                  const allTagsDiv = $('<div></div>').attr({'class': 'all-tags'});
        
                  // category
                  const resultCategory = $('<div></div>').attr({'class': 'tp-category'});
                  const categoryText = $('<text></text>').attr({'class': 'tp-category-text'}).text(result.raw.tpcategorie);
                  resultCategory.append(categoryText);
        
                  // bouchon
                  const resultBouchon = $('<div></div>');  
                  if (result.raw.tpbouchon != null) {
                    resultBouchon.attr({'class': 'tp-bouchon'});
                    const bouchonText = $('<text></text>').attr({'class': 'tp-bouchon-text'}).text(result.raw.tpbouchon);
                    resultBouchon.append(bouchonText);
                  }
        
                  // pays
                  const resultPays = $('<div></div>');    
                  if (result.raw.tppays != null) {
                    resultPays.attr({'class' : 'tp-pays'});
                    const paysText = $('<text></text>').attr({'class': 'tp-pays-text'}).text(result.raw.tppays);
                    resultPays.append(paysText);    
                  }      
        
                  // producteur
                  const resultProducteur = $('<div></div>');
                  if (result.raw.tpproducteur != null) {
                    resultProducteur.attr({'class': 'tp-producteur'});     
                    const producteurText = $('<text></text>').attr({'class': 'tp-producteur-text'}).text(result.raw.tpproducteur);
                    resultProducteur.append(producteurText);    
                  }    
        
                  // millesime
                  const resultYearDiv = $('<div></div>');        
                  if (result.raw.tpmillesime != null) {          
                    resultYearDiv.attr({'class': 'tp-millesime'}) 
                    const yearText = $('<text></text>').attr({'class': 'tp-millesime-text'}).text(result.raw.tpmillesime);
                    resultYearDiv.append(yearText);
                  }
        
                  $("#prevButton").show();
                  $("#nextButton").show();
        
                  // append everything
                  newCard.append(cardLayout);        
                  cardLayout.append(resultTitle);
                  cardLayout.append(resultImage);
                  cardLayout.append(priceText);
                  cardLayout.append(allTagsDiv);
                  allTagsDiv.append(resultCategory);
                  allTagsDiv.append(resultBouchon);
                  allTagsDiv.append(resultPays);
                  allTagsDiv.append(resultProducteur);
                  allTagsDiv.append(resultYearDiv);
                  $('#resultsDiv').append(newCard);
                });
            }
        });
    });
});
