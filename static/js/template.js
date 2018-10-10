
let myObj = {

    test: function() {
        return `test`
    },


    getBoardLayout: function (board) {

        return `<div id="board-${board.id}" class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-board-id="${board.id}" 
                        data-toggle="collapse" href="#collapse-board-${board.id}">
                          ${board.title}
                          <span class="badge badge-pill badge-dark" title="Number of cards"></span>
                      </a>
                      <i class="fas fa-plus float-right btn btn-light" data-board-id="${board.id}" 
                          title="Add new task" data-toggle="modal" data-target="#new-card-modal"></i>
                    </div>
                    <div id="collapse-board-${board.id}" class="collapse" data-parent="#accordion">
                      <div class="card-body">
                        ${this.getCardsLayout(board.id)}
                      </div>
                    </div>
                </div>`
    },

};





let ob = {

        getAccordion: function(){
            return `  
               <div class="card">
        
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Collapsible Group Item #1
                    </button>
                  </h5>
                </div>
        
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class="card-body">
                        test 1
                  </div>
                </div>
        
            </div> `
        }



};



