// It uses data_handler.js to visualize elements
let dom = {

    eventHandler: function() {
        let addButton = document.getElementById("newBoardButton");
        addButton.addEventListener("click", this.addNewBoard);

        let addCardModal = document.getElementById("add-card-modal");
        addCardModal.addEventListener("click", this.addNewCard);

        let box = document.getElementById("hide");

        box.addEventListener('change', function (e) {
            console.log("zmieniam");
            let atrib = document.querySelectorAll(".collapse");
            console.log("atrib", atrib);

            if (box.checked) {
                console.log("zaznaczony");
                for (let i = 0; i < atrib.length; i++) {
                    atrib[i].setAttribute('data-parent', "#accordionExample");
                }
            }
            else {
                for (let i = 0; i < atrib.length; i++) {
                    atrib[i].removeAttribute('data-parent');
                }
            }

        })
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
//     loadBoards: function() {
//         // retrieves boards and makes showBoards called
//         dataHandler.getBoards(this.showBoards);
//     },

    showBoards: function() {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://127.0.0.1:5000/get-boards', true);
            xhr.responseText = 'text';

            xhr.onload = function () {
                boards = JSON.parse(xhr.response);

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
                    console.log("test");
                    boardAnchor.addEventListener('click', dom.showCards);
                    dom.showCardsCounter(board.id);
                }

            };
            xhr.send();



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
// -------------------------DRAG & DROP ------------------------------
    allowDrop: function(allowdropevent){
        allowdropevent.target.style.color = 'blue';
        allowdropevent.preventDefault();
        },

    drag: function(dragevent) {
        dragevent.dataTransfer.setData("element-id", dragevent.target.id);
        dragevent.target.style.color = 'green';
    },

    drop: function(dropevent, newStatus, newBoardId) {
        dropevent.preventDefault();
        var cardId = dropevent.dataTransfer.getData("element-id");
        console.log("CardId",parseInt(cardId), cardId );
        cardId = parseInt(cardId);

        dataHandler.modifyStatus(cardId, newStatus, newBoardId);
        dropevent.target.appendChild(document.getElementById(cardId));
        dom.showCardsCounter(newBoardId);
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

            // optymalize!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //
            for (let card of cards){
                let statusDiv = document.getElementById(`board-${card.board_id}-status-${card.status_id}`);


                let el = document.createElement("div")  ;

                el.setAttribute('id', card.id);
                el.setAttribute('status', card.status_id);

                                el.setAttribute('draggable', 'true');
                el.setAttribute('ondragstart', 'dom.drag(event)');


                el.innerText = card.title;
                el.classList.add("border");
                el.classList.add("text-center");

                statusDiv.appendChild(el);
            }
            dom.showCardsCounter(cards[0].board_id);
        }
    },

     showCardsCounter: function (boardId) {
        let cardsCounterBadge = document.querySelector(`#header-${boardId} .badge`);
        cardsCounterBadge.innerText = dataHandler.getCardsCountByBoard(boardId);
    },




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
