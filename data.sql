USE patines_12;

INSERT INTO type_user(user_type)VALUES 
('usuario'),
('administrador');

INSERT INTO users (first_name, last_name, email, password, img_user, type_user_id)VALUES 
('Nayeli', 'Hernández', 'naye@correo.com', 'ab987654', '/img/users/imgU_1627693378178.jpg', 2),
('Leslie', 'De La Cruz', 'leslie@correo.com', 'ac456123', '/img/users/imgU_1627692954019.jpg', 2),
('Ana', 'Isabel', 'anaisa@correo.com', 'add1236g54', '/img/users/imgU_1627693061873.jpg', 2),
('Ramon', 'Valdez', 'ramonv@correo.com', '4d563g21', '/img/users/imagen-user-default.png', 1),
('Adela', 'Fuerte', 'adelita@correo.com', '454f781h06', '/img/users/imagen-user-default.png', 1),
('Miguel', 'Tompson', 'miguelon@correo.com', 'sap0d9tg9', '/img/users/imagen-user-default.png', 1),
('Pamela', 'Aguila', 'aguilapam@correo.com', '76tjaet', '/img/users/imagen-user-default.png', 1),
('Pablo', 'Nail', 'Pablon@correo.com', '6\erbh45', '/img/users/imagen-user-default.png', 1),
('Andrea', 'Muchi', 'muchimuchi@correo.com', 'v5489y178', '/img/users/imagen-user-default.png', 1),
('Isaias', 'Rizotto', 'izoto@correo.com', 'ct53s57g', '/img/users/imagen-user-default.png', 1);

INSERT INTO shopping_cart(user_id, quantity_items, total_price)VALUES 
(2, 8, 2475.50),
(6, 2, 47.75),
(9, 5, 832.00),
(4, 6, 3560.14),
(10, 1, 132.60),
(9, 2, 520.00),
(5, 3, 255.50),
(1, 3, 9373.00),
(7, 2, 4123.20),
(4, 6, 784.35);

INSERT INTO brands(name_brand)VALUES 
('FR'),
('FLYING EAGLE'),
('PLAYLIFE'),
('FILA'),
('SFR'),
('ROLLERBLADE'),
('POWERSLIDE'),
('SWAY'), 
('JONCOM');

INSERT INTO category(name_category)VALUES 
('Patines'),
('Equipo de protección'),
('Accesorio'),
('Refaccion');

INSERT INTO products(name_product, price, brand_id, description, category_id)VALUES 
('Patines NEXT CORE 80', 5742.50, 7, 'Patines freeskate con tecnología de de bota NEX termo moldeable My Fit
, cierre de carraca y micrométricos, refuerzo extraible en puntera y chasis Trinity de 243 mm, ruedas de 80 mm 85A y rodamietos Wicked Abec 9. 
Disponible en color negro y rosa', 1),
('Patines BKB B5S', 2632.50, 2, 'Patines freeskate de exelente relación calidad-precio, este 
modelo cuenta con bota de plastico comoda y muy resistente, cierre de carraca y micrometricos, 
chasis de aluminio con tornillo roscados, rueda de 80 mm 85A y rodamieto ABEC7. 
Disponible en color negro y rosa', 1),
('Juego de protecciones para patinaje o ciclismo', 480.60, 9, 'Este juego de protecciones cuenta con un par de coderas, rodilleras y guantes protectores, echos con una doble capa, la primera capa es de polipropileno resistente a la abración 
y la segunda capa de EVA gruesa, materiales textiles transpirables y comodos. Disponible en color ', 2),
('Juego de protecciones para patinaje o ciclismo', 480.60, 9, 'Este juego de protecciones cuenta con un par de coderas, rodilleras y guantes protectores, echos con una doble capa, la primera capa es de polipropileno resistente a la abración 
y la segunda capa de EVA gruesa, materiales textiles transpirables y comodos. Disponible en color ', 2)
;

INSERT INTO color(color)VALUES
('rojo'),
('negro'),
('morado'),
('rosa'),
('verde'),
('naranja'),
('lila'),
('gris claro'),
('gris oscuro');

INSERT INTO products_catalogue(product_id, url_imagen, color_id)VALUES
(1, '/img/products/No-img.png', 3),
(2, '/img/products/No-img.png', 6),
(3, '/img/products/No-img.png', 1),
(4, '/img/products/No-img.png', 8);

INSERT INTO sizes(value_size)VALUES
('CH'),
('M'),
('G'),
('23'),
('24'),
('25'),
('26'),
('20'),
('22');

INSERT INTO products_stock(product_catalogue_id, size_id, quantity)VALUES
(1, 4, 25),
(1, 5, 30),
(1, 6, 5),
(2, 7, 50),
(2, 8, 15),
(2, 9, 37),
(3, 5, 73),
(4, 1, 68),
(4, 2, 37),
(4, 3, 87);

INSERT INTO order_detail(shopping_cart_id, user_id, product_id)VALUES
(1, 4, 1),
(2, 5, 2),
(3, 6, 3),
(4, 7, 4),
(5, 8, 1),
(6, 9, 2),
(7, 5, 3),
(8, 1, 4),
(9, 2, 1),
(10, 3, 2);
