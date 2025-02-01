const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeJKT48Calendar(query) {
  try {
    const url = "https://jkt48.com/calendar/list?lang=id";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let events = [];

    $(".calendarItem").each((index, element) => {
      const date = $(element).find(".date").text().trim();
      const title = $(element).find(".eventTitle").text().trim();
      const time = $(element).find(".time").text().trim();
      const description = $(element).find(".eventDetail").text().trim();

      events.push({ date, title, time, description });
    });

    // Jika ada parameter query, filter hasilnya
    if (query) {
      events = events.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return events.length > 0 ? events : null;
  } catch (error) {
    console.error("Error scraping JKT48 Calendar:", error.message);
    throw new Error("Gagal mengambil data kalender JKT48");
  }
}

module.exports = scrapeJKT48Calendar;
