const getAllDataService = require("../service/sampleService.js");
const restCall = require("../../utils/restCalls");

// Sort And Set Priority
const setPriority = (serverList) => {
  const sortedList = serverList.sort((a, b) => a.priorities - b.priorities);
  return sortedList;
};

// Function to get list of servers
const getServerPriorityList = async (dbData) => {

  //get server list from DB
  // const dbData = await getAllDataService.getAllServerList();
  
  //Sort Priority
  const priorityList = await setPriority(dbData)

  const promises = await new Promise((resolve, reject) => {
    priorityList.map((data) => {

      const payload = {
        method: "GET",
        url: data.urls,
        headers: {
          "content-type": "application/json",
        },
        json: true,
        resolveWithFullResponse: true,
        time: 5000,
      };

      restCall
        .restAPICall(payload)
        .then((value) => {
          let response = { url: data.urls, status: value.statusCode };
          resolve(response);
        })
        .catch((err) => {
          console.log("err", data.urls);
        });
    });
  });

  const response = await promises;
  return response;
};

module.exports = { getServerPriorityList };
