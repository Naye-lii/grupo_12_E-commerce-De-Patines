INSERT INTO type_user VALUES 
(1, 'usuario'),
(2, 'administrador');

INSERT INTO users (first_name, last_name, email, password, img_user, type_user_id)VALUES 
('Nayeli', 'Hernández', 'naye@correo.com', '$2b$11$qdDl9BcjqW.9IfYhIl90DOniNw8VY9uMnJ0YKZKC97NSJdCJE966K', '/img/users/imgU_1627693378178.jpg', 2),
('Leslie', 'De La Cruz', 'leslie@correo.com', '$2b$11$lJs4oPBThHyFyorTzre3Pu4kbfBhd595GJzB6Wqi3g7kx6KPMqnha', '/img/users/imgU_1627692954019.jpg', 2),
('Ana', 'Isabel', 'anaisa@correo.com', '$2b$11$tRBjuq8381VmONSgv3oVS.c4BaX3UMcGE8HRK7WAGPgiDvmcddQzO', '/img/users/imgU_1627693061873.jpg', 2),
('Ramon', 'Valdez', 'ramonv@correo.com', '$2b$11$yWMSzr6VeHcRtx8BznglfeHSUzgT4h6nW5F2dkuXaUGFiukWIalv2', '/img/users/imagen-user-default.png', 1),
('Adela', 'Fuerte', 'adelita@correo.com', '$2b$11$ubhh/ZprKf1CElf6A2jgv.NP8kTY4v26R0OM/TeA.1bdTY.Lvg8O2', '/img/users/imagen-user-default.png', 1),
('Miguel', 'Tompson', 'miguelon@correo.com', '$2b$11$DsPAenBhEAQUq/CW86GrlOtxTndFbgvskAVKTMLZuqJwfF2VnOTDa', '/img/users/imagen-user-default.png', 1),
('Pamela', 'Aguila', 'aguilapam@correo.com', '$2b$11$Auwg3IZdwY.qf85TmWXpru6s3foGz7JXzZminTcwVk5Lg.eAkz/9C', '/img/users/imagen-user-default.png', 1),
('Pablo', 'Nail', 'Pablon@correo.com', '$2b$11$wuuDEd2UJzF8shdbwGttIOveKiWiWGAsTzIdBoKNT3xKBVrCsUgoK', '/img/users/imagen-user-default.png', 1),
('Andrea', 'Muchi', 'muchimuchi@correo.com', '$2b$11$wuuDEd2UJzF8shdbwGttIOveKiWiWGAsTzIdBoKNT3xKBVrCsUgoK', '/img/users/imagen-user-default.png', 1),
('Isaias', 'Rizotto', 'izoto@correo.com', '$2b$11$wuuDEd2UJzF8shdbwGttIOveKiWiWGAsTzIdBoKNT3xKBVrCsUgoK', '/img/users/imagen-user-default.png', 1);

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

INSERT INTO products(name_product, price, brand_id, descripcion, category_id)VALUES 
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
(1, 'https://res.cloudinary.com/dc7uyfv94/image/upload/v1631301547/product4_ugluob.png', 3),
(2, 'https://res.cloudinary.com/dc7uyfv94/image/upload/v1631301544/product2_xwuzdi.png', 6),
(3, 'https://res.cloudinary.com/dc7uyfv94/image/upload/v1631301497/imgP_1626735234130_pammeb.jpg', 1),
(4, 'https://res.cloudinary.com/dc7uyfv94/image/upload/v1631301325/imgP_1626734593393_ivhaih.jpg', 8);

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