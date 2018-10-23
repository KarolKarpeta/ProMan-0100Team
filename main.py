from flask import Flask, render_template
import data_manager
app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''

    print("USERS", data_manager.get_all_users())
    return render_template('boards.html')


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()