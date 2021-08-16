
CREATE TABLE products (
	product_id integer NOT NULL,
	name varchar(32) NOT NULL,
	slogan varchar(255) NOT NULL,
	description text NOT NULL,
	category varchar(32) NOT NULL,
	default_price DECIMAL NOT NULL,
	primary key (product_id)
);

CREATE TABLE features (
	id int NOT NULL,
	feature TEXT NOT NULL,
	value TEXT NOT NULL
);

CREATE TABLE related_products (
	id int NOT NULL,
	related_product_id int NOT NULL
);

CREATE TABLE styles (
	productid int NOT nUlL,
	style_id int NOT NULL,
	name varchar(32) NOT nUlL,
	original_price int NOT NuLl,
	sale_price int DeFaUlT NuLl,
	default_style bool NOT nUlL,
	PRIMARY KEY (style_id)
);

CREATE TABLE photos (
	style_id int NOT NULL,
	thumbnail_url TEXT NOT NULL,
	url TEXT NOT NULL
);

CREATE TABLE skus (
	quantity int NOT NULL,
	size TEXT NOT NULL,
	style_id int NOT NULL
);

ALTER TABLE features ADD CONSTRAINT features_fk0 FOREIGN KEY (id) REFERENCES products(product_id);

ALTER TABLE related_products ADD CONSTRAINT related_products_fk0 FOREIGN KEY (id) REFERENCES products(product_id);

ALTER TABLE styles ADD CONSTRAINT styles_fk0 FOREIGN KEY (productid) REFERENCES products(product_id);

ALTER TABLE photos ADD CONSTRAINT photos_fk0 FOREIGN KEY (style_id) REFERENCES styles(style_id);

ALTER TABLE skus ADD CONSTRAINT skus_fk2 FOREIGN KEY (style_id) REFERENCES styles(style_id);






