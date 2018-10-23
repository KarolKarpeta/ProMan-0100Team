import database_common


@database_common.connection_handler
def get_all_users(cursor):
    cursor.execute("""SELECT * FROM users; """)
    all_users = cursor.fetchall()
    return all_users
