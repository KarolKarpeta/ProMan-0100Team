from flask import Flask, render_template, jsonify, request, redirect, url_for, flash, session
import data_manager
app = Flask(__name__)

app.secret_key = "fdgssvervw4evretwbr4b4wbvw4oiuvho843hyf0g8yh3ihofhvgohroighvogihvvdkb"

@app.route("/")
def start():

    return render_template('login.html')



@app.route("/login", methods=["POST", "GET"])
def login():
    #check if login and password is correct!
    login = request.form['login']
    password = request.form['password']
    id_and_name = data_manager.check_user_login_and_password(login, password)

    if id_and_name == []:
        flash('User login or password are incorrect')

        return redirect(url_for('start'))
    else:
        session['username'] = id_and_name[0]['name']
        session['id'] = id_and_name[0]['id']

        return redirect(url_for('boards') )


@app.route("/register", methods=["POST", "GET"])
def register():
    #check if login and password is correct!
    login = request.form['login']
    password = request.form['password']
    id_and_name = data_manager.check_user_login_and_password(login, password)

    if id_and_name != []:
        flash('Username {login} already exists').format(login=login)

        return redirect(url_for('register'))
    else:
        # place for function adding user to database
        user_id = len(data_manager.get_all_users()) + 1

        data_manager.add_user(user_id, login, password)
        id_and_name = data_manager.check_user_login_and_password(login, password)
        session['username'] = id_and_name[0]['name']
        session['id'] = id_and_name[0]['id']

        return redirect(url_for('boards') )


@app.route("/end-session")
def end_session():
    session.clear()

    return "success"

@app.route("/registration")
def registration():

    return render_template('register.html')



@app.route("/boards")
def boards():

    return render_template('boards.html')


@app.route("/get-boards")
def get_boards():
    if session:
        id = session['id']
    else:
        id = 1
    boards = data_manager.get_all_boards_by_user_id(id)

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
    user_id = session['id']
    title = request.form["title"]
    data_manager.add_board(title, user_id)

    return "success"


@app.route("/add-card", methods=["POST"])
def add_card():
    title = request.form["title"]
    board_id = request.form["boardId"]
    status_id = request.form["statusId"]
    data_manager.add_card(title, board_id, status_id)

    return "Success"


@app.route("/get-counter-board-id/<int:boardId>")
def get_counter_by_board_id(boardId):
    counter = data_manager.get_counter_by_board_id(boardId)

    return jsonify(counter)


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()