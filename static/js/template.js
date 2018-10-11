
let templates = {

        getAccordion: function(board){
            return `  
               <div class="card board-${board.id}">
        
                <div class="card-header" id="heading-${board.id}">
                  <h5 class="mb-0">
                    <button class="btn btn-link board-${board.id}" data-board-id="${board.id}" type="button" data-toggle="collapse" data-target="#collapseBoard-${board.id}" aria-expanded="true" aria-controls="collapseOne">
                        <i class="far fa-clipboard"></i> ${board.title}
                    </button>
                    <span id="new-card-${board.id}" class="far fa-plus-square float-right align-bottom" data-toggle="modal" data-target="#modal"></span>
                  </h5>
                </div>
        
                <div id="collapseBoard-${board.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class="card-body">
                  
                  
                       <div class="card-deck">
                        
                          <div class="card border-secondary mb-3" style="max-width: 18rem;">
                              <div class="card-header">New</div>
                              <div id= class="card-body text-dark">
                                <h5 class="card-title">Dark card title</h5>
                                <p class="card-text">Some d's content.</p>
                                
                                                                
                                
                              </div>
                          </div>
                          
                          
                          <div class="card border-danger mb-3" style="max-width: 18rem;">
                              <div class="card-header">In progress</div>
                              <div class="card-body text-dark">
                                <h5 class="card-title">Dark card title</h5>
                                <p class="card-text">Some s content.</p>
                              </div>
                          </div>
                         
                          
                          
                        </div>
                        
                        
                        
                  </div>
                </div>
        
            </div> `
        },

        getModal: function() {
            return  `
                    <div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Write your card title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <input class="form-control" id="user-input" name="input" type="text">
                          </div>
                          <div class="modal-footer">
                            <button id="add-card-modal" type="button" class="btn btn-primary">Add card</button>
                          </div>
                        </div>
                      </div>
                    </div>`
        }

};



