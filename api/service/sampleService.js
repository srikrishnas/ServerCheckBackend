
const { server_list }= require('../../models');


const getAllServerList = () => {
    return server_list.findAll({
      attributes: ['urls','priorities'],
      raw: true
    }).then((result) => {
      return result;
    }).catch((error) => console.log("ERROR::::::",error));
  };


module.exports = { getAllServerList }