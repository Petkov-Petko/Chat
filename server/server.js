import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';


const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chat"
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "User not logged in" });
    }
    jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err) {
            return res.json({ Error: "Invalid token" });
        }
        else {
            req.user = decoded.name;
            next();
        }
       
    });

}

app.get('/',verifyUser, (req, res) => {
    return res.json({ Status: "Success", User: req.user });
})

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            return res.json({ Error: "Error in fetching the data" });
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) {
                    return res.json({ Error: "Error in comparing the password" });
                }
                if (response) {
                    const name = result[0].name;
                    const token = jwt.sign({ name }, "jwtSecret", { expiresIn: "1d" });
                    res.cookie("token", token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Invalid Password" });
                }

            });
        } else {
            return res.json({ Error: "User does not exist" });
        }
    });
});

app.post("/register", (req, res) => {
    const checkSql = "SELECT * FROM login WHERE email = ?";
    db.query(checkSql, [req.body.email], (err, result) => {
        if (err) {
            return res.json({ Error: "Error in checking the user" });
        }
        if (result.length > 0) {
            return res.json({ Error: "User already exists" });
        } else {
            const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
            bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
                if (err) {
                    return res.json({ Error: "Error in hashing password" });
                }

                const values = [
                    req.body.name,
                    req.body.email,
                    hash
                ]
                db.query(sql, [values], (err, result) => {
                    if (err) {
                        return res.json({ Error: "Error in inserting the data" });
                    }
                    return res.json({ Status: "Success" });
                });
            });
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Success" }); 
})



app.listen(5055, () => {
    console.log('Server started on port 5055');
})