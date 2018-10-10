
let templates = {

        getAccordion: function(board){
            return `  
               <div class="card">
        
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      ${board.title}
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



