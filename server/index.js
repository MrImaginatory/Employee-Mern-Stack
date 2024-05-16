const express = require('express');
const mongoose = require ('mongoose')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// importing Models
const userSchema=require('./models/userSchema');
const employeeSchema=require('./models/employeeData');
const verifyToken = require('./middleware/verifyToken')


try {
    app.listen(8000, () => console.log('server running on port 8000'));

    mongoose.connect('mongodb+srv://john:john_123@crmcluster.6uykn0a.mongodb.net/employeeDB')
        .then(() => console.log('connected to db'))
        .catch((err) => console.log(err))

} catch (error) {
    console.log(error)    
}

// register endpoint
app.post('/register',(req, res) => {
    let user= req.body;
    
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (!err) {
                    user.password = hash
                    try {
                        let doc = await userSchema.create(user)
                        res.status(201).send({message:"User Registered"})
                    
                    } catch (error) {
                        console.log(error)
                        res.status(500).send({message:"Some Problem Occured"})
                    }
                }
            })
        }
    })
    
})


// login endpoint
app.post('/login', async (req, res) => {
    let userCred = req.body;
    try {
        const user = await userSchema.findOne({ email: userCred.email });
        if (user != null) {
            bcrypt.compare(userCred.password, user.password, (err, result) => {
                if (result == true) {
                    // Signing JWT token
                    jwt.sign({ email: user.email }, 'secretkey', (err, token) => {
                        if (!err) {
                            console.log(token);
                            // Sending response with token
                            res.send({ message: "Login Successful", token: token });
                        }
                    });
                } else {
                    res.status(403).send({ message: "Incorrect Password" });
                }
            });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Problem Occurred" });
    }
});

// end point for fetching employee
app.get('/employeeData', async (req, res) => {
    try {
        let data = await employeeSchema.find();
    res.send(data);
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Some Problem Occured"})
    }
})

// endpoint ofr sercing singlr employee
app.get('/employeeData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let data = await employeeSchema.findOne({ _id: id }); // Assuming _id is the field representing the employee ID
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Problem Occurred" });
    }
});


// endpoint for adding employee
app.post('/employeeData', async (req, res) => {
    try {
        const emp = await employeeSchema.create(req.body);
        res.status(201).send({message:"Employee Added"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Some Problem Occured"})
    }
})

// endpoint for updating employee
app.put('/employeeData/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const emp = await employeeSchema.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        });
        if(!emp){
            res.status(404).send({message:"Employee Not Found"})
        }
        const updatedEmp = emp.toObject();
        if(emp.errors){
            res.status(400).send({message:"Invalid Input", errors: emp.errors})
        }
        res.status(201).send({message:"Employee Updated", updatedEmp})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Some Problem Occured"})
    }
})



// endpoint for deleting employee
app.delete('/employeeData/:id', async (req, res) => {
    try {
        const emp = await employeeSchema.findByIdAndDelete(req.params.id);
        res.status(201).send({message:"Employee Deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Some Problem Occured"})
    }
})