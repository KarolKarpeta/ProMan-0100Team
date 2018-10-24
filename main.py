from flask import Flask, render_template, jsonify, request
import data_manager
app = Flask(__name__)


@app.route("/")
def boards():
    return render_template('boards.html')

@app.route("/get-boards")
def get_boards():
    boards = data_manager.get_all_boards()
    return jsonify(boards)



@app.route("/get-cards-board-id/<int:boardId>")
def get_cards_by_board_id(boardId):
    cards = data_manager.get_cards_by_board_id(boardId)
    return jsonify(cards)


@app.route("/update-status", methods=["POST"])
def update_status():
    cardId = request.form["cardId"]
    newStatus = request.form["newStatus"]
    newBoardId = request.form["newBoardId"]

    data_manager.update_status(cardId, newStatus, newBoardId)
    return "success"

@app.route("/add-board", methods=["POST"])
def add_board():
    title = request.form["title"]
    data_manager.add_board(title)
    get_boards()
    return "success"


@app.route("/get-counter-board-id/<int:boardId>")
def get_counter_by_board_id(boardId):
    counter = data_manager.get_counter_by_board_id(boardId)
    return jsonify(counter)




def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()