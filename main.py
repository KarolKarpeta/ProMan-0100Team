from flask import Flask, render_template, jsonify, request
import data_manager
app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''

    print("USERS", data_manager.get_all_users())
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
    print(request.form)
    cardId = request.form['cardId']
    newStatus = request.form['newStatus']
    newBoardId = request.form['newBoardId']

    data_manager.update_status(cardId, newStatus, newBoardId)

    return "success"

@app.route("/add-board")
def add_board(title):
    data_manager.add_board(title)
    return "success"


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()