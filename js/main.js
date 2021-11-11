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

async function getPlayers() {
    $.ajax({
        url: "/getPlayers",
        type: "GET",
        dataType: "json",
        success: function(result) {
            debugger;
            renderCards(result.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          var errorText = 'errorThrown: ' + errorThrown + '\n' 
                            + 'errorCode: ' + jqXHR.status;
          console.log(errorText);
        }
      });
}

//Function for rendering the cards to the screen
function renderCards(playerData) {
    for (let i = 0; i < playerData.length; i++) {
        document.getElementById('cardContainer').innerHTML += createCardTemplate(playerData[i]);        
    }
}

//Function for creating the selected card template and rendering it to the screen
//Input varibale: selected card's player data
function selectCard(cardData) {
    const selectedCardData = JSON.parse (cardData);
    const selectedCard = '<div class="col-md-4">'+
                            '<div class="card">'+
                                '<div class="card-body">'+
                                    '<h6 id="selectedName">'+selectedCardData.realName+'</h6>'+
                                    '<p id="selectedPlayer">'+selectedCardData.playerName+'</p>'+
                                    '<p id="selectedAsset">'+selectedCardData.asset+'</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
    document.getElementById('selectedCard').innerHTML = selectedCard;
}

function sortAsc() {
    data.sort((a,b) => (a.realName > b.realName) ? 1 : ((b.realName > a.realName) ? -1 : 0))
    document.getElementById('cardContainer').innerHTML = '';
    renderCards();
}

function sortDesc() {
    data.sort((a,b) => (a.realName < b.realName) ? 1 : ((b.realName < a.realName) ? -1 : 0))
    document.getElementById('cardContainer').innerHTML = '';
    renderCards();
}

function submitPlayer() {
    if (!document.getElementById('selectedName')) {
        alert("Please select a card before submitting!");
    } else {
        const submittedcard = {
            realName: document.getElementById('selectedName').innerText,
            playerName: document.getElementById('selectedPlayer').innerText,
            asset: document.getElementById('selectedAsset').innerText
        }
        $.ajax({
            url: "/submitCard",
            type: "POST",
            data: JSON.parse(JSON.stringify(submittedcard)),
            dataType: "json",
            success: function(data) {
              alert("Successfully submitted");
              console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              var errorText = 'errorThrown: ' + errorThrown + '\n' 
                                + 'errorCode: ' + jqXHR.status;
              $('#error').val(errorText);
            }
          });
    }
}