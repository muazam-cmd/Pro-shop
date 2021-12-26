import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [match])


    return <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
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
                        <ListGroupItem className="d-grid gap-2" style={{ border: "none", borderTop: '1px solid #EEEEEE' }}>
                            <Button className='btn btn-block' type='button' disabled={product.countInStock === 0}>
                                Add to Cart
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>


        </Row>
    </>
}

export default ProductScreen