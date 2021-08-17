
CREATE TABLE products (
	product_id integer NOT NULL,
	name varchar(32) NOT NULL,
	slogan varchar(255) NOT NULL,
	description text NOT NULL,
	category varchar(32) NOT NULL,
	default_price DECIMAL NOT NULL,
	primary key (product_id),
);

CREATE TABLE features (
	id int NOT NULL,
	feature TEXT NOT NULL,
	value TEXT NOT NULL,
	FOREIGN KEY (id) REFERENCES products(product_id)
);

CREATE TABLE related_products (
	id int NOT NULL,
	related_product_id int NOT NULL,
	FOREIGN KEY (id) REFERENCES products(product_id)
);

CREATE TABLE styles (
	productid int NoT nUlL,
	style_id int NOT nUlL,
	name varchar(32) NoT nUlL,
	original_price int NOT NuLl,
	sale_price int DeFaUlT NuLl,
	default_style bool NOT nUlL,
	PRIMARY KEY (style_id),
	FOREIGN KEY (productid) REFERENCES products(product_id)
);

CREATE TABLE photos (
	style_id int NOT NULL,
	thumbnail_url TEXT NOT NULL,
	url TEXT NOT NULL,
	FOREIGN KEY (style_id) REFERENCES styles(styles_id)
);


CREATE TABLE skus (
	quantity int NOT NULL,
	size TEXT NOT NULL,
	style_id int NOT NULL,
	id int NOT NULL,
	FOREIGN KEY (style_id) REFERENCES styles(styles_id),
	PRIMARY KEY (id)
);

create index skus_style_id on styles(style_id);

create index styles_productid on styles(productid);

create index related_products_id on related_products(id);

create index photos_style_id on photos(style_id);

create index features_id on features(id);

create index id on skus(id);

create index style_id on skus(style_id);
