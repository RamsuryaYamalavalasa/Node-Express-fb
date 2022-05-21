const express = require("express");
const cors = require("cors");
const users = require("./admin");
const app = express();
app.use(express.json());
app.use(cors()); //cross origin resource sharing

app.post("/createUser", (req, res) => {
  const data = req.body;
  users.doc(data.id.toString()).set(data);
  res.status(201).json({ msg: "user created" });
});
/***
 * {
 *      "id":1,
 *      "name":"name"
 * }
 */
app.get("/", async (req, res) => {
  const snapshot = await users.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //[a,b,c] 
  res.status(201).send(list);
});

/***
 * {
 *      id:"docid"
 *      name:"name",
 *      phone: "number"
 *  * }
 */

app.put("/update/:id", async (req, res) => {
  const {id} = req.params;
  const data = req.body;
  users.doc(id.toString()).set(data);
  res.status(201).json({ msg: "user updated" });
});

/***
 * function(arguments){
 * }
 * website.com/id
 */

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  users.doc(id.toString()).delete();
  res.status(201).json({ msg: "user deleted" });
});

app.listen(3000, () => {
  console.log("server running ");
});
