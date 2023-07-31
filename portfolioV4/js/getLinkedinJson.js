const axios = require('axios');
require('dotenv').config({ path: '../.env' });

async function fetchDataAndStoreContainerId() {
    // Pulls the list of container ID's using these get Options
    const options = {
        method: 'GET',
        url: 'https://api.phantombuster.com/api/v2/containers/fetch-all?agentId=167958098866545',
        headers: {
          accept: 'application/json',
          //located in the .env file for encrytption
          'X-Phantombuster-Key': process.env.PHANTOM_BUSTER_KEY,
        },
      };
    try {
        // Returns the first (most recent) container ID
        const response = await axios.request(options);
        const data = response.data;
        const containerId = getFirstId(data);
        //console.log('Container ID:', containerId);

        // Grabs the output data from the most recent container ID
        try{
            let output = await fetchOutputData(containerId);
            //console.log(output);

            // Using the returned output, finds the link to the JSON file
            let link = getWorkingJsonLink(output);
            return link;

        } catch(error){console.error(error);}
    } catch (error) {console.error(error);}
}

// Function which grabs the output data from the provided container ID
async function fetchOutputData(containerId) {
    const options = {
      method: 'GET',
      url: `https://api.phantombuster.com/api/v2/containers/fetch-output?id=${containerId}`,
      headers: {
        accept: 'application/json',
        'X-Phantombuster-Key': process.env.PHANTOM_BUSTER_KEY,
      }
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
      
    } catch (error) {console.error(error);}
  }

// returns the first ID provided from the list of containers
function getFirstId(data) {
    if (data && data.containers && data.containers.length > 0) {
      return data.containers[0].id;
    } else {
      return null;
    }
}
function getWorkingJsonLink(containerOutput) {
    // If containerOutput is an object, we need to get the output property
    if (typeof containerOutput === "object" && containerOutput !== null) {
        containerOutput = containerOutput.output;
    }

    if (typeof containerOutput === "string") {
        // Find the JSON link in the output text
        const jsonLinkStart = containerOutput.lastIndexOf("JSON saved at") + "JSON saved at".length;
        const jsonLinkEnd = containerOutput.indexOf('\r\n', jsonLinkStart);
        const jsonLink = containerOutput.slice(jsonLinkStart, jsonLinkEnd).trim();

        // Replace the start of the JSON link with the working start
        const linkStart = "https://phantombuster.s3.amazonaws.com";
        const workingLinkStart = "https://cache1.phantombooster.com";
        const workingJsonLink = jsonLink.replace(linkStart, workingLinkStart);

        return workingJsonLink;
    } else {
        console.log("Container output is not a string.");
        return null;
    }
}

// exported function which gets link to JSON file
const getLink = async () => {
    let link = await fetchDataAndStoreContainerId();
    //console.log(`Link: ${link}`);
    return link;
}

exports.getLink = getLink;