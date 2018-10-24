import database_common


@database_common.connection_handler
def get_all_users(cursor):
    cursor.execute("""SELECT * FROM users; """)
    all_users = cursor.fetchall()
    return all_users


@database_common.connection_handler
def get_all_boards(cursor):
    cursor.execute("""SELECT * FROM boards; """)
    all_boards = cursor.fetchall()
    return all_boards


@database_common.connection_handler
def get_cards_by_board_id(cursor, boardId ):
    cursor.execute('SELECT * FROM cards WHERE board_id = {};'.format(boardId))
    cards = cursor.fetchall()
    return cards


@database_common.connection_handler
def update_status(cursor, cardId, newStatus, newBoardId):
    cursor.execute(' UPDATE cards SET status_id = {}, board_id = {} '
                    'WHERE id = %s;'.format(newStatus, newBoardId), (cardId,))



@database_common.connection_handler
def get_counter_by_board_id(cursor, boardId ):
    cursor.execute('SELECT * FROM cards WHERE board_id = {};'.format(boardId))
    counter = cursor.fetchall()
    return counter
