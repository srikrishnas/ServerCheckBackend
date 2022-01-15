const serverCheckBuisness = require("../buisnessLogic/serverCheckBuisness.js");

// Check servers from DB -> GET
const serverCheckController = (req, res) => {
  const arrOfServers = [
   {
      "urls":"https://phoenixnap.com/kb/mysql-docker-container",
      "priorities":1
   },
   {
      "urls":"string",
      "priorities":0
   }
];
//   console.log(req.body);
  serverCheckBuisness
    .getServerPriorityList(arrOfServers)
    .then((result) => {
      console.log("Controller server list::::", JSON.stringify(result));
      res.json({ priority_url: result });
    })
    .catch((err) => {
      console.log("Controller ERROR::::::::", err);
      res.json({ status: 400, data: err });
    });
};

module.exports = {serverCheckController };
