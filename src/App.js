import React, { useState } from "react";
import "./App.scss";
import { Navbar, Container, Row, Col, Alert, Table } from "react-bootstrap";
import Upload from "./components/Upload";
import Predict from "./components/Predict";
import Category from "./assets/category.png";
import Product from "./assets/product.png";
import Seller from "./assets/seller.png";
import ReactApexChart from "react-apexcharts";

function App() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [customerId, setCustomerId] = useState("");
  const [category, setCategory] = useState("Product Category");

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [seller, setSeller] = useState([]);

  const colors = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#bdc3c7",
    "#2980b9",
    "#d35400",
  ];

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
  });
  const [series] = useState([
    {
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
    },
  ]);

  const handleFileUpload = async () => {
    setLoading(true);
    setError(false);
    setErrorMsg("");

    try {
      console.log("data before sending -->");

      const data = {
        customer_id: customerId,
      };

      const res = await postRawData(
        "http://192.168.18.221:5000/api/recommendations",
        data
      );
      console.log("res -->", res);
      if (res.status == 200) {
        setCategories(res.Product_Categories);
        setProduct(res.Product_Id);
        setSeller(res.Seller_Id);
        if (category === "Product Category") {
          setOptions({
            ...options,
            xaxis: {
              ...options.xaxis,
              categories: res.Product_Categories,
            },
          });
        } else if (category === "Seller ID") {
          setOptions({
            ...options,
            xaxis: {
              ...options.xaxis,
              categories: res.Seller_Id,
            },
          });
        } else if (category === "Product ID") {
          setOptions({
            ...options,
            xaxis: {
              ...options.xaxis,
              categories: res.Product_Id,
            },
          });
        }
        setLoading(false);
        setStep(step + 1);
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      setErrorMsg(err.message);
      console.log("error -->", err);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // Example POST method implementation with form data
  async function postFormData(url = "", data = {}) {
    console.log("data -->", data);
    const response = await fetch(url, {
      method: "POST",
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: data,
    });
    return response.json();
  }

  // Example POST method implementation with raw data
  async function postRawData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const uploadProps = {
    loading,
    customerId,
    category,
    setCustomerId,
    setCategory,
    handleFileUpload,
  };

  const predictProps = {
    categories,
    category,
    product,
    seller,
    handleBack,
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Recommendation System</Navbar.Brand>
      </Navbar>
      {error ? (
        <Alert
          variant="danger"
          onClose={() => {
            setError(false);
            setErrorMsg("");
          }}
          dismissible
        >
          {errorMsg}
        </Alert>
      ) : null}
      <Container>
        <Row>
          <Col>
            <div className="content-card">
              {step === 0 ? (
                <Upload {...uploadProps} />
              ) : step === 1 ? (
                <Predict {...predictProps} />
              ) : null}
            </div>
          </Col>
        </Row>

        {step === 1 ? (
          <Row>
            <Col>
              <div className="content-card">
                <section className="container">
                  <div id="chart">
                    <ReactApexChart
                      options={options}
                      series={series}
                      type="bar"
                      height={350}
                    />
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        ) : null}

        <Row>
          <Col>
            <div className="content-card">
              <section className="container">
                <div className="head">
                  <h3>Testing Result</h3>
                  <p>P.S: Accuracy is in Percentage.</p>
                </div>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th scope="row">Total Testing Data Length</th>
                      <td>10875</td>
                    </tr>
                    {category === "Product Category" ? (
                      <tr>
                        <th scope="row">True Predicted Product Category</th>
                        <td>7564</td>
                      </tr>
                    ) : null}
                    {category === "Product Category" ? (
                      <tr>
                        <th scope="row">False Predicted Product Category</th>
                        <td>3311</td>
                      </tr>
                    ) : null}
                    {category === "Seller ID" ? (
                      <tr>
                        <th scope="row">True Predicted Seller ID</th>
                        <td>7208</td>
                      </tr>
                    ) : null}
                    {category === "Seller ID" ? (
                      <tr>
                        <th scope="row">False Predicted Seller ID</th>
                        <td>3667</td>
                      </tr>
                    ) : null}
                    {category === "Product ID" ? (
                      <tr>
                        <th scope="row">True Predicted Product ID</th>
                        <td>7472</td>
                      </tr>
                    ) : null}
                    {category === "Product ID" ? (
                      <tr>
                        <th scope="row">False Predicted Product ID</th>
                        <td>3403</td>
                      </tr>
                    ) : null}
                    {category === "Product Category" ? (
                      <tr>
                        <th scope="row">
                          Testing accuracy of Product Category
                        </th>
                        <td>69.55402298850575</td>
                      </tr>
                    ) : null}
                    {category === "Seller ID" ? (
                      <tr>
                        <th scope="row">Testing accuracy of Seller ID</th>
                        <td>66.28045977402299</td>
                      </tr>
                    ) : null}
                    {category === "Product ID" ? (
                      <tr>
                        <th scope="row">Testing accuracy of Product ID</th>
                        <td>68.7080459774137931</td>
                      </tr>
                    ) : null}
                  </tbody>
                </Table>
              </section>
            </div>
          </Col>
        </Row>

        {category === "Product Category" ? (
          <Row>
            <Col>
              <div className="content-card">
                <section className="container">
                  <div className="graph-img">
                    <img src={Category} alt="" />
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        ) : category === "Seller ID" ? (
          <Row>
            <Col>
              <div className="content-card">
                <section className="container">
                  <div className="graph-img">
                    <img src={Seller} alt="" />
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        ) : category === "Product ID" ? (
          <Row>
            <Col>
              <div className="content-card">
                <section className="container">
                  <div className="graph-img">
                    <img src={Product} alt="" />
                  </div>
                </section>
              </div>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default App;
