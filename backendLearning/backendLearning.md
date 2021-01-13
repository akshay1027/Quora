//database to store session

const MongoStore = MongoStore(expressSession);
const mongoURI = process.env.mongoURI;
const store = new mongoose({
collection:"usersessions",
uri:mongoURI,
expires: 7 _ 60 _ 60 _ 24 _ 1000,
})

// expires above indicates date of expiration of the session.
// Here it expires after 7 days

//=====================================================//
