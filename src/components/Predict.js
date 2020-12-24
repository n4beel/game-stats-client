import React from 'react'
import { Row, Button, Table } from 'react-bootstrap'

const Predict = ({
  categories,
  category,
  product,
  seller,
  handleBack
}) => {
  return (
    <section className="container" >
      <div className="head">
        <h3>
          Recommendations
            </h3>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {
              category === "Product Category"
                ? <th>Product Categories</th>
                : null
            }
            {
              category === "Seller ID"
                ? <th>Product ID</th>
                : null
            }
            {
              category === "Product ID"
                ? <th>Seller ID</th>
                : null
            }
          </tr>
        </thead>
        <tbody>
          {
            categories.map((item, ind) =>
              (<tr key={ind}>
                <td>{ind + 1}</td>
                {
                  category === "Product Category"
                    ? <td>{categories[ind]}</td>
                    : null
                }
                {
                  category === "Product ID"
                    ? <td>{product[ind]}</td>
                    : null
                }
                {
                  category === "Seller ID"
                    ? <td>{seller[ind]}</td>
                    : null
                }
              </tr>)
            )
          }
        </tbody>
      </Table>
      <Row className="center footer">
        <Button onClick={handleBack} variant="outline-secondary">Back</Button>
      </Row>

    </section >

  )
}

export default Predict
