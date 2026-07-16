require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Contact Management Server in Running");
});

// let contacts = [
//     {name: "Mahfuz", email: "mahfuz@gmail.com", address: "Dhaka", Phone: "01626607121"},
//     {name: "Ripon", email: "ripon@gmail.com", address: "Barisal", Phone: "01726607122"},
//     {name: "Rumon", email: "rupon@gmail.com", address: "Gazipur", Phone: "01826607123"}
// ]

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    image: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
    },
    address: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true },
);

// model
const Contact = mongoose.model("Contact", contactSchema);

// All GET
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// single GET
app.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.send(contact);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST
app.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const saved = await newContact.save();

    res.status(201).send(saved);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Update
app.put("/contacts/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.send(updated);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Delete
app.delete("/contacts/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.send({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// app.listen(port, () => {
//   console.log(`Contact Management Server On Port ${port}`);
// });
