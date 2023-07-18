const express = require("express");
const cors = require("cors");
const SSLCommerzPayment = require("sslcommerz-lts");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const multer = require("multer");
const app = express();
const path = require("path");

const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    // Generate a unique name for the file
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Get the file extension
    const ext = path.extname(file.originalname);

    // Create the final filename with the extension
    const filename = uniqueName + ext;
    const relativePath = "uploads/" + filename;

    console.log("relativ", relativePath);

    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });

const uri =
  "mongodb+srv://asadm2258:eciPwezapztAaDFv@cluster0.lc9x2t1.mongodb.net/?retryWrites=true&w=majority";
// asadm2258
// eciPwezapztAaDFv

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const paymentUrl = "http://localhost:5000";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
console.log("ster", store_id, store_passwd );
const is_live = false

async function run() {
  try {
    // await client.connect();
    const db = client.db("drive-storage");
    const filesCollection = db.collection("files");
    const memberCollection = db.collection("member");
    const orderCollection = db.collection("order");



    app.get("/order/:email", async (req, res) => {
      const email=req.params.email;
      const query = { buyer: email }

      const blogs = await orderCollection.find(query).toArray();
      res.send(blogs);
      // console.log(blogs);
    });
    // payment


    app.post("/order", async (req, res) => {
      console.log("ster", store_id, store_passwd );
      const body = req.body;
      delete body._id;
      const unId = new ObjectId().toString();
      // console.log("body", body);
      // console.log("un id", unId);
      const data = {
        total_amount: Number(body.price),
        currency: "BDT",
        tran_id: unId, // use unique tran_id for each api call
        success_url: `${paymentUrl}/payment/success/${unId}`,
        fail_url: `${paymentUrl}/payment/fail/${unId}`,
        cancel_url: `${paymentUrl}/payment/cancel/${unId}`,
        // fail_url: 'http://localhost:3030/fail',
        // cancel_url: 'http://localhost:3030/cancel',
        ipn_url: `${paymentUrl}/ipn`,
        // ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      const newBlog = await orderCollection.insertOne({
        ...body,
        status: "Accepted",
      });

      // const bp = body.items;
      // console.log("bough", bp);
      // const query2 = { _id: new ObjectId(bp[0]._id) };
      // const existP = await productCollection.findOne(query2);
      // console.log("exis", existP) ;

      // bp.forEach(async (p) => {
      //   const query3 = { _id: new ObjectId(p._id) };
      //   const existP = await productCollection.findOne(query3);
      //   console.log("got p", existP);
      //   const newBody = {
      //     quantity: Number(existP.quantity) - Number(p.buyingQuantity),
      //     sold: Number(existP.sold) + Number(p.buyingQuantity),
      //   };
      //   const updatedData = {
      //     $set: newBody,
      //   };
      //   const updateP = productCollection.updateOne(query3, updatedData);
      //   console.log("up", updatedData);
      //   console.log("uping", updateP);
      // });

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        console.log("Redirecting to: ", GatewayPageURL);
        res.send({ url: GatewayPageURL });

      });
    });


    app.post("/payment/success/:unId", async (req, res) => {
      const id = req.params.unId;
      console.log("id", id);

      // res.send(newBlog);
      res.redirect(`http://localhost:5173`); 
    });

    // app.post("/payment/fail/:unId", async (req, res) => {
    //   const id = req.params.unId;
    //   console.log("id", id);

    //   // res.send(newBlog);
    //   res.redirect(`http://localhost:3000/fail/${id}`);
    // });

    // app.post("/payment/cancel/:unId", async (req, res) => {
    //   const id = req.params.unId;
    //   console.log("id", id);

    //   // res.send(newBlog);
    //   res.redirect(`http://localhost:3000/cancel/${id}`);
    // });



    // member

    app.get("/member", async (req, res) => {
      const blogs = await memberCollection.find({}).toArray();
      res.send(blogs);
      // console.log(blogs);
    });
    app.get("/member/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email:email };
      const newBlog = await memberCollection.findOne(query);
      res.send(newBlog);
    });



    app.post("/member", async (req, res) => {
      const body = req.body;
      // console.log("b", body);
      const newBlog = await memberCollection.insertOne(body);
      res.send(newBlog);
    });

    app.delete("/member/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await memberCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/member/:id", async (req, res) => {
      const body = req.body;
      // console.log("body", body);
      const id = req.params.id;
      console.log("id", id);
      const query = { _id: new ObjectId(id) };
      const updatedData = {
        $set: body,
      };
      const newBlog = await memberCollection.updateOne(query, updatedData);
      res.send(newBlog);
      // console.log(newBlog);
    });

    // end member



    // app.get('/uploads/:filename', (req, res) => {
    //   const filePath = `/uploads/${req.params.filename}`;

    //   res.setHeader('Content-Disposition', `attachment; filename=${req.params.filename}`);
    //   res.sendFile(filePath);
    // });

    app.get('/uploads/:filename', (req, res) => {
      const filename = req.params.filename;
      const filePath = path.join(__dirname, 'uploads/', filename);

      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.sendFile(filePath);
    });

    app.get("/files", async (req, res) => {
      const blogs = await filesCollection.find({}).toArray();
      res.send(blogs);
      // console.log(blogs);
    });
    app.get("/files/:email", async (req, res) => {
      const email=req.params.email;
      const query = { uploader_email: email }

      const blogs = await filesCollection.find(query).toArray();
      res.send(blogs);
      // console.log(blogs);
    });
    app.get("/files/single/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await filesCollection.findOne(query);
      res.send(result);
      // console.log(blogs);
    });

    app.put("/files/rating/:id", async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      console.log("b", body);
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const getMem = await filesCollection.findOne(query);
      console.log("getmem", getMem);

      if (!Array.isArray(getMem.reviews)) {
        getMem.reviews = []; // Initialize reviews as an empty array if it's not already an array
      }

      const updatedData = {
        $set: {
          reviews: [...getMem?.reviews, body],
        },
      };

      const newBlog = await filesCollection.updateOne(
        query,
        updatedData,
        options
      );
      res.send(newBlog);
    });

    app.patch("/files/:id", async (req, res) => {
      const body = req.body;
      // console.log("body", body);
      const id = req.params.id;
      console.log("id", id);
      const query = { _id: new ObjectId(id) };
      const updatedData = {
        $set: body,
      };
      const newBlog = await filesCollection.updateOne(query, updatedData);
      res.send(newBlog);
      // console.log(newBlog);
    });

    app.put("/files/:id", async (req, res) => {
      const body = req.body;
      // console.log("body", body);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      // const getMem = await memberCollection.findOne(query);
      // console.log("getmem", getMem);

      // if (!Array.isArray(getMem.reviews)) {
      //   getMem.reviews = []; // Initialize reviews as an empty array if it's not already an array
      // }
      const updatedData = {
        $set: body,
      };


      const result = await filesCollection.updateOne(
        query,
        updatedData,
        options
      );
      res.send(result);
      // console.log(newBlog);
    });

    app.delete("/files/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await filesCollection.deleteOne(query);
      res.send(result);
    });


    // upload.array("files", 5)

    app.post(
      "/files",
      upload.fields([
        { name: "thumb", maxCount: 1 },
        { name: "files", maxCount: 5 },
      ]),
      async (req, res) => {
        // const files = req.files;
        const {
          l_subject,
          desc,
          uploader_name,
          uploader_email,
          price,
          sub_sub_category,
          sub_category,
          category,
          doc_name,
          status
        } = req.body;

        // if (!files) {
        //   return res.status(400).json({ message: "Missing required files" });
        // }

        const thumb = req.files["thumb"] ? req.files["thumb"][0] : null;
        const multipleFiles = req.files["files"] || [];

        // Process the singleFile and multipleFiles as needed
        const singleFilePath = thumb ? "uploads/" + thumb.filename : null;
        const multipleFilePaths = multipleFiles.map(
          (file) => "uploads/" + file.filename
        );

        const newProduct = {
          l_subject,
          desc,
          uploader_name,
          uploader_email,
          price,
          sub_sub_category,
          sub_category,
          category,
          doc_name,
          status,
          files: multipleFilePaths,
          thumb: singleFilePath,
        };

        const newBlog = await filesCollection.insertOne(newProduct);
        res.send(newBlog);
      }
    );

    await client.db("admin").command({ ping: 1 });
    console.log("successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("drive server is Running");
});

app.listen(port, () => {
  console.log(`drive server running on port: ${port}`);
});
