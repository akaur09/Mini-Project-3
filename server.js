const express= require ('express');
const database =require('mysql2');

database.createConnection(
    {
        host: "localhost",
        user:"root",
        password:"Ak_9586!",
        database:"movie_db"
    },
    console.log("coneccted to movie db")
);