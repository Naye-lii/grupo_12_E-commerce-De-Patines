CREATE DATABASE IF NOT EXISTS patines_12;
USE patines_12;

CREATE TABLE IF NOT EXISTS type_user(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_type VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(70) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL,
    img_user VARCHAR(500),
    type_user_id INT UNSIGNED NOT NULL, 
    PRIMARY KEY(id),
    FOREIGN KEY (type_user_id) REFERENCES type_user(id)    
);

CREATE TABLE IF NOT EXISTS shopping_cart(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    quantity_items INT UNSIGNED NOT NULL,
    total_price DOUBLE DEFAULT 0 NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS brands(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name_brand VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS category(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name_category VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS products (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name_product VARCHAR(50) NOT NULL,
    price DOUBLE DEFAULT 0 NOT NULL,
    brand_id INT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    category_id INT UNSIGNED NOT NULL, 
    PRIMARY KEY(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS color (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    color VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS products_catalogue (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    url_imagen VARCHAR(500) NOT NULL,
    color_id INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (color_id) REFERENCES color(id)
);

CREATE TABLE IF NOT EXISTS sizes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    value_size varchar(5) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS products_stock (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_catalogue_id INT UNSIGNED NOT NULL,
    size_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (product_catalogue_id) REFERENCES products_catalogue(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);

CREATE TABLE IF NOT EXISTS order_detail (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    shopping_cart_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    FOREIGN KEY (product_id) REFERENCES products(id);