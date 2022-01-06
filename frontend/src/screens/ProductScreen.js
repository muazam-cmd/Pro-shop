import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'



const ProductScreen = ({ history, match }) => {

    const [qty, setQty] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const AddtoCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush' />
                    <ListGroupItem style={{ border: "none" }}>
                        <h3>{product.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem style={{ border: "none", borderTop: '1px solid #EEEEEE' }}>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroupItem>
                    <ListGroupItem style={{ border: "none", borderTop: '1px solid #EEEEEE' }}>
                        Price: ${product.price}
                    </ListGroupItem>
                    <ListGroupItem style={{ border: "none", borderTop: '1px solid #EEEEEE' }}>
                        Description: {product.description}
                    </ListGroupItem>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush' >
                            <ListGroupItem style={{ border: "none", borderTop: '1px solid #EEEEEE' }}>
                                <Row>
                                    <Col>
                                        price:
                         </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem style={{ border: "none", borderTop: '1px solid #EEEEEE' }}>
                                <Row>
                                    <Col>
                                        Status:
                         </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroupItem className="d-grid gap-2" style={{ border: "none", borderTop: '1px solid #EEEEEE' }}>
                                <Button
                                    onClick={AddtoCartHandler}
                                    className='btn btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}>
                                    Add to Cart
                             </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        )}

    </>
}

export default ProductScreen
