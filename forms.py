from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField , SubmitField, RadioField,TextAreaField
from wtforms.validators import DataRequired , Length , Email


class LoginForm(FlaskForm):
    email = StringField('אימייל',
                        validators=[DataRequired(),Email()])
    password= PasswordField('סיסמא',
                            validators=[DataRequired()])
    submit = SubmitField('התחבר')

class SignOutForm(FlaskForm):
    submit = SubmitField('התנתק')

class signupForm(FlaskForm):
    email = StringField("דואר אלקטרוני")
    password= PasswordField("סיסמא")
    name = StringField("שם פרטי")
    last = StringField("שם משפחה")
    Admin = RadioField("?אדמין",choices=[('true','כן'),('false','לא')], validators=[DataRequired()])
    submit=SubmitField("הרשם")
