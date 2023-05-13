const express = require('express')
const app = express()
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require('cors');

const connectionString = "mongodb://localhost:27017/news";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    image: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: String,
    },
});

const News = mongoose.model("News", NewsSchema);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Garudaku Frontend Test." });
});

app.get("/news", async (req, res) => {
    await News.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.post("/save", async (req, res) => {
    let { data } = await axios({
        method: "GET",
        url: `https://berita-indo-api.vercel.app/v1/cnn-news`,
    })

    function createSlug(title) {
        title = title.toLowerCase();
        title = title.replace(/ /g, '-');
        title = title.replace(/[^a-z0-9-]/g, '');
        title = title.replace(/-+/g, '-');
        title = title.trim();
        return title;
    }

    let dataArray = data.data.map(news => ({
        title: news.title,
        slug: createSlug(news.title),
        image: news.image.large,
        content: news.contentSnippet,
        createdAt: news.isoDate,
    }))
    const news = [];
    for (const newsItem of dataArray) {
        const newNews = new News(newsItem);
        news.push(newNews);
    }

    News.insertMany(news)
        .then(() => {
            res.status(200).send("Data saved successfully");
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.get("/news/:slug", (req, res) => {

    const slug = req.params.slug;

    News.findOne({ slug: slug })
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "News Not found" });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.put("/news/:slug", (req, res) => {

    const slug = req.params.slug;

    console.log(slug);
    News.findOne({ slug })
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "News Not found" });
            {
                data.title = req.body.title;
                data.image = req.body.image;
                data.content = req.body.content;

                data.save()
                    .then(news => {
                        res.json(news);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });

});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});