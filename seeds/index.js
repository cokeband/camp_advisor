const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/campAdvisor");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "634859edea7ce9917bd26e13",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste commodi ipsa magni accusamus ipsam nostrum, nihil architecto, eius quos vero tenetur voluptatem odio necessitatibus facere sed, quia eveniet voluptate minima?",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668117591/CampAdvisor/e8elpg9dhbkuglcijbz5.jpg',
                    filename: 'CampAdvisor/e8elpg9dhbkuglcijbz5',
                },
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668117592/CampAdvisor/jow7ohdifuiyvb2f4tms.jpg',
                    filename: 'CampAdvisor/jow7ohdifuiyvb2f4tms',
                },
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668117592/CampAdvisor/ivzopr3c5hplsrx6m3nb.jpg',
                    filename: 'CampAdvisor/ivzopr3c5hplsrx6m3nb',
                },
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668117592/CampAdvisor/l5kmylbzfqsvfzrq0xmw.jpg',
                    filename: 'CampAdvisor/l5kmylbzfqsvfzrq0xmw',
                },
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668117592/CampAdvisor/an6ku6y49ldn1i6mfbfo.jpg',
                    filename: 'CampAdvisor/an6ku6y49ldn1i6mfbfo',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})