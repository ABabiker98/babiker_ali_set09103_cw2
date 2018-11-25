from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/archive/creator/')
def creator():
    return render_template('creator.html')

@app.route('/archive/')
def archive():
    return render_template('archive.html')
@app.route('/login/')
def loginpage():
    return render_template('login.html')
@app.route('/register')
def register():
    return render_template('register.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error.html')

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('error505.html'), 500S

@app.route('/login', methods=['POST'])
def do_admin_login():
POST_USERNAME = str(request.form['username'])
POST_PASSWORD = str(request.form['password'])

Session = sessionmaker(bind=engine)
s = Session()
query = s.query(User).filter(User.username.in_([POST_USERNAME]), User.password.in_([POST_PASSWORD]) )
result = query.first()
     if result:
    session['logged_in'] = True
else:
    flash('wrong password!')
return login()

@app.route("/logout")
def logout():
session['logged_in'] = False
return home()

if __name__ == "__cw2__":
    app.run(host=0.0.0.0 , debug=True)
