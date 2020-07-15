import React, {Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FomrGroup,
    Label,
    Input,
    FormGroup
} from 'reactstrap'
import {connect} from 'react-redux'
import {v1 as uuid} from 'uuid'
import {addItem} from '../actions/itemActions'

class ItemModal extends Component{
    state={
        modal: false, 
        name: ''
    }

    toggle = ()=>{
        this.setState({ modal: !this.state.modal })
    }

    handleChange =(e)=> {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const item = {
            id: uuid(),
            name: this.state.name
        }
        this.props.dispatch(addItem(item))
        this.toggle()
    }

    render(){
        return(
            <div>
                <Button 
                    color="dark"
                    style={{marginBottom: '15px'}}
                    onClick={this.toggle}
                >Add item</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" placeholder="Add an item" id="item" onChange={(e) => {this.handleChange(e)}} />
                            </FormGroup>
                            <Button 
                                type="submit" 
                                color="dark"
                                style={{marginTop: '15px'}} 
                                block
                            >Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect()(ItemModal)