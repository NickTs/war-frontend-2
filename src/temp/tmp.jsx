import {connect} from "react-redux";
import UserTypes from "../all/data/UserTypes";
import ReactDOM from "react-dom";

<Grid container direction="col" spacing={0} style={{padding:0}}>
    <Grid item xs={12} sm={6}>
        123
    </Grid>
    <Grid item  xs={12} sm={6}>
        <img src="/static/bg.png" width={620} height={1000}/>
    </Grid>
</Grid>


img{
    object-fit: cover;
    width: 100px;
    height: 100px;
}

.crop {
    width: 200px;
    height: 150px;
    overflow: hidden;
}

.crop img {
    width: 400px;
    height: 300px;
    margin: -75px 0 0 -100px;
}

<div className='image'></div>
.image{
    width: 200px;
    height: 300px;
    background: url('ваша картинка') no-repeat center center;
    background-size: cover;
}

.img-reponsive {
    display:block;
    width:100%;
    max-width:100%;
    height:auto;
}






.img_wrap {
    width: 300px;
    height: 200px;
    border-style: solid;
}

.img_wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 0 0;
}

<body>
<div className="img_wrap">
    <img src="https://image.ibb.co/kgdbvb/v.jpg" alt="vertical"/>
</div>

<div className="img_wrap">
    <img src="https://image.ibb.co/gft9Fb/h.jpg" alt="horizontal"/>
</div>

<div className="img_wrap">
    <img src="https://image.ibb.co/hUgwvb/n.jpg" alt="normal"/>
</div>
</body>



backgroundImage: url("/static/bg.png")



let l = this.state.l;

this.setState({
    l: "ru"
});




onChange={this.changeLang.bind(this)}





const mapStateToProps = function (state) {
    return {
        l: state.l
    }
}
​
​
export default connect(
    mapStateToProps
)(RegisterFirstPageFunc)



function RegisterFirstPageFunc(props) {
    const {lang} = props;
    return (
        <div><p>Register page 3 {lang}</p></div>
    )
}




let RegisterFirstPage = ({lang, classes, handleSubmit, submitting})=> {
    <form onSubmit={handleSubmit}>
        <Field name="email" label="Email" component="input"/>
        <Field name="phone" label="Phone" component="input"/>
        <button type="submit" disabled={submitting}>Submit</button>
    </form>
}



<input {...input} placeholder={label}/>





const createRender = render => ({className, input, meta, label, ...rest}) => (
    <div>
        <pre>{JSON.stringify(meta, 0, 2)}</pre>
        <pre>className={className}</pre>
        {render(input, label, rest)}
        {meta.error && <span>{meta.error}</span>}
    </div>
)

const RenderInput = createRender((input, label) =>
    <FormControl className={classes.formControl} error aria-describedby="component-error-text">
        <InputLabel>
            {label}
        </InputLabel>
        <Input id="component-error" value=""/>
        <FormHelperText id="component-error-text">Error</FormHelperText>
    </FormControl>
)

const RenderSelect = createRender((input, label, {children}) =>
    <select {...input}>
        {children}
    </select>
)

let RegisterFirstPage = ({lang, classes, handleSubmit, submitting}) => (
    <form onSubmit={handleSubmit}>
        <Field name="email" label="Email" className={classes.som2} component={RenderInput}/>
        <Field name="phone" label="Phone" component={RenderInput}/>
        <Field name="userType" label="UserType" component={RenderSelect}>
            {UserTypes.map(userType =>
                <option key={userType} value={userType}>
                    {userType}
                </option>
            )}
        </Field>
        <button type="submit" disabled={submitting}>Finished</button>
    </form>
)

    <div>
    <Field name="userType" component={renderSelectField} label="User Type">
    {userTypes.map(option => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
    ))}
</Field>
</div>




const renderTextField = ({
                             input,
                             label,
                             meta
                         }) => (
    <div>
        <FormControl variant="outlined">
            <InputLabel ref={ref => {
                this.labelRef = ReactDOM.findDOMNode(ref);
            }}
                        htmlFor={input.name}
            >
                {label}
            </InputLabel>
            <OutlinedInput id={input.name} {...input}
                           labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
            />
            <FormHelperText id="component-error-text">{meta.error}</FormHelperText>
        </FormControl>

    </div>
)

