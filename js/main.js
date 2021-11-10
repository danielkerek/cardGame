//Function for creating an HTML card template
//Input variable: contains the player's data, that are shown on the card
//Output: HTML DOM structure of the card with player's actual data
function createCardTemplate(cardData) {
    return  '<div class="col-md-4 card-wrapper">'+
                '<div class="card shadow" onClick="selectCard(\''+encodeString(JSON.stringify(cardData))+'\')">'+
                    '<div class="card-body card-list-body">'+
                        '<h6>'+cardData.realName+'</h6>'+
                        '<p>'+cardData.playerName+'</p>'+
                        '<p>'+cardData.asset+'</p>'+
                    '</div>'+
                '</div>'+
            '</div>';
}

//Function for encoding player data
//Input variable: stringified JSON object of player data
//Output: encoded string
function encodeString(string) {
    return string.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

//Function for rendering the cards to the screen
function renderCards() {
    for (let i = 0; i < data.length; i++) {
        document.getElementById('cardContainer').innerHTML += createCardTemplate(data[i]);        
    }
}

//Function for creating the selected card template and rendering it to the screen
//Input varibale: selected card's player data
function selectCard(cardData) {
    const selectedCardData = JSON.parse (cardData);
    const selectedCard = '<div class="col-md-4">'+
                            '<div class="card">'+
                                '<div class="card-body">'+
                                    '<h6>'+selectedCardData.realName+'</h6>'+
                                    '<p>'+selectedCardData.playerName+'</p>'+
                                    '<p>'+selectedCardData.asset+'</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
    document.getElementById('selectedCard').innerHTML = selectedCard;
}