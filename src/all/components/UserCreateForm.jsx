import React from 'react'
import {reduxForm, Field} from 'redux-form'

let UserCreateForm = () =>
    <form>
        <div>
            <label>Email</label>
            <Field name="email" component="input"/>
        </div>
    </form>

UserCreateForm = reduxForm({
    form: 'userCreate'
})
export default UserCreateForm