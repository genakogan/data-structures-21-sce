from flask import Flask,render_template,request,flash,session,redirect,url_for,abort
from forms import LoginForm,SignOutForm,signupForm

#from flask_socketio import SocketIO, send

import pyrebase
import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import firestore
app = Flask(__name__)

app.config['SECRET_KEY']='ds'
#socketio = SocketIO(app, cors_allowed_origins='*')
import json 
import os
import tempfile
from werkzeug.utils import secure_filename



config = {
  "apiKey": "AIzaSyB46MI1-J60onnsZjecaJHCdviikVl0ueY",
  "authDomain": "datastructure-946ff.firebaseapp.com",
  "databaseURL": "https://datastructure-946ff-default-rtdb.firebaseio.com/",
  "projectId": "datastructure-946ff",
  "storageBucket": "datastructure-946ff.appspot.com",
  "messagingSenderId": "501392634768",
  "appId": "1:501392634768:web:a993fa90d6727421ae7915",
  "measurementId": "G-8Z8G964YVP"
}


cred = credentials.Certificate('datastructure-946ff-firebase-adminsdk-tly4t-eaa84ffde3.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


firebase = pyrebase.initialize_app(config)
auth= firebase.auth()
storage=firebase.storage()

#auth.sign_in_with_email_and_password("bushra@gmail.com","123456")
#auth.create_user_with_email_and_password("email2@gmail.com","password")

#
#@socketio.on('message')
#def handleMessage(msg):
#	print('Message: ' + msg)
#	send(msg, broadcast=True)
#
#if __name__ == '__main__':
#	socketio.run(app)

@app.route('/')
@app.route('/HomePage',methods=['GET', 'POST'])
def home():
    form = LoginForm()
    if form.validate_on_submit():
        try:
            auth.sign_in_with_email_and_password(form.email.data,form.password.data)
            session["user"]=form.email.data
            #return render_template('HomePage.html',form=form)
            return redirect(url_for("user"))
            
        except:
            return render_template('login.html',form=form,us="Not Exist")
    else:
        if "user" in session:
            return redirect(url_for("user"))
        return render_template('login.html',form=form)





@app.route('/user',methods=['GET', 'POST'])
def user():
    form = SignOutForm()
    if form.validate_on_submit():
        return redirect(url_for("home"))
    return render_template('HomePage.html',form=form)

@app.route('/userHome',methods=['GET', 'POST'])
def userHome():
    return render_template('HomePage.html')

@app.route('/logout')
def logout():
    session.pop("user",None)
    return redirect(url_for("home"))

@app.route('/avl')
def Avl():
    return redirect(url_for("AvlGo"))

@app.route('/avlGo')
def AvlGo():
    return render_template('index.html')


@app.route('/bst')
def bst():
    return redirect(url_for("bstGo"))

@app.route('/bstGo')
def bstGo():
    return render_template('bst.html')


@app.route('/quick')
def quick():
    return redirect(url_for("quickGo"))

@app.route('/quickGo')
def quickGo():
    return render_template('quickPage.html')


@app.route('/insertion')
def insertion():
    return redirect(url_for("insertionGo"))

@app.route('/insertionGo')
def insertionGo():
    return render_template('insertionPage.html')


@app.route('/counting')
def counting():
    return redirect(url_for("countingGo"))

@app.route('/countingGo')
def countingGo():
    return render_template('countingSort.html')

@app.route('/Bfs')
def Bfs():
    return redirect(url_for("BfsGo"))

@app.route('/BfsGo')
def BfsGo():
    return render_template('BfsHome.html')



@app.route('/Dfs')
def Dfs():
    return redirect(url_for("DfsGo"))

@app.route('/DfsGo')
def DfsGo():
    return render_template('Dfs.html')


@app.route('/Heap')
def Heap():
    return redirect(url_for("HeapGo"))

@app.route('/HeapGo')
def HeapGo():
    return render_template('heap.html')


@app.route('/Merge')
def Merge():
    return redirect(url_for("MergeGo"))

@app.route('/MergeGo')
def MergeGo():
    return render_template('MergeSort.html')


@app.route('/MinHeap')
def MinHeap():
    return redirect(url_for("MinHeapGo"))

@app.route('/MinHeapGo')
def MinHeapGo():
    return render_template('MinHeapPage.html')



@app.route('/register',methods=['GET', 'POST'])
def register():
    form=signupForm()
    if request.method == 'POST':
        return redirect(url_for("signup"))
    return render_template('signup.html',form=form)

#signup

@app.route('/signup',methods=['GET', 'POST'])
def signup():
    form=signupForm()
    if request.method == 'POST':
        email=form.email.data
        password=form.password.data
        name=form.name.data
        last=form.last.data
        user=auth.create_user_with_email_and_password(email,password)
        data={"name":name,"last":last,"email":email,"password":password,"admin":False}
        #db.child("Guest").push(data)
        #data2={"name":"1","other":email,"shadowing":"123"}
        #db.child("Parks").push(data2)
        print(auth.get_account_info(user['idToken'])['users'][0]['localId'])
        info=auth.get_account_info(user['idToken'])['users'][0]['localId']
        db.collection(u'Users').document(info).set(data)
        return redirect(url_for("home"))
    return render_template('signup.html',form=form)


if __name__ == '__main__':
    app.run(debug=True)