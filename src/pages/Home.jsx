import axios from "axios";
import { Button, Card, CardImg, Col, Form, InputGroup, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterHeadlineThunk,
  filterProductsThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categoriesList, setCategoriesList] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategoriesList(res.data.data.categories));
  }, []);

  return (
    <div>
      <Row>
        <Col lg={3}>
        <ListGroup>
          {categoriesList.map((category) => (
            <ListGroup.Item
              onClick={() => dispatch(filterProductsThunk(category.id))}
              key={category.id}
              style={{ cursor: "pointer" }}
            >
              {category.name}
              </ListGroup.Item>
          ))}
          </ListGroup>
        </Col>
        <Col lg={9}>
          <h1>Componente Home</h1>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button
              onClick={() => dispatch(filterHeadlineThunk(inputSearch))}
              variant="outline-secondary"
            >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
            
            <Card>

            
            
              <Link to={`/products/${product.id}`}>
                
                <Card.Title>{product.title}</Card.Title>
                <Card.Img variant="top" style={{ height: 200, objectFit: "contain" }} src={product.productImgs[0]}/>
                
              </Link>
            </Card>
          </Col>
          ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
