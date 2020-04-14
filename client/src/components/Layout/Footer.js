import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer__main">
      <div className="main__left">
        <h4 className="left__title">Полезная информация</h4>
        <ul className="left__list_of_links">
          <Link to="#">
            <li>О компании</li>
          </Link>
          <Link to="#">
            <li>Как купить товар</li>
          </Link>
          <Link to="#">
            <li>Как правильно искать товар</li>
          </Link>
          <Link to="#">
            <li>Возврат товара</li>
          </Link>
          <Link to="#">
            <li>Гарантийные условия</li>
          </Link>
          <Link to="#">
            <li>Политика конфиденциальности</li>
          </Link>
          <Link to="#">
            <li>Образец кассового чека</li>
          </Link>
        </ul>
      </div>
      <div className="main__right">
        <p>График работы: ежедневно с 10 до 19</p>
      </div>
    </div>
    <div className="sub-information">
      <div>
        <p>
          Фамилия, имя, отчество ИП без сокращений, сведения о государственной
          регистрации и наименовании органа осуществившего государственную
          регистрацию, УНП.
        </p>
        <p>©2020 Electronic'S.by - все для ремонта техники</p>
      </div>
    </div>
  </footer>
);

export default Footer;
