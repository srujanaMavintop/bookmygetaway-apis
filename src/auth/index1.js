require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const db = require("./db"); // Database connection
const path = require("path");

const app = express();

// Middleware to parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"], index: false }));


// Session and Passport initialization
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ============================
// Google OAuth Authentication
// ============================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);

      const user = {
        google_id: profile.id,
        name: profile.displayName || "Unknown",
        email: profile.emails && profile.emails[0]?.value ? profile.emails[0].value : null,
      };

      if (!user.email) {
        console.error("Google Profile is missing an email.");
        return done(new Error("Google Profile missing email."));
      }

      // Check if the user exists in the database
      db.query("SELECT * FROM users WHERE google_id = ?", [user.google_id], (err, results) => {
        if (err) {
          console.error("Error querying database:", err);
          return done(err);
        }

        if (results.length > 0) {
          // User exists, update last_login and possibly other details
          console.log("User exists. Updating last_login and syncing data.");
          db.query(
            "UPDATE users SET last_login = CURRENT_TIMESTAMP, name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE google_id = ?",
            [user.name, user.email, user.google_id],
            (updateErr) => {
              if (updateErr) {
                console.error("Error updating user:", updateErr);
                return done(updateErr);
              }
              return done(null, results[0]);
            }
          );
        } else {
          // New user, insert into database
          console.log("New user. Inserting into database.");
          db.query(
            "INSERT INTO users (google_id, name, email, last_login, created_at, updated_at, status) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'active')",
            [user.google_id, user.name, user.email],
            (insertErr, results) => {
              if (insertErr) {
                console.error("Error inserting user:", insertErr);
                return done(insertErr);
              }
              user.db_id = results.insertId; // Optional: assign the database ID
              return done(null, user);
            }
          );
        }
      });
    }
  )
);


// passport.serializeUser((user, done) => done(null, user.google_id));
// passport.deserializeUser((id, done) => {
//   db.query("SELECT * FROM users WHERE google_id = ?", [id], (err, results) => {
//     if (err) return done(err);
//     return done(null, results[0]);
//   });
// });

passport.serializeUser((user, done) => {
  console.log("Serializing User:", user);
  done(null, user.google_id || user.db_id || user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserializing User ID:", id);
  db.query("SELECT * FROM users WHERE google_id = ? OR id = ?", [id, id], (err, results) => {
    if (err) {
      console.error("Error deserializing user:", err);
      return done(err);
    }
    if (results.length === 0) {
      console.error("User not found in database.");
      return done(new Error("User not found."));
    }
    console.log("Deserialized User:", results[0]);
    done(null, results[0]);
  });
});

// Routes for Google OAuth
app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://10.250.51.32:3001"); // Redirect to homepage
  }
);


// ============================
// Email and Phone Authentication

// ============================
app.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("phone_no").isMobilePhone().withMessage("Invalid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone_no } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (google_id, name, email, password, phone_no, last_login, created_at, updated_at, status) VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'active')",
        [name, email, hashedPassword, phone_no],
        (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({ message: "Email or phone number already exists." });
            }
            console.error("Error inserting user:", err);
            return res.status(500).json({ message: "Internal server error." });
          }
          res.json({ message: "User signed up successfully!" });
        }
      );
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

// Signup Route
// app.post(
//   "/signup",
//   [
//     body("name").notEmpty().withMessage("Name is required"),
//     body("email").isEmail().withMessage("Invalid email format"),
//     body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
//     body("phone_no").isMobilePhone().withMessage("Invalid phone number"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password, phone_no } = req.body;

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       db.query(
//         "INSERT INTO users (name, email, password, phone_no) VALUES (?, ?, ?, ?)", //error somewhere here
//         [name, email, hashedPassword, phone_no],
//         (err) => {
//           if (err) {
//             if (err.code === "ER_DUP_ENTRY") {
//               return res.status(400).send("Email or phone number already exists.");
//             }
//             console.error("Error inserting user:", err);
//             return res.status(500).send("Internal server error.");
//           }
//           res.send("User signed up successfully!");
//         }
//       );
//     } catch (error) {
//       console.error("Error during signup:", error);
//       res.status(500).send("Internal server error.");
//     }
//   }
// );

// Email Login Route
app.post(
  "/login-email",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).send("Internal server error.");
      }
      if (results.length === 0) {
        return res.status(404).send("User not found.");
      }

      const user = results[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).send("Invalid email or password.");
      }

      // Update last_login timestamp
      db.query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE email = ?", [email], (updateErr) => {
        if (updateErr) console.error("Error updating last login:", updateErr);
      });

      res.send({ message: "Login successful", user });
    });
  }
);

// Phone Login Route
app.post(
  "/login-phone",
  [
    body("phone_no").isMobilePhone().withMessage("Invalid phone number"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone_no, password } = req.body;

    db.query("SELECT * FROM users WHERE phone_no = ?", [phone_no], async (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).send("Internal server error.");
      }
      if (results.length === 0) {
        return res.status(404).send("User not found.");
      }

      const user = results[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).send("Invalid phone number or password.");
      }

      // Update last_login timestamp
      db.query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE phone_no = ?", [phone_no], (updateErr) => {
        if (updateErr) console.error("Error updating last login:", updateErr);
      });
      res.send({ message: "Login successful", user });
    });
  }
);

// Logout Route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Logout failed.");
    req.session.destroy((err) => {
      if (err) console.error("Error destroying session:", err);
      res.redirect("http://10.250.51.32:3001");
    });
  });
});

// ============================
// Server Initialization
// ============================
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});