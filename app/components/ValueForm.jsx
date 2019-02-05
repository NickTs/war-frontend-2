import React from 'react';

export default class ValueForm extends React.Component {
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            intId: props.value ? props.value : '',
            vt: props.value ? props.value : 'pict',

            error: ''
        };
    }

    onNameChange(e) {
        const name = e.target.value;
        this.setState(() => ({ intId: intId }));
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.intId && !this.state.vt) {
            this.setState(() => ({ error: 'Please set title & author & published!' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmitValue(
                {
                    intId: this.state.intId,
                    vt: this.state.vt
                }
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <form onSubmit={this.onSubmit} className='add-value-form'>

                    <input type="text" placeholder="name" autoFocus
                           value={this.state.intId}
                           onChange={this.onNameChange} />
                    <br />


                    <button>Add Value</button>
                </form>
            </div>
        );
    }
}