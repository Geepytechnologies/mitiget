// const axios = require("axios");
// const cheerio = require("cheerio");

import axios from "axios";
import { load } from "cheerio";

async function crawl(url) {
  try {
    const response = await axios.get(url);
    const $ = load(response.data);

    // extract data from the webpage
    const title = $("title").text();
    const links = $("a")
      .map((i, el) => $(el).attr("href"))
      .get();

    // do something with the data (e.g. save it to a database)
    console.log(title);
    console.log(links);

    // follow links recursively
    for (const link of links) {
      if (link.startsWith("http")) {
        await crawl(link);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// start crawling from a given URL
crawl("https://geepy.vercel.app");
