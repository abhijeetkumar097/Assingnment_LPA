const feedModel = require('./model/userFeedback')

const seed = async() => {
    const count = await feedModel.countDocuments();
    if(count == 0) {
        await feedModel.insertMany([
            {
                username : "Abhi",
                email : "abhi@gmail.com",
                category: "positive",
                feedback : "Post is working perfectly"
            },
            {
                username : "Abhijeet",
                email : "abhi@gmai.com",
                category: "positive",
                feedback : "seeding is working perfectly"
            }
        ]);
        console.log("Data seeded successfully");
    }
};

module.exports = seed;