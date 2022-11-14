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
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668464983/CampAdvisor/sym0e9c9umukxht2psyf.jpg',
                    filename: 'CampAdvisor/sym0e9c9umukxht2psyf',
                },
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668464983/CampAdvisor/kpdqdpc9xhgjnwbucads.jpg',
                    filename: 'CampAdvisor/kpdqdpc9xhgjnwbucads',
                },
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668464983/CampAdvisor/ipfin0bruldl6azhodfy.jpg',
                    filename: 'CampAdvisor/ipfin0bruldl6azhodfy',
                },
                {
                    url: 'https://res.cloudinary.com/du3mjcykb/image/upload/v1668464984/CampAdvisor/yyduaoign5j6hefgcd9q.jpg',
                    filename: 'CampAdvisor/yyduaoign5j6hefgcd9q',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})