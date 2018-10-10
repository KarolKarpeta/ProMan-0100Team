// It uses data_handler.js to visualize elements
let dom = {
    loadBoards: function() {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(this.showBoards);
    },



    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = document.getElementById("accordionExample");

        console.log("tablice",boards);

        for (let board of boards){
            boardList.insertAdjacentHTML('beforeend', templates.getAccordion(board));
        console.log("board",board);
        }

        // for (const ob in boards) {
        //     console.log("Klucz: ", ob);
        //     console.log("Wartość: ", boards[ob].title);
        //



    },


    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
    },


    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },


    appendToElement: function(elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend. prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    }




    // here comes more features
};
