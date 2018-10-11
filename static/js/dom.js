// It uses data_handler.js to visualize elements
let dom = {

    eventHandler: function() {
        let addButton  = document.getElementById("newBoardButton");
        addButton.addEventListener("click", this.addNewBoard);

        let addCardModal = document.getElementById("add-card-modal");
        addCardModal.addEventListener("click", this.addNewCard);

    },

    addNewBoard: function(){ // event handler function
            let inputText = document.getElementById("newBoardTitle").value;

            if(inputText === ""){
                alert("PLEASE FILL THE BOARD NAME!!!")
            }
            else{
                dataHandler.createNewBoard(inputText, dom.showBoards);
                document.getElementById("newBoardTitle").value = "";
            }
        },

    addNewCard: function() {
            let inputText = document.getElementById("user-input").value;
            let boardId = parseInt(document.getElementById("modal").dataset.boardId);

            if (inputText === "") {
                alert("PLEASE FILL THE BOARD NAME!!!")
            }
            else {
                dataHandler.createNewCard(inputText, boardId, dom.showCards);
                document.getElementById("user-input").value = "";
            }
        },



// ----------------------BOARDS --------------------
    loadBoards: function() {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(this.showBoards);
    },

    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardList = document.getElementById("accordionExample");
        boardList.innerHTML = '';

        for (let board of boards){
            boardList.insertAdjacentHTML('beforeend', templates.getAccordion(board));

            let newCardButton = $(`#new-card-${board.id}`);
            newCardButton.click(function (ev){
                console.log(ev.target);
                let modal = document.getElementById("modal");
                modal.dataset.boardId = board.id;
            });

            let boardAnchor = document.getElementById(`heading-${board.id}`);
            boardAnchor.addEventListener('click', dom.loadCards);

        }

        let createModal = document.getElementById("my-modal");
        createModal.insertAdjacentHTML('beforeend', templates.getModal());


    },



// ----------------------CARDS --------------------

    loadCards: function(event) {
        // retrieves cards and makes showCards called
        //console.log(event.target.dataset.boardId);
        boardId = parseInt(event.target.dataset.boardId);
        dataHandler.getCardsByBoardId(boardId, dom.showCards);

    },


    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also

        if(cards.length){
           //let board = document.getElementById(`collapseBoard-${cards[0].board_id}`);

            for(let stat=1; stat<=4; stat++){
                div = document.getElementById(`board-${cards[0].board_id}-status-${stat}`);
                div.innerText = "";
            }

            //console.log("board", board);

            for (let card of cards){
                let statusDiv = document.getElementById(`board-${card.board_id}-status-${card.status_id}`);
                let el = document.createElement("div")  ;
                el.innerText = card.title;
                el.classList.add("border");
                statusDiv.appendChild(el);
            }
            console.log("showCards");
        }


        //let cardBody = document.querySelectorAll(".card-body");
        //console.log("cardBody", cardBody);



    }




    // appendToElement: function(elementToExtend, textToAppend, prepend = false) {
    //     // function to append new DOM elements (represented by a string) to an existing DOM element
    //     let fakeDiv = document.createElement('div');
    //     fakeDiv.innerHTML = textToAppend.trim();
    //
    //     for (childNode of fakeDiv.childNodes) {
    //         if (prepend) {
    //             elementToExtend. prependChild(childNode);
    //         } else {
    //             elementToExtend.appendChild(childNode);
    //         }
    //     }
    //
    //     return elementToExtend.lastChild;
    // }
};
