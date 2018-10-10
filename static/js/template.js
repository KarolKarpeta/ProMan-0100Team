
let templates = {

        getAccordion: function(board){
            return `  
               <div class="card">
        
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseBoard-${board.id}" aria-expanded="true" aria-controls="collapseOne">
                      ${board.title}
                    </button>
                    <span id="plus" class="fas fa-plus float-right align-bottom" data-toggle="modal" data-target="#modal"></span>
                  </h5>
                </div>
        
                <div id="collapseBoard-${board.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class="card-body">
                        test 1
                  </div>
                </div>
        
            </div> `
        }



};



