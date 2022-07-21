const express = require('express');
const mongoose = require('mongoose');
const Accessory = require('./models/accessories');
const Computer = require('./models/computers');
const Phone = require('./models/phones');
const TechUtil = require('./models/tech-utilities');
const Item = require('./models/items');

//Authentication
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');


const {ensureAuthenticated} = require('./config/auth');

//Passport config
require('./config/passport')(passport);

//User model
const User = require('./models/User');

//PORT
const PORT = process.env.PORT || 8000;

//Express App
const app = express();


//Connect to MongoDB
const dbURI = "mongodb+srv://steveshema:stevesh@cluster0.gntbv.gcp.mongodb.net/luxicaOnlineStore?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result) => { console.log('Connection to Luxica DB established successfully... ') })
 .catch((err) => { console.log('Unable to establish connection to Luxica DB... ') });


//Register the view engine
app.set('view engine', 'ejs');


//Body parser middleware
app.use(express.urlencoded({ extended: false }));


//Express session
app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true 
}));


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global vars
app.use((req,res, next) => {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      next();
});

//Listening to requests
app.listen(PORT, (req, res) => {
      console.log(`Server running at port ${PORT}......`);
});

//MIDDLEWARE
app.use(express.static('public'));

//HOME PAGE
app.get('/', (req, res) => {
      Item.find().sort({ createdAt: -1 })
             .then((result) => {
                   res.render('index', { items: result });
             })
             .catch(err => console.log(err));
     
});

//ABOUT PAGE
app.get('/about', (req, res) => {
      res.render('about');
});

//SERVICES PAGE
app.get('/services', (req, res) => {
      res.render('services');
});

//GALLERY PAGE
app.get('/gallery', (req, res)=>{
	res.render('portfolio');
});
app.get('/galleryItem', (req, res)=>{
	res.render('portfolio-details');
});

//TEAM PAGE
app.get('/team', (req, res)=>{
	res.render('team');
});

//NEWS PAGE
app.get('/news', (req, res)=>{
	res.render('blog');
});
app.get('/newsone', (req, res)=>{
	res.render('blog-single');
});



//MERCHANDISE PAGES

     //PERSONAL ACCESSORIES
       app.get('/accessories', (req, res)=>{
       	Accessory.find().sort({ createdAt: -1 })
             .then((result) => {
                  res.render('accessories', {PAs : result})
             })
             .catch(err => console.log(err));
       });

       //COMPUTERS
       app.get('/computers', (req, res)=>{
       	Computer.find().sort({ createdAt: -1 })
             .then((result) => {
                  res.render('computers', { comps : result })
             })
             .catch(err => console.log(err));
       });

       //SMART PHONES
       app.get('/phones', (req, res)=>{
       	Phone.find().sort({ createdAt: -1 })
             .then((result) => {
                  res.render('phones', { phones : result });
             })
             .catch(err => console.log(err));
       });

       //TECH UTILITIES
       app.get('/techutils', (req, res)=>{
       	TechUtil.find().sort({ createdAt: -1 })
             .then((result) => {
                  res.render('tech-utilities', { utils : result });
             })
             .catch(err => console.log(err));
       });

       //MAINTENANCE
       app.get('/maintenance', (req,res)=>{
       	const repairs = [];
       	res.render('maintenance', { repairs });
       });


//CONTACT PAGE
app.get('/contact', (req, res)=>{
	res.render('contact');
});

//DASHBOARD
   app.get('/dashboard',ensureAuthenticated, (req, res)=>{
      res.redirect('/uploadAccessories');
   });

      app.get('/uploadAccessories', ensureAuthenticated, (req, res) =>{
            res.render('uploadAccessories', {username: req.user.username});
       });

      app.get('/uploadComps',ensureAuthenticated, (req, res) =>{
            res.render('uploadComps', {username: req.user.username});
       });

      app.get('/uploadPhones', ensureAuthenticated, (req, res) =>{
            res.render('uploadPhones', {username: req.user.username});
      });

      app.get('/uploadTechutils', ensureAuthenticated, (req, res)=>{
            res.render('uploadTechutils', {username: req.user.username});
      });
      app.get('/uploadItems', ensureAuthenticated, (req, res) =>{
            res.render('uploadItems', {username: req.user.username});
      });
      app.post('/uploadItems', (req, res) =>{
            const item = new Item(req.body);
            item.save()
            .then((result)=>{
                  res.redirect('/');
            }).catch((err) => {console.log(err);});
      });

      app.post('/uploadAccessories', (req, res) =>{
            const acc = new Accessory(req.body);
            acc.save()
            .then((result)=>{
                  res.redirect('/accessories');
            }).catch((err) => {console.log(err);});
      });

       app.post('/uploadComps', (req, res) =>{
            const comp = new Computer(req.body);
            comp.save()
            .then((result)=>{
                  res.redirect('/computers');
            }).catch((err) => {console.log(err);});
      });

       app.post('/uploadPhones', (req, res) =>{
            const fone = new Phone(req.body);
            fone.save()
            .then((result)=>{
                  res.redirect('/phones');
            }).catch((err) => {console.log(err);});
      });

       app.post('/uploadTechutils', (req, res) =>{
            const techutil = new TechUtil(req.body);
            techutil.save()
            .then((result)=>{
                  res.redirect('/techutils');
            }).catch((err) => {console.log(err);});
      });



//LOGIN HANDLERS
app.get('/login', (req, res)=>{

   res.render('login');

});

app.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);

});


//LOGOUT HANDLER
app.get('/logout', (req, res) => {
      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/login');
});


//Register handlers
app.get('/register', (req, res)=>{

   res.render('register');

});

app.post('/register', (req,res)=>{

     const {username, password, password2} = req.body;
     let errors = [];

    //Check the required fields
     if(!username || !password || !password2){
        errors.push({ msg: 'Please enter all fields'});
     }


     //Check passwords match
     if (password !== password2) {
      errors.push({ msg: 'Passwords do not match'});
     }

     //Check password length
     if(password.length < 6 ) {
      errors.push({ msg : 'Password should be atleast 6 characters'});
     }

     if(errors.length > 0 ){
       
         res.render('register', {
            errors,
            username,
            password,
            password2
         });

     } else {
        //validation passed
        User.findOne({username: username})
             .then((user)=>{
                  if(user){

                        errors.push({ msg: 'User is already registered'})
                          res.render('register', {
                           errors,
                           username,
                           password,
                           password2
                       });
                  } else {

                    const newUser = new User({
                        username,
                        password
                    });

                   //Hash password
                   bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                      
                        if(err) throw err;
                        //Set password to hashed
                        newUser.password = hash;
                        //Save the new user
                        newUser.save()
                            .then(user => {
                              req.flash('success_msg', 'You are now registered and you can login');
                              res.redirect('/login');
                            })
                            .catch(err => console.log(err))
                        
                   }));

                  }
             });

     }

});
