import {reduxForm} from "redux-form";


const validate = values => {
    const errors = {}
    const requiredFields = [
        'email',
        'phone'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const renderTextField = ({
                             input,
                             label,
                             meta: {touched, error},
                             ...custom
                         }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
)

const renderSelectField = ({
                               input,
                               label,
                               meta: {touched, error},
                               children,
                               ...custom
                           }) => (
    <Select
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        {...custom}
    >
        {children}
    </Select>
)


let RegisterFirstPage = props => {
    const {handleSubmit, pristine, reset, submitting} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email" component={renderTextField} label="Email"/>
            </div>
            <div>
                <Field name="Phone" component={renderTextField} label="Phone"/>
            </div>
            <div>
                <Field name="userType" component={renderSelectField} label="User type">
                    <MenuItem value="artist">Artist</MenuItem>
                    <MenuItem value="collector">Collector</MenuItem>
                    <MenuItem value="gallery">Gallery</MenuItem>
                </Field>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Create
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
}


RegisterFirstPage.propTypes = {
    classes: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

RegisterFirstPage = reduxForm({
    form: "RegisterFirst",
    validate
})(RegisterFirstPage)
