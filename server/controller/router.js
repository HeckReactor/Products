const express = require('express');

const router = express.Router();
const model = require('../model/model.js');

router.get('/products', (req, res) => {

  model.getProducts(req.query, (err, data) => {
    if (err) {
      res.status(500).send(['error while routing get'], err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id', (req, res) => {
  model.getProductId(req.params, (err, data) => {
    if (err) {
      res.status(500).send(['couldnt get product id to route'], err);
    } else {
      // const product = data;
      // model.getFeatures(req.params, (err, data2) => {
      //   if (err) {
      //     console.log('something went wrong with getting features', err);
      //   } else {
      //     product[0].features = data2;
      res.status(200).send(data);
    }
      // });
  })
});
// });

router.get('/products/:product_id/styles', (req, res) => {
  model.getStyles(req.params, (err, data) => {
    if (err) {
      res.status(500).send(['couldnt get product id to route'], err);
    } else {
      // write model functions for getting photos and skus for every style. 
      res.status(200).send(data)
    }
  });
})

router.get('/products/:product_id/related', (req, res) => {
  model.getRelated(req.params, (err, data) => {
    if(err) {
      res.status(500).send(['couldnt get related product'], err);
    } else {
      res.status(200).send(data);
    }
  })
})
// app.get('/display', (req, res) => {
//   Calls.getDisplay(req.query.productId)
//     .then((results) => {
//       res.status(200).send(results.data);
//     })
//     .catch((err) => {
//       // console.log('Error: ', err);
//       res.status(500).send(err);
//     });
// });

module.exports = router;
