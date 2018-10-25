import database_common


@database_common.connection_handler
def get_all_users(cursor):
    cursor.execute("""SELECT * FROM users; """)
    all_users = cursor.fetchall()
    return all_users


@database_common.connection_handler
def get_all_boards_by_user_id(cursor, user_id):
    cursor.execute("""SELECT * FROM boards 
                      WHERE user_id = {};""".format(user_id))
    all_boards_by_user_id = cursor.fetchall()
    return all_boards_by_user_id


@database_common.connection_handler
def get_cards_by_board_id(cursor, board_id):
    cursor.execute('SELECT * FROM cards WHERE board_id = {};'.format(board_id))
    cards = cursor.fetchall()
    return cards


@database_common.connection_handler
def update_status(cursor, cardId, newStatus, newBoardId):
    cursor.execute(' UPDATE cards SET status_id = {}, board_id = {} '
                    'WHERE id = %s;'.format(newStatus, newBoardId), (cardId,))


@database_common.connection_handler
def get_counter_by_board_id(cursor, boardId ):
    cursor.execute('SELECT COUNT(*) as howMany FROM cards WHERE board_id = {};'.format(boardId))
    counter = cursor.fetchall()
    return counter


@database_common.connection_handler
def add_board(cursor, title, user_id):
    cursor.execute ("""
                    INSERT INTO boards (title, user_id)
                    VALUES ('{}','{}');
                    """.format(title, user_id))



@database_common.connection_handler
def add_card(cursor, title, board_id, status_id):
    cursor.execute ("""
                    INSERT INTO cards (title, board_id, status_id)
                    VALUES ('{}','{}','{}');
                    """.format(title, board_id, status_id))


@database_common.connection_handler # to be finished
def add_user(cursor, user_id, user_login, user_password):
    cursor.execute ("""
                    INSERT INTO users (id, name, password)
                    VALUES ('{}', '{}','{}');
                    """.format(user_id, user_login, user_password))


@database_common.connection_handler
def check_user_login_and_password(cursor, login, password):
    cursor.execute ("""
                    SELECT id, name FROM users
                    WHERE name = '{}'
                    AND password = '{}';""".format(login, password)
                    )
    user_id_and_name = cursor.fetchall()
    return user_id_and_name