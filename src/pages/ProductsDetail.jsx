import React, { useEffect } from "react";
import { Card, CardImg, Carousel, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";

const ProductsDetail = () => {
  
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productList = useSelector((state) => state.products);

  const product = productList.find(productItem=> productItem.id === Number(id))
  
  const relatedProducts = productList.filter(productItem => productItem.category.id == product.category.id)

  
  return (
    <div>
      <Row>
      <Col lg={9}>
      {product?.title}
      <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={product?.productImgs[0]}
          style={{ height: 300, objectFit: "contain" }}
          alt="First slide"
        />
    
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={product?.productImgs[1]}
          style={{ height: 300, objectFit: "contain" }}
          alt="Second slide"
        />

       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={product?.productImgs[2]}
          style={{ height: 300, objectFit: "contain" }}
          alt="Third slide"
        />

       
      </Carousel.Item>
    </Carousel>
    {product.description}
    </Col>
    <Col lg={3}>
       {relatedProducts.map((newsItem) => (
        <li key={newsItem.id}>
          <Link to={`/products/${newsItem.id}`}>
            {newsItem.title} <br />
            <img src={newsItem.productImgs[0]}
            style={{ height: 100, objectFit: "cover" }}/>
          </Link>
        </li>
      ))}
      </Col>
       </Row>
    </div>
  )
};

export default ProductsDetail;
