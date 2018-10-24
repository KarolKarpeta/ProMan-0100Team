let dom = {

    eventHandler: function() {
        let addButton = document.getElementById("newBoardButton");
        addButton.addEventListener("click", this.addNewBoard);

        let addCardModal = document.getElementById("add-card-modal");
        addCardModal.addEventListener("click", this.addNewCard);

        let box = document.getElementById("hide");

        box.addEventListener('change', function (e) {
            let atrib = document.querySelectorAll(".collapse");

            if (box.checked) {
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

    addNewBoard: function() { // event handler function
            let title = document.getElementById("newBoardTitle").value;
            if (title === "") {
                alert("PLEASE FILL THE BOARD NAME!!!")
            }
            else {
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://127.0.0.1:5000/add-board', true);
                xhr.responseText = 'text';
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function() {//Call a function when the state changes.
                    if(xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    }
                };
                xhr.onload = function () {
                    dom.getBoards();
                };
                xhr.send(`title=${title}`);
            }

    },

    addNewCard: function() {
            let title = document.getElementById("user-input").value;
            let boardId = parseInt(document.getElementById("modal").dataset.boardId);
            let statusId = 1;

            if (title === "") {
                alert("PLEASE FILL THE BOARD NAME!!!")
            }
            else {
                document.getElementById("user-input").value = "";
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://127.0.0.1:5000/add-card', true);
                xhr.responseText = 'text';
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function() {//Call a function when the state changes.
                    if(xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    }
                };
                xhr.onload = function () {
                    let cards = JSON.parse(xhr.response);
                    dom.showCards();
                };
            xhr.send(`title=${title}&boardId=${boardId}&statusId=${statusId}`);
                }
        },


    _boards: {},

// ----------------------BOARDS --------------------
//     loadBoards: function() {
//         // retrieves boards and makes showBoards called
//         dataHandler.getBoards(this.showBoards);
//     },

    getBoards: function() {
        let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://127.0.0.1:5000/get-boards', true);
            xhr.responseText = 'text';

            xhr.onload = function () {
                let boards = JSON.parse(xhr.response);
                dom.showBoards(boards);
            };
            xhr.send();
    },

    showBoards: function(boards) {
        let boardList = document.getElementById("accordionExample");
        boardList.innerHTML = '';

        for (let board of boards){
            boardList.insertAdjacentHTML('beforeend', templates.getAccordion(board));

            let newCardButton = $(`#new-card-${board.id}`);
            newCardButton.click(function (ev){
                let modal = document.getElementById("modal");
                modal.dataset.boardId = board.id;
            });

            let boardAnchor = document.getElementById(`heading-${board.id}`);
            boardAnchor.addEventListener('click', dom.showCards);
            dom.showCardsCounter(board.id);
        }

        let createModal = document.getElementById("my-modal");
        createModal.insertAdjacentHTML('beforeend', templates.getModal());

        dom.eventHandler();
    },

// -------------------------DRAG & DROP ------------------------------
    allowDrop: function(allowdropevent){
        allowdropevent.target.style.color = 'blue';
        allowdropevent.preventDefault();
        },

    drag: function(dragevent) {
        //console.log("dragevent.target.board_id", dragevent.target.dataset.board_id);

        dragevent.dataTransfer.setData("element-id", dragevent.target.id);
        dragevent.dataTransfer.setData("board-id", dragevent.target.dataset.board_id);

        //dragevent.target.style.color = 'green';
    },

    drop: function(dropevent, newStatus, newBoardId) {
        dropevent.preventDefault();
        var cardId = dropevent.dataTransfer.getData("element-id");
        let oldboardId = dropevent.dataTransfer.getData("board-id");

        cardId = parseInt(cardId);
        oldboardId = parseInt(oldboardId);

        let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://127.0.0.1:5000/update-status', true);
            xhr.responseText = 'text';
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onload = function () {
                let movedCard = document.getElementById(cardId);
                movedCard.setAttribute('data-board_id', newBoardId);
                dropevent.target.appendChild(movedCard);

                dom.showCardsCounter(newBoardId);
                dom.showCardsCounter(oldboardId);
            };
            xhr.send(`cardId=${cardId}&newStatus=${newStatus}&newBoardId=${newBoardId}`);
        },

    showCards: function(event) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let boardId = parseInt(event.target.dataset.boardId);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:5000/get-cards-board-id/${boardId}`, true);
        xhr.responseText = 'text';

        xhr.onload = function () {
            let cards = JSON.parse(xhr.response);
            if (cards.length) {

                for (let stat = 1; stat <= 4; stat++) {
                   let div = document.getElementById(`board-${cards[0].board_id}-status-${stat}`);
                   div.innerText = "";
                }
                // ~~~~~~~~~~~~~~ optymalize this code ~~~~~~~~~~~~~~
                for (let card of cards) {
                    let statusDiv = document.getElementById(`board-${card.board_id}-status-${card.status_id}`);
                    let el = document.createElement("div");

                    el.setAttribute('id', card.id);
                    el.dataset.board_id = card.board_id;
                    //el.setAttribute('board_id', card.board_id);
                    //el.setAttribute('status', card.status_id);

                    el.setAttribute('draggable', 'true');
                    el.setAttribute('ondragstart', 'dom.drag(event)');

                    el.innerText = card.title;

                    el.classList.add("border");
                    el.classList.add("text-center");

                    statusDiv.appendChild(el);
                }
                dom.showCardsCounter(cards[0].board_id);
            }
        };
        xhr.send();
    },

     showCardsCounter: function (boardId) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:5000/get-counter-board-id/${boardId}`, true);
        xhr.responseText = 'text';

        xhr.onload = function () {
            let counter = JSON.parse(xhr.response);
            let cardsCounterBadge = document.querySelector(`#header-${boardId} .badge`);
            cardsCounterBadge.innerText = counter[0].howmany;
        };
        xhr.send();
    }

};
