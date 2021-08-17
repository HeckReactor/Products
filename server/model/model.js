const client = require('../db/database.js');

const getProducts = (params, callback) => {
  if (params.count) {
    var count = params.count;
  } else {
    var count = 5;
  }
  if (params.page) {
    var page = count * params.page - count;
  } else {
    var page = 0;
  }


  client.query(`SELECT * FROM products ORDER BY product_id offset ${page} limit ${count}`, (err, data) => {
    if (err) {
      console.log('error in model getProducts', err);
    } else {
      callback(null, data.rows);
    }
  });
};

const getStyles = (params, callback) => {
    client.query(`SELECT (jsonb_build_object (
        'id', $1::integer,
        'results', (
            select (jsonb_agg(jsonb_build_object (
                'style_id', s.style_id,
                'name', s.name,
                'original_price', s.original_price,
                'sale_price', s.sale_price,
                'default?', s.default_style,
                'photos', ( 
					select (jsonb_agg(jsonb_build_object (
                    	'thumbnail_url', h.thumbnail_url,
						'url', h.url
                	))) 
					FROM photos h
                    where h.style_id = s.style_id
				), 
                'skus', (
					select (jsonb_object_agg (
                    	k.id, (
							select (jsonb_build_object (
                        		'quantity', k.quantity,
                        		'size', k.size
                    		))
						)))
					from skus k
					where k.style_id = s.style_id
				)
			)))
			FROM styles s 
			WHERE s.productid = $1::integer
		)
	)
)`, [params.product_id], (err, data) => {
         if(err) {
             console.log('error querying getStyles', err)
         } else {
             callback(null, data.rows[0].jsonb_build_object)
         }
     })
}

const getProductId = (params, callback) => {
  client.query(`select jsonb_build_object (
	'id', p.product_id, 
	'name', p.name,
	'slogan', p.slogan,
	'description', p.description,
	'category', p.category, 
	'default_price', p.default_price,
	'features',  (
		select (jsonb_agg(jsonb_build_object (
			'feature', f.feature,
			'value', f.value
		)))
		from features f
		where f.id= p.product_id	
	)
)
from products p
where product_id = $1`, [params.product_id], (err, data) => {
    if (err) {
      console.log('error in model getProductId', err);
    } else {
      callback(null, data.rows[0].jsonb_build_object);
    }
  });
};

const getRelated = (params, callback) => {
  client.query(`
    select (jsonb_agg(
      r.related_product_id
    ))
    FROM related_products r 
    where id=$1
    `, [params.product_id], (err, data) => {
    if (err) {
      console.log('error in model getProductId', err);
    } else {
      callback(null, data.rows[0].jsonb_agg);
    }
  });
};

// const getFeatures = (params, callback) => {
//   client.query(`SELECT feature, value FROM features WHERE id = ${params.product_id}`, (err, data) => {
//     if (err) {
//       console.log('error in model getFeatures', err);
//     } else {
//       callback(null, data.rows);
//     }
//   });
// };

module.exports.getProducts = getProducts;
module.exports.getProductId = getProductId;
module.exports.getStyles = getStyles;
module.exports.getRelated = getRelated;
