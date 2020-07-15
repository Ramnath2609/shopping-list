import React, {Component} from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {v1 as uuid} from 'uuid'
import { connect } from 'react-redux'
import { getItems, addItem, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems()
    }


    removeItem=(id)=>{
       this.props.deleteItem(id)
    }

    render(){
        const {items} = this.props
        return(
            <Container style={{ marginTop: '15px'}}>
                {this.props.items && 
                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                            {items.map(item => {
                                return <CSSTransition key={item._id} timeout={500} classNames="fade">
                                    <ListGroupItem key={item._id}>
                                        <Button color="danger" className="remove-btn" size="sm" onClick={() => {this.removeItem(item._id)}}>&times;</Button>
                                        {item.name}
                                    </ListGroupItem>
                                </CSSTransition>
                            })}
                        </TransitionGroup>
                    </ListGroup>
                }
                
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        items: state.items.items
    }
}

export default connect(mapStateToProps, {getItems, deleteItem, addItem})(ShoppingList)