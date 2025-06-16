app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get("https://kun.uz/news/category/texnologiya");
    const $ = cheerio.load(response.data);

    const articles = [];

    $("div.list-news div.list-news__item").each((i, el) => {
      const title = $(el).find(".news__title").text().trim();
      const link = "https://kun.uz" + $(el).find("a").attr("href");
      const image = $(el).find("img").attr("src");
      const date = $(el).find(".date").text().trim();

      if (title && link) {
        articles.push({
          id: i.toString(),
          title,
          excerpt: "",
          author: "Kun.uz",
          date,
          readTime: `${Math.floor(Math.random() * 5 + 5)} min o'qilgan`,
          trending: Math.random() > 0.7,
          image: image?.startsWith("http") ? image : `https://kun.uz${image}`,
          link,
        });
      }
    });

    res.json({ articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kun.uz sahifasidan yangiliklar olinmadi" });
  }
});
