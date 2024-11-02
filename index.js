import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1234",
  port: 5432,
});
db.connect();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
async function emptytables(){
  await db.query("TRUNCATE TABLE users");
  await db.query("TRUNCATE TABLE visited_countries");
}
emptytables();



let currentuser=1;
app.get("/", async (req, res) => {
  //empty tables from a db, will result in empty array
  const records= await db.query("SELECT * FROM users");
  let userslist=[];
  records.rows.forEach(code=>userslist.push(code.id));
  const hasusers=userslist.length>0;
  res.render("index.ejs", {
    countries: null,
    total: 0,
    users: records.rows,
    color: records.color,
    hasusers:false,
    newuser: true,
    home:false
  });
});
app.post("/users/:id/add", async (req, res) => {
  const input = req.body["country"];
  const user_id= parseInt(req.params.id);
  const totalusers= await db.query("SELECT * FROM users");
  const availusers=totalusers.rows.map(user=>user.id);

  const selecteduser= availusers.find(user=>user===parseInt(user_id));

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    
    const countryCode = result.rows[0].country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (user_id,country_code) VALUES ($1, $2)",
        [user_id, countryCode]
      );
      res.redirect(`/users/${user_id}`);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/:id", async (req,res) =>{
    const userid=parseInt(req.params.id);
    const totalusers= await db.query("SELECT * FROM users");
    //availusers=[1,2,3,4]
    const availusers=totalusers.rows.map(user=>user.id);
  
    const selecteduser= availusers.find(user=>user===parseInt(userid));
    let countries=[];
    const result=await db.query("SELECT country_code FROM visited_countries WHERE user_id=$1",[selecteduser]);
    result.rows.forEach(code=>countries.push(code.country_code));
    countries = countries.map(code => code.trim());
    console.log(countries);
  
    const records = await db.query("SELECT * FROM users WHERE id=$1", [selecteduser]);
    const recordcolor = await db.query("SELECT color FROM users WHERE id=$1", [userid]);

// Check if recordcolor.rows exists and has at least one element
    let recordcolor1;
    if (recordcolor.rows && recordcolor.rows.length > 0) {
      recordcolor1 = recordcolor.rows[0].color;
      console.log("Record Color:", recordcolor1); // This should output the color, e.g., 'red'
    } else {
      console.error("No color found for this user or query returned an empty result.");
    }
    console.log(recordcolor1);

  
    const hasusers=availusers.length>0;
    try{
        res.render("index.ejs", {
          countries: countries,
          total:countries.length,
          users: records.rows,
          color: recordcolor1,
          hasusers: hasusers,
          newuser:false,
          home: true,
          selectedid:userid
        });
    }
    catch (err) {
      console.log(err);
    }
});


app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
 
  res.render("new.ejs");
});

app.post("/newhello", async (req,res) =>{
   const username=req.body.name;
   const pickedcolor=req.body.color;
   try{
    await db.query("INSERT INTO users (name,color) VALUES ($1,$2)",[username,pickedcolor]);
    res.redirect("/");
   }
   catch (err) {
    console.log(err);
  }
   
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
