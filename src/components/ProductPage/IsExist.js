import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
const FormForSaleByClick = ({ currentProduct }) => (
  <div className="product-page__right-container_down">
    {currentProduct.stock.slice(0, 8) === "добавить" ? (
      <>
        <h4>Купить в один клик!</h4>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Ваше имя</Form.Label>
            <Form.Control placeholder="Имя" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email адрес</Form.Label>
            <Form.Control type="email" placeholder="Введите email" />
          </Form.Group>

          <Form.Group controlId="formBasicNumber">
            <Form.Label>Ваш номер</Form.Label>
            <Form.Control placeholder="Номер" />
            <Form.Text className="text-muted">
              Мы не будем делиться этой информацией с кем-то ещё.
            </Form.Text>
          </Form.Group>
          <Button variant="success" type="submit">
            Отправить
          </Button>
        </Form>
      </>
    ) : (
      <>
        <h4>Товара нет в наличии</h4>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted">
              Но мы можем прислать письмо, когда товар поступит в продажу.
            </Form.Text>
            <Form.Label>Email адрес</Form.Label>
            <Form.Control type="email" placeholder="Введите email" />
          </Form.Group>
          <Button variant="success" type="submit">
            Уведомить при поступлении
          </Button>
        </Form>
      </>
    )}
  </div>
);

export default FormForSaleByClick;
