import React from 'react'
import { Col, Button, Spinner, Form } from 'react-bootstrap';

const Upload = ({
  loading,
  customerId,
  category,
  setCustomerId,
  setCategory,
  handleFileUpload
}) => {

  return (
    <>
      {
        loading
          ? <div className="center">
            <Spinner animation="border" variant="secondary" />
            <p>Fetching Recommendations</p>
          </div>
          : < section className="container" >
            <div className="head">

              <h3>
                Enter a customer ID to get recommendations
            </h3>
            </div>
            <Form>
              <Form.Row>
                <Col xs={7}>
                  <Form.Control placeholder="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} />
                </Col>
                <Col xs={3}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" value={category} onChange={e => setCategory(e.target.value)} >
                      <option>Product Category</option>
                      <option>Seller ID</option>
                      <option>Product ID</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Button onClick={handleFileUpload} style={{ width: '100%' }} disabled={!customerId} variant="secondary">Go</Button>
                </Col>
              </Form.Row>
            </Form>
          </section >
      }
    </>
  );
}

export default Upload
