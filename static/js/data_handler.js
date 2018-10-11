let dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        this._data =  JSON.parse(localStorage.getItem(this.keyInLocalStorage));
    },
    _saveData: function() {
        // it is not called from outside
        // saves the data from this._data to local storage
        localStorage.setItem(this.keyInLocalStorage, JSON.stringify(this._data));
    },

    init: function() {
        this._loadData();
    },

    getBoards: function(callback) {
        // the boards are retrieved and then the callback function is called with the boards
        callback(this._data.boards);
    },
    getBoard: function(boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },


    getStatuses: function(callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },


    getCardsByBoardId: function(boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let cardsById = [];

        for (let card of this._data.cards){
            if(card.board_id === boardId){
                cardsById.push(card);
            }
        }
        console.log("getCardsByBoardId");
        console.log("callback", callback);

        dom.showCards(cardsById);
        //callback(cardsById);
    },

    getCard: function(cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },


    createNewBoard: function(boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        const newId = this._data.boards.slice(-1)[0].id + 1;
        const newBoard = {'id': newId, 'title': boardTitle, 'is_active': true};

        console.log(newBoard);

        this._data.boards.push(newBoard);
        this._saveData();

        callback(this._data.boards);
     },

    createNewCard: function(cardTitle, boardId, callback) {
        // creates new card, saves it and calls the callback function with its data
        const newId = this._data.boards.slice(-1)[0].id + 1;
        const newCard = {'id': newId, 'title': cardTitle, 'board_id': parseInt(boardId), 'status_id': 1};
        this._data.cards.push(newCard);
        this._saveData();

        console.log("callback", callback);


        this.getCardsByBoardId(boardId, callback);
        console.log("createNewCard");
    }

};
