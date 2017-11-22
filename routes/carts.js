var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    
    var cart = req.session.cart;
    var displayCart = {items: [], total:0};
    var total = 0;

    for(var item in cart){
        displayCart.items.push(cart[item]);
        total += (cart[item].qty * cart[item].price);
    }

    displayCart.total = total;
    console.log(displayCart);

    res.render('cart', { title: 'Cart', carts: displayCart });
});

router.post('/add/:id', (req, res) => {
    req.session.cart=req.session.cart||{};
    var cart = req.session.cart;

    Book.findOne({_id:req.params.id},function(err,book){
        if(err) console.log(err);
        if(cart[req.params.id]){
            cart[req.params.id].qty++
        }else{
            cart[req.params.id] = {
                item: book._id,
                title: book.title,
                price: book.price,
                qty: 1
            }
        }
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
    });
});

module.exports = router;