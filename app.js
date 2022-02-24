const express = require("express");
const request = require("request");
const https = require("https");
// const client = require("@mailchimp/mailchimp_marketing");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

//Static Folder
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.use(express.urlencoded({ extended: true }));





//Setting up MailChimp
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "66b5e5086063c7809423cd24fbc2c79c-us14",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us14"
    });
    //As soon as the sign in button is pressed execute this
    app.post("/", function (req,res) {
    //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    //*****************************ENTER YOU LIST ID HERE******************************
    const listId = "04462464fe";
    //Creating an object with the users data
    const subscribingUser = {
     firstName: firstName,
     lastName: lastName,
     email: email
    };
    //Uploading the data to the server
     async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FIRSTNAME: subscribingUser.firstName,
     LASTNAME: subscribingUser.lastName
    }
    });
    //If all goes well logging the contact's id
     res.sendFile(__dirname + "/success.html")
     console.log(
    `Successfully added contact as an audience member. The contact's id is ${
     response.id
     }.`
    );
    }
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
     run().catch(e => {
        res.sendFile(__dirname + "/failure.html");
        app.post("/failure", (req,res) => {
            res.redirect("/");
        })
     });
    
    });

   
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Server is running on PORT "+PORT);
    })


// app.post("/", (req, res) => {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     console.log(`
//     ${firstName}
//     ${lastName}
//     ${email}`);



//     // client.setConfig({
//     //     apiKey: "66b5e5086063c7809423cd24fbc2c79c-us14",
//     //     server: "us14",
//     // });
    
//     // const run = async () => {
//     //     const list_id = "04462464fe";
//     //     const response = await client.lists.batchListMembers("list_id", {
//     //         members: [{
//     //             email_address: email,
//     //             status: "subscribed",
//     //             merge_fields: {
//     //                 FIRSTNAME: firstName,
//     //                 LASTNAME: lastName
//     //             }
//     //         }],
//     //     });
//     //     console.log(response);
//     // };
    
//     // run();


//     const data = {
//         member =[
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FIRSTNAME: firstName,
//                     LASTNAME: lastName
//                 }
//             }]
//     };
//     const jsonData = JSON.stringify(data);
//     console.log(jsonData);

//     const url = "https://us14.api.mailchimp.com/3.0/lists/66b5e5086063c7809423cd24fbc2c79c-us14"

//     const options = {
//         method: "POST",
//         auth: "Pranay:66b5e5086063c7809423cd24fbc2c79c-us14"
//     }

//     https.request(url, options, (response) => {
//         response.on("data", (data) => {
//             console.log(JSON.parse(data));
//         })
//     })
// })



// api Key
// 66b5e5086063c7809423cd24fbc2c79c-us14

// List Id
// 04462464fe



