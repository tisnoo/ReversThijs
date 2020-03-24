

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

    //Api key: 91803eeba9eb3fb7b32c8f2aac031498

      
    const get = async function(){
         let response = await fetch('/api/reversi/aanzet');
         let data = await response.text();
         return data;
     }

     async function initializeBoard(){
         let response = await fetch('/api/reversi/init');
     }

     const getBoard = async function(){
         let response = await fetch('/api/reversi/getBoard');
         let data = await response.text();
         return data;
     }

     const getScore = async function(){
         let response = await fetch('/api/reversi/getscore');
         let data = await response.text();
         return data;
     }

     const checkPiece = async function(x,y){
        let response = await fetch('/api/reversi/checkPiece?x='+x+'&y='+y);
        let data = await response.text();
        return data;
    }

    const placePiece = async function(x,y){
        let response = await fetch('/api/reversi/placePiece?x='+x+'&y='+y);
        let data = await response.text();
        return data;
    }

    const leaveGame = async function(){
        let response = await fetch('/api/reversi/leaveBoard')
        let data = await response.text();
        return data;
    }
    
    const gameHasBeenWon = async function(){
        let response = await fetch('/api/reversi/isWon')
        let data = await response.text();
        return data;
    }

    const winningPlayer = async function(){
        let response = await fetch('/api/reversi/winningPlayer')
        let data = await response.text();
        return data;

    }

    const playingColor = async function(){
        let response = await fetch('/api/reversi/playingColor')
        let data = await response.text();
        return data;
    }

    const playerColor = async function(){
        let response = await fetch('/api/reversi/playerColor')
        let data = await response.text();
        return data;
    }


    const privateInit = function(){
        if (stateMap.environment != 'development' && stateMap.environment != 'production'){
            return new Error("De environment is niet development of production");
        }else{
            console.log("Hallo, vanuit de submodule data");
        }
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
        init: privateInit,
        get: get,
        initializeBoard: initializeBoard,
        getBoard: getBoard,
        checkPiece: checkPiece,
        placePiece: placePiece,
        getScore: getScore,
        leaveGame: leaveGame,
        gameHasBeenWon: gameHasBeenWon,
        playingColor: playingColor,
        winningPlayer: winningPlayer,
        playerColor: playerColor,
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
    var playerKleur;
    var playingKleur;

    const privateInit = function () {

        Game.Data.playerColor().then((color)=>{
            playerKleur = color;
        });

        connection = new signalR.HubConnectionBuilder().withUrl("/reversiHub").build();

        connection.on("update", function (update) {
            updateBord();
        })

        connection.start().catch(function (err) {
            return console.error(err.toString());
        });


        //Create the scoreboard

        let player1icon = document.createElement('div');
        player1icon.className = 'fiche fiche--playerOne fade-in margin';


        let player2icon = document.createElement('div');
        player2icon.className = 'fiche fiche--playerTwo fade-in margin';

        player1score = document.createElement('h2');
        player1score.innerText = "0";

        
        let divider = document.createElement('h2');
        divider.innerText = "  :  ";
        
        player2score = document.createElement('h2');
        player2score.innerText = "0";


        let scorebord = document.getElementById('scorebord');

        scorebord.appendChild(player1icon);
        scorebord.appendChild(player1score);
        scorebord.appendChild(divider);
        scorebord.appendChild(player2score);
        scorebord.appendChild(player2icon);

        

        let backToList = document.getElementById('backToList');
        backToList.onmousedown = function () { backToListClicked() };
        
        
        //Populate the board using pieces
        Game.Data.getBoard().then((bord) => {

            if (bord == "error 41")
                Game.Data.initializeBoard();
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

        updateBord();

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
        Game.Data.leaveGame().then((_)=>{
            window.location.href = "/";
        });
    }

    const updateBord = function () {

        Game.Data.playingColor().then((color)=>{
            playingKleur = color;
        });

        Game.Data.getScore().then((score)=>{
            let scoreArray = JSON.parse(score);

            player1score.innerText = scoreArray[0];
            player2score.innerText = scoreArray[1];
        });

        Game.Data.getBoard().then((bord) => {

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

        Game.Data.gameHasBeenWon().then((hasBeenWon)=>{
            if (hasBeenWon == 'true'){


                Game.Data.winningPlayer().then((winningPlayerName)=>{
                    console.log(winningPlayerName);
                });
            }
        });
    }

    const privateHovered = function (x, y, piece) {
        if (piece.children.length == 0 && playingKleur == playerKleur) {
            Game.Data.checkPiece(x, y).then((canPlace) => {
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
            Game.Data.placePiece(x, y).then((_) => {
                if (_ == 'true') {
                    Game.Data.getBoard().then((bord) => {
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

    let configMap = {
        api: "temp",
    }


    return {
        init: privateInit,
        showFiche: showFiche,
    }

})();