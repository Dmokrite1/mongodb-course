import mongoose from "mongoose";

async function init() {
  	// mongo connection string
    try {
	    const conn = await mongoose.connect('mongodb://root:test123@localhost:27017/blog?authSource=admin');
        console.log("Connected to", conn.connection.db.databaseName);
    }catch(e) {
        console.error("Failed to connect to server");
    }

}

init();