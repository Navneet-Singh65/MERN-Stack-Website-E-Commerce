
const express=require("express");
const path=require("path");
const cors=require("cors");
const app=express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer=require('multer');

app.set('views', path.join(__dirname, 'views'));

app.use('/assets',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/public')));


//Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//multer
var imagename='';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        console.log(file);

   imagename=Date.now() + path.extname(file.originalname)+'';
        cb(null, imagename);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });




//route for homepage
app.get('/showproduct',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.json(results);
   
  });
});
//route for homepage
app.get('/shirt',(req, res) => {
  let sql = "SELECT * FROM product where category='Shirt'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.json(results);
   
  });
});
app.get('/tshirt',(req, res) => {
  let sql = "SELECT * FROM product where category='Tshirt'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.json(results);
   
  });
});
app.get('/trouser',(req, res) => {
  let sql = "SELECT * FROM product where category='Trouser'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.json(results);
   
  });
});
app.get('/shoes',(req, res) => {
  let sql = "SELECT * FROM product where category='Shoes'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.json(results);
   
  });
});
app.get('/caps',(req, res) => {
  let sql = "SELECT * FROM product where category='Cap'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.json(results);
   
  });
});
//route for homepage
app.get('/showcart',(req, res) => {
  console.log("jas")
  let sql = "SELECT product.product_id,product_name,product_price,cart.qty,product.product_image FROM product,cart where product.product_id=cart.product_id";
  
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results)
     res.json(results);
   
  });
});


app.get('/productadd',(req, res) => {
     res.render("product_a");
  });


//route for insert data
app.post('/saveproduct',upload.single('file'),(req, res) => {
  console.log("cateogyr"+req.body.category);
  let data = {product_name: req.body.product_name, product_price: req.body.product_price,qty:req.body.product_qty,product_image:imagename,category:req.body.category};
console.log(data);
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    
    let q = conn.query("select * from product", (err, results) => {
      if(err) throw err;
      res.json(results);
    });



  });
});



//route for insert data
app.post('/saveproduct1',(req, res) => {
  let data = {product_name: req.body.name, product_price: req.body.price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});



 

 //route for delete
app.get('/productdelete/:id',function(req,res) {	
	const id=req.params.id;
	console.log(id);
 let sql = "DELETE FROM product WHERE product_id="+id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/showproduct');
  });
});


app.get('/productedit/:id',function(req,res) {	
	const id=req.params.id;
	console.log(id);
 let sql = "select *  FROM product WHERE product_id="+id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.json(results);
  });
});

app.post('/productaddcart',function(req,res) {	
    let data = {customer_name:'ramu',product_id: req.body.id,qty:req.body.qty};
    console.log(data);
    let sql = "INSERT INTO cart SET ?";

    let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.json(results);
      });


});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.name+"', product_price='"+req.body.price+"' WHERE product_id="+req.body.id;
 console.log(sql);
 let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.redirect('/showproduct');
  });
});

//route for update data
app.post('/updatecart',(req, res) => {

if(req.body.qty >0)
 { let sql = "UPDATE cart SET qty="+req.body.qty +" WHERE product_id="+req.body.id;
 console.log(sql);
 let query = conn.query(sql, (err, results) => {
  if(err) throw err;
  res.json({"data":"ok report"});
});
 }
 else
 {
  let sql = "DELETE FROM cart WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;

    res.redirect("/showcart");

  });

 }
 
});

app.post('/login',(req, res) => {
  let sql = "select * from login where username='"+req.body.username+"' and password='"+req.body.password+"'";
 console.log(sql);
 let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     res.json(results);
  });
});

app.post('/register',(req, res) => {
  let data= {username: req.body.username, password:req.body.password,type:"customer",address:req.body.address,phone:req.body.phone,email:req.body.email};

  let sql = "INSERT INTO login SET ?";
 
 let query = conn.query(sql,data, (err, results) => {
    if(err) throw err;
     res.json(results);
  });
});

// async and await associated to promise for synchronous process

app.post('/payment',async (req, res) => {


  //console.log(req.body.products);
let data1 = {customer_name: req.body.cname, amount:req.body.amount};

 let sql = "INSERT INTO bill SET ?";
// await db.query(queryString).catch(err => {throw err}); 
let promise = new Promise((resolve, reject) => {

  conn.query(sql,data1, async (err, resultSet) => { 
    if (err) reject(err); 
    resolve(resultSet);
  });
  
});
let result = await promise;
console.log(result);
console.log("hello");

console.log("done promise");
   let data = {customer_name: req.body.cname, cardno: req.body.cardno,amount:req.body.amount};
console.log(data);
   sql = "INSERT INTO payment SET ?";
   query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    
  
  });

var billno=10;
let s = "select max(billno) 'billno' FROM bill ";
let promise1 = new Promise((resolve, reject) => {


   query =  conn.query(s, async (err, results) => {
    if(err) throw err;
     resolve(results);
      
     //console.log("billno="+billno)
  });
});
let myresult = await promise1;
billno = myresult[0].billno;
let o = JSON.parse(req.body.products);

console.log("biilno="+billno)

console.log(o);
for(x in o)
  {

console.log(o[x]);
  let sql = "INSERT INTO bill_items values("+billno+","+o[x].product_id+","+o[x].qty+","+o[x].product_price+") ";
 console.log(sql);
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    
   });

 }




});



//route for homepage
app.post('/bill',(req, res) => {
  console.log("generating bill")
  let cname = req.body.cname;
  console.log(cname);
  let sql = "select bill.billno,customer_name,amount,product.product_id,product_name,purchase_qty,bill_items.product_price from bill,bill_items,product where bill.billno = bill_items.billno and bill_items.product_id=product.product_id and customer_name='"+cname+"'";
  
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results)
     res.json(results);
   
  });
});






app.listen(4200,()=>{
    console.log(`express server running on 4200`);
});
