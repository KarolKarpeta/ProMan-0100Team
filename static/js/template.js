
let templates = {

        getAccordion: function(board){
            return `  
               <div class="card board-${board.id}">
        
                <div id="header-${board.id}" class="card-header">
                  <h5 class="mb-0">

                    <button id="heading-${board.id}" data-board-id="${board.id}" class="btn btn-link board-${board.id}" type="button" data-toggle="collapse" data-target="#collapseBoard-${board.id}" aria-expanded="true" aria-controls="collapseOne">
                      <i class="far fa-clipboard"></i> ${board.title}
                    </button>
                    
                    <span id="new-card-${board.id}" class="far fa-plus-square float-right align-bottom" data-toggle="modal" data-target="#modal">&nbsp;</span>&nbsp;
                    <span class="badge badge-pill badge-light float-right" title="Number of cards">&nbsp;</span> &nbsp;
                  </h5>
                </div>
        
                <div id="collapseBoard-${board.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class="card-body">
                                    
                       <div class="card-deck">
                        
                              <div class="card border mb-3" style="max-width: 18rem;">
                                  <div class="card-header bg-warning"><i class="fas fa-sign-in-alt"></i> &nbsp; NEW</div>
                                  
                                  <div id="board-${board.id}-status-1" class="card-body text-dark" ondrop="dom.drop(event, 1, ${board.id} )" ondragover="dom.allowDrop(event)">
                                            <!--content-->   
                                  </div>
                              </div>
                              
                              <div class="card border mb-3" style="max-width: 18rem;">
                                  <div class="card-header bg-secondary"><i class="fas fa-spinner"></i> &nbsp; IN PROGRESS</div>
                                  
                                  <div id="board-${board.id}-status-2" class="card-body text-dark" ondrop="dom.drop(event, 2, ${board.id})" ondragover="dom.allowDrop(event)">
                                            <!--content-->
                                  </div>
                              </div>
                              
                              <div class="card border mb-3" style="max-width: 18rem;">
                                  <div class="card-header bg-info"><i class="far fa-comments"></i> &nbsp; TESTING</div>
                                  
                                  <div id="board-${board.id}-status-3" class="card-body text-dark" ondrop="dom.drop(event, 3, ${board.id})" ondragover="dom.allowDrop(event)">
                                            <!--content--> 
                                  </div>
                              </div>
                              
                              <div class="card border mb-3" style="max-width: 18rem;">
                                  <div class="card-header bg-success"><i class="far fa-check-square"></i> &nbsp; DONE</div>
                                  
                                  <div id="board-${board.id}-status-4" class="card-body text-dark" ondrop="dom.drop(event, 4, ${board.id})" ondragover="dom.allowDrop(event)">
                                            <!--content--> 
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
                            <button id="add-card-modal" type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Add card</button>
                          </div>
                        </div>
                      </div>
                    </div>`
        }

};



