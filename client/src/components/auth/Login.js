import React, {Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input,
    FormGroup,
    NavLink,
    Alert
} from 'reactstrap'
import {connect} from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component{
    state={
        modal: false, 
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props
        if(error !== prevProps.error){
            if(error.id == "LOGIN_FAIL"){
                this.setState({ msg: error.msg.msg })
            }else{
                this.setState({ msg: null })
            }
        }
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle()
            }
        }
    }

    toggle = ()=>{
        this.props.clearErrors()
        this.setState({ modal: !this.state.modal })
    }

    handleChange =(e)=> {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const { email, password } = this.state
        this.props.login({ email, password })
    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="email">Item</Label>
                                <Input type="email" name="email" placeholder="Email" id="email" onChange={(e) => {this.handleChange(e)}} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Item</Label>
                                <Input type="password" name="password" placeholder="Password" id="password" onChange={(e) => {this.handleChange(e)}} />
                            </FormGroup>
                            <Button 
                                type="submit" 
                                color="dark"
                                style={{marginTop: '15px'}} 
                                block
                            >Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)