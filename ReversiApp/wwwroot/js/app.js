

const apiUrl = 'https://localhost:44350/api/reversi/aanzet'

const Game = (function(url){

    console.log(url)

        // Private function init
        const privateInit = function(callback){
            console.log('Private information!');

            callback();
        }

        const _getCurrentGameState = function(){
            
            stateMap.gameState =  Game.Model.getGameState();
            console.log(stateMap.gameState);
            
        }



        let stateMap = {
            gameState: 0,
        }

        
    
        // Waarde/object geretourneerd aan de outer scope
        return {
            init: privateInit,
            getCurrentGameState: _getCurrentGameState,
        }

        
})(apiUrl);



Game.Data = (function(){

     const apiCallNoParam = async function(method){
        
        let response = await fetch('/api/reversi/'+method);
        let data = await response.text();
        return data;
     }

     const apiCallParam = async function(method, x,y){
        let response = await fetch('/api/reversi/'+method+"?x="+x+"&y="+y);
        let data = await response.text();
        return data;
     }

    const getMockData = function(url){
        const mockData = configMap.mock;
    
        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    
    }

    let stateMap = {
        environment : 'production'
    }


    let configMap = {
        api: "temp",
        apiKey: "91803eeba9eb3fb7b32c8f2aac031498",
        mock: [
            {
                url: "https://localhost:44350/api/reversi/aanzet",
                data: 1
            }
          ],
    }

    return {
        apiCallNoParam: apiCallNoParam,
        apiCallParam: apiCallParam,
    }

})();
Game.API = (function(){

    const getApiData = function async (apiMethod, param1, param2){
        if (param1 == null && param2 == null){
            return Game.Data.apiCallNoParam(apiMethod);
        }else{
            return Game.Data.apiCallParam(apiMethod,param1,param2);
        }
    }

    return{
        getApiData: getApiData,
    } 
})();

Game.Model = (function () {

    const privateInit = function () {
        console.log("Hallo, vanuit de submodule model");
    }

    const _getGameState = function () {

        let spelerAanZet;

        Game.Data.get("test").then(function (data) {
            spelerAanZet = data[0].data;
        }).catch(e => { return Error("Promise is niet goed") });

        if (spelerAanZet == 0 || spelerAanZet == 1 || spelerAanZet == 2) {
            return spelerAanZet;
        }else{
            return Error("Verkeerde gegeven")
        }
    }


    let configMap = {
        api: "temp",
    }

    return {
        getGameState: _getGameState,
        init: privateInit
    }

})();


"use strict";

Game.reversi = (function () {

    /*
        0 = leeg
        1 = wit
        2 = zwart
    */

    var connection;
    var player1score;
    var player2score;
    var playername;
    var player2name;
    var playerKleur;
    var playingKleur;

    const privateInit = function () {



        connection = new signalR.HubConnectionBuilder().withUrl("/reversiHub").build();

        connection.on("update", function (update) {
            updateBord();
        })

        connection.start().catch(function (err) {
            return console.error(err.toString());
        });


        apiHandler('gameDescription');
        


        //Create the scoreboard

        let player1icon = document.createElement('div');
        player1icon.className = 'fiche fiche--playerOne fade-in margin';


        let player2icon = document.createElement('div');
        player2icon.className = 'fiche fiche--playerTwo fade-in margin';

        playername = document.createElement('p');
        playername.innerText = "laden...";

        player2name = document.createElement('p');
        player2name.innerText = "Nog geen tweede speler!";




        player1score = document.createElement('h2');
        player1score.innerText = "0";

        
        let divider = document.createElement('h2');
        divider.innerText = "  :  ";
        
        player2score = document.createElement('h2');
        player2score.innerText = "0";


        let scorebord = document.getElementById('scorebord');


        Game.API.getApiData('playingColor').then((color)=>{
            playerKleur = color; 
            console.log(playerKleur);       
            if (playerKleur == 1){
                scorebord.appendChild(playername);
            scorebord.appendChild(player1icon);
            scorebord.appendChild(player1score);
            scorebord.appendChild(divider);
            scorebord.appendChild(player2score);
            scorebord.appendChild(player2icon);
            scorebord.appendChild(player2name);
            }else{
                scorebord.appendChild(playername);
                scorebord.appendChild(player2icon);
                scorebord.appendChild(player2score);
                scorebord.appendChild(divider);
                scorebord.appendChild(player1score);
                scorebord.appendChild(player1icon);
                scorebord.appendChild(player2name);
            }

            
            updateBord();
        });


        

        let backToList = document.getElementById('backToList');
        backToList.onmousedown = function () { backToListClicked() };
        
        
        //Populate the board using pieces
        Game.API.getApiData('getBoard').then((bord) => {

            if (bord == "error 41")
                Game.API.getApiData('init');
            else {
                let speelbord = JSON.parse(bord);
                console.log(speelbord);
                for (let x = 0; x < 8; x++) {

                    //Create bool that decides if first piece should be light or dark
                    let isLight = false

                    //if rownumber is even, first piece is light
                    if (x % 2 == 0) {
                        isLight = true;
                    }


                    for (let y = 0; y < 8; y++) {

                        //create the piece and add it to the board
                        let piece = document.createElement('div');
                        piece.id = x.toString() + ',' + y.toString();
                        piece.className = isLight ? 'piece piece--white' : 'piece piece--black';
                        piece.onmousedown = function () { privateClicked(x, y, piece) };
                        piece.onmouseout = function () { piece.classList.remove('piece--selected') }
                        piece.onmouseover = function () { privateHovered(x, y, piece) }
                        document.getElementById('bord').appendChild(piece);

                        //Next piece is different color
                        isLight = !isLight;
                    }

                }
            }
        });



    }

    const placeFiche = function (x,y,piece, speelbord){
        let ficheType = speelbord[x][y];

        if (ficheType == 1){
            frontStyle = 'fiche fiche--playerOne fade-in front'
            backStyle =   'fiche fiche--playerTwo fade-in back'
        }else{
            frontStyle = 'fiche fiche--playerTwo fade-in front'
            backStyle =   'fiche fiche--playerOne fade-in back'
        }

        
        fichecontainer = document.createElement('div');
        fichecontainer.className = "fiche-container"

        ficheFront = document.createElement('div');
        ficheFront.className = frontStyle;
        ficheBack = document.createElement('div');
        ficheBack.className = backStyle;

        fichecontainer.appendChild(ficheBack);
        fichecontainer.appendChild(ficheFront);

        piece.appendChild(fichecontainer);
    }

    const flipPiece = function(x,y,piece,speelbord){
        let fichecontainer = piece.firstChild
        //Om te beginnen is kleur 1
            if (fichecontainer.lastChild.classList.contains("fiche--playerTwo")){
                //Was zwart in het begin
                kleur = 2;

                if (fichecontainer.classList.contains("is-flipped")){
                    //Is nu wit
                    kleur = 1
                }
            }else{
                //Was wit in het begin
                kleur = 1;
                if (fichecontainer.classList.contains("is-flipped")){
                    //Is nu zwart
                    kleur = 2
                }
            }
            if (kleur != speelbord[x][y]){
            fichecontainer.classList.toggle('is-flipped');
            }
    }


    const backToListClicked = function (){
        Game.API.getApiData('leaveBoard').then((_)=>{
            window.location.href = "/";
        });
    }

    const updateNaam = function(){
        Game.API.getApiData('getPlayerName?kleur='+1).then((naam)=>{
            if (playerKleur == 1){
                playername.innerText = naam;
            }else{
                player2name.innerText = naam;
            }
        });
        Game.API.getApiData('getPlayerName?kleur='+2).then((naam)=>{
            if (playerKleur == 2){
                playername.innerText = naam;
            }else{
                player2name.innerText = naam;
            }


            
        Game.Stats.init(playername.innerText, player2name.innerText);
        });
    }


    const updateBord = function () {

        Game.API.getApiData('playerColor').then((color)=>{
            playingKleur = color;
        });

        Game.API.getApiData('getscore').then((score)=>{
            let scoreArray = JSON.parse(score);

            player1score.innerText = scoreArray[0];
            player2score.innerText = scoreArray[1];
        });

        updateNaam();

        Game.API.getApiData('getBoard').then((bord) => {

                let speelbord = JSON.parse(bord);
                console.log(speelbord);
                for (let x = 0; x < 8; x++) {

                    //Create bool that decides if first piece should be light or dark
                    let isLight = false

                    //if rownumber is even, first piece is light
                    if (x % 2 == 0) {
                        isLight = true;
                    }


                    for (let y = 0; y < 8; y++) {

                        //Next piece is different color
                        isLight = !isLight;

                        //Check if piece needs to have a fiche
                        if (speelbord[x][y] != 0) {
                            let piece = document.getElementById('bord').children[(x * 8) + y];

                            if (piece.children.length == 0) {
                                placeFiche(x,y,piece,speelbord);
                            } else {
                                flipPiece(x,y,piece,speelbord);
                            }
                        }
                    }

                }
            
        });

        Game.API.getApiData('isWon').then((hasBeenWon)=>{
            if (hasBeenWon == 'true'){


                Game.API.getApiData('winningPlayer').then((winningPlayerName)=>{
                    console.log(winningPlayerName);
                    let winningplayer = document.createElement('h1');
                    winningplayer.innerText = "Speler " + winningPlayerName + " heeft gewonnnen, je bent nu vrij om het spel te verlaten";
                    document.getElementById('bord').innerHTML = "";
                    document.getElementById('bord').appendChild(winningplayer);

                    
                });
            }
        });

    }

    const privateHovered = function (x, y, piece) {
        if (piece.children.length == 0 && playingKleur == playerKleur) {
            Game.API.getApiData('checkPiece',x,y).then((canPlace) => {
                if (canPlace == 'true') {
                    piece.classList.add("piece--selected");
                }
            });

        }
    }


    const privateClicked = function (x, y, piece) {
        //Debug message
        console.log("x: " + x + " y: " + y)
        //Create a fiche and add it to the piece
        if (piece.children.length == 0 && playingKleur == playerKleur) {
            Game.API.getApiData('placePiece',x,y).then((_) => {
                if (_ == 'true') {
                    Game.API.getApiData('getBoard').then((bord) => {
                        connection.invoke("sendMessage", "").catch(function (err) {
                            return console.error(err.toString());
                        });
                    })
                }
            })
        }

    }

    const showFiche = function (x, y) {

        if (x >= 0 && x < 8 && y >= 0 && y < 8) {

            let selectedPiece = 8 * y + x;
            let varDocument = document.getElementById('bord').children[selectedPiece];
            if (varDocument.children.length == 0) {
                let fiche = document.createElement('div');
                fiche.className = 'fiche fiche--playerOne fade-in';
                varDocument.appendChild(fiche);
            } else {
                console.log("De geselecteerde positie bevat al een stuk");
            }
        } else {
            console.log("De geselecteerde positie bestaat niet op het bord!");
        }
    }


    //Stap 1, data ophalen
    const apiHandler = function async(apiLink){
        Game.API.getApiData(apiLink).then((data)=>{
            pasteTemplate(data);    
        });
    }


    //Stap 2, template parsen
    const pasteTemplate = function (data){
        let template = Game.Template.parseTemplate('description',{description : data});
        updateDOM(template);
    }

    //Stap 3, toepassen in DOM
    const updateDOM = function(templateHTML){
        document.getElementById('description').innerHTML = templateHTML;
    }

    let configMap = {
        api: "temp",
    }




    return {
        init: privateInit,
    }

})();
Game.Stats = (function (){



    const privateInit = function(player1name, player2name){
        Game.API.getApiData('getscorehistory').then((score)=>{
            
            let scoreArray = JSON.parse(score);

            console.log(scoreArray);

            configMap.player1chartData =(scoreArray[0]);
            configMap.player2chartData= (scoreArray[1]);
            configMap.beurtLabelData = [];

            for (let beurtCount = 0; beurtCount < scoreArray[0].length; beurtCount++){
                
            configMap.beurtLabelData.push(beurtCount);
            }

            
            let template = Game.Template.parseTemplate('chart');
            
            document.getElementById('chart').innerHTML = template;

            styleChart(player1name, player2name);
            console.log(configMap.beurtLabelData);
        });
    }

    const styleChart = function(player1name, player2name){
        var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: configMap.beurtLabelData,
        datasets: [{
            label: player1name,
            data: configMap.player1chartData,
            borderWidth: 2,
            fill: false,
            borderColor: "blue",
        },{
            label: player2name,
            data: configMap.player2chartData,
            borderWidth: 2,
            fill: false,
            borderColor: "red",
        }]
    },
    options: {
        title: {
            display: true,
            text: "Punten over aantal beurten"
        },
        scales: { 
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Beurten',
                }
            
        }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                    scaleLabel: {
                        display: true,
                        labelString: 'Punten',
                    }
                
            }]
        }
    }
});
    }

    const configMap = {
            'beurt': 0,
            'beurtLabelData' : [0,1,2],
            'player1chartData' : [1,5,61],
            'player2chartData' : [1,61,3],
    };

    return {
        init: privateInit, 
    }


})();
Game.Template = (function (){


    const getTemplate = function(templateName){


        return spa_templates["templates"]["templates"][templateName];
    }


    const parseTemplate = function(templateName, data){

        let template = getTemplate(templateName);

        return template(data)
    }


    return {
        parseTemplate: parseTemplate,
    }

})();