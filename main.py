from flask import Flask, render_template, jsonify, request, redirect, url_for
import data_manager
app = Flask(__name__)

@app.route("/")
def start():
    return render_template('login.html')



@app.route("/login", methods=["POST"])
def login():
    #check if login and password is correct!
    return redirect("/boards")

@app.route("/boards")
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


@app.route("/add-card", methods=["POST"])
def add_card():
    title = request.form["title"]
    board_id = request.form["boardId"]
    status_id = request.form["statusId"]
    data_manager.add_card(title, board_id, status_id)

    return get_cards_by_board_id(board_id)


@app.route("/get-counter-board-id/<int:boardId>")
def get_counter_by_board_id(boardId):
    counter = data_manager.get_counter_by_board_id(boardId)
    return jsonify(counter)




def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()