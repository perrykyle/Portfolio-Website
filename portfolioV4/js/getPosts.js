const axios = require("axios");
const getLink = require("./getLinkedinJson.js").getLink;

const pullJsonFromLink = async (link) => {
    try {
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getPosts = async () => {
    const link = await getLink();
    //console.log(link);

    const data = await pullJsonFromLink(link);
    console.log(data);

    return data;
}

getPosts();