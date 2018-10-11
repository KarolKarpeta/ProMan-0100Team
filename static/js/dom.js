// It uses data_handler.js to visualize elements
let dom = {

    eventHandler: function() {
        console.log("TEST event Handler");

        let addButton  = document.getElementById("newBoardButton");
        addButton.addEventListener("click", this.addNewBoard);

        //MOVE TO SHOW BOARDS
        // let createModal = document.getElementById("my-modal");
        // createModal.insertAdjacentHTML('beforeend', templates.getModal());
    },


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
        console.log("board",board);
        }

        let createModal = document.getElementById("my-modal");
        createModal.insertAdjacentHTML('beforeend', templates.getModal());
    },

    addNewBoard: function(){

            let inputText = document.getElementById("newBoardTitle").value;
            console.log("input tekst", inputText);

            //dataHandler.createNewBoard(newBoardTitle, dom.showBoards);
            dataHandler.createNewBoard(inputText, dom.showBoards);

            console.log("TEST");
        },


    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
    },


    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
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
