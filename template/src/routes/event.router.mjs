import express from "express";
import { google } from "googleapis";
import Events from "../models/event.postgres.mjs";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

// Create a new event in Google Calendar and in the database
router.post("/events", async (req, res) => {
  console.log("Creating a new event...");
  const eventDetails = req.body;

  // Save event to database
  // try {
  //   const event = await Events.create(eventDetails);
  //   console.log('Event saved to database:', event.toJSON());
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send(error.message);
  //   return;
  // }

  // Authenticate user and obtain access and refresh tokens
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  console.log("Authorize this app by visiting this url:", authUrl);

  const code = req.query.code;

  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log("Access token:", tokens.access_token);
      console.log("Refresh token:", tokens.refresh_token);
      
      oauth2Client.setCredentials(tokens);

      // Create a new event in the user's Google Calendar
      const calendar = google.calendar({ version: "v3", auth: oauth2Client });
      const event = {
        summary: eventDetails.summary,
        location: eventDetails.location,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.start.dateTime,
          timeZone: eventDetails.start.timeZone,
        },
        end: {
          dateTime: eventDetails.end.dateTime,
          timeZone: eventDetails.end.timeZone,
        },
        reminders: {
          useDefault: true,
        },
      };

      calendar.events.insert(
        {
          calendarId: "primary",
          resource: event,
        },
        (err, event) => {
          if (err) {
            console.error(
              "There was an error creating the event: " + err.message
            );
            res.status(500).send(err.message);
            return;
          }
          console.log("Event created: %s", event.htmlLink);
          res.status(200).send(event.htmlLink);
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  } else {
    res.redirect(authUrl);
  }
});

router.get("/oauthcallback", async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Access token:", tokens.access_token);
    console.log("Refresh token:", tokens.refresh_token);
    oauth2Client.setCredentials(tokens);
    // Store access and refresh tokens in the database or session
    // ...

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export default router;





// import express from "express";
// import { google } from "googleapis";
// import Events from "../models/event.postgres.mjs";

// const router = express.Router();

// // Create a new event in Google Calendar and in the database
// router.post("/events", async (req, res) => {
//   const eventDetails = req.body;

//   // Save event to database
//   try {
//     // const event = await Events.create(eventDetails);
//     // console.log('Event saved to database:', event.toJSON());
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//     return;
//   }

//   // Authenticate user and obtain access and refresh tokens
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
//   );

//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/calendar"],
//   });

//   console.log("Authorize this app by visiting this url:", authUrl);

//   const code = req.query.code;

//   if (code) {
//     try {
//       const { tokens } = await oauth2Client.getToken(code);
//       console.log("Access token:", tokens.access_token);
//       console.log("Refresh token:", tokens.refresh_token);
//       oauth2Client.setCredentials(tokens);

//       // Create a new event in the user's Google Calendar
//       const calendar = google.calendar({ version: "v3", auth: oauth2Client });
//       const event = {
//         summary: eventDetails.summary,
//         location: eventDetails.location,
//         description: eventDetails.description,
//         start: {
//           dateTime: eventDetails.start.dateTime,
//           timeZone: eventDetails.start.timeZone,
//         },
//         end: {
//           dateTime: eventDetails.end.dateTime,
//           timeZone: eventDetails.end.timeZone,
//         },
//         reminders: {
//           useDefault: true,
//         },
//       };

//       const eventResponse = await calendar.events.insert({
//         calendarId: "primary",
//         resource: event,
//       });
      
//       console.log("Event created: %s", eventResponse.data.htmlLink);
//       res.status(200).send(eventResponse.data.htmlLink);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error.message);
//     }
//   } else {
//     res.redirect(authUrl);
//   }
// });

// router.get("/oauthcallback", async (req, res) => {
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
//   );

//   const code = req.query.code;

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     console.log("Access token:", tokens.access_token);
//     console.log("Refresh token:", tokens.refresh_token);
//     oauth2Client.setCredentials(tokens);
//     // Store access and refresh tokens in the database or session
//     // ...

//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


// export default router;







//another 

// import { google } from 'googleapis';
// import express from 'express';
// const router = express.Router();

// const calendar = google.calendar('v3');
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// // Set the access token and refresh token if available
// if (process.env.ACCESS_TOKEN && process.env.REFRESH_TOKEN) {
//   oAuth2Client.setCredentials({
//     access_token: process.env.ACCESS_TOKEN,
//     refresh_token: process.env.REFRESH_TOKEN,
//   });
// }

// router.get('/auth', (req, res) => {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/calendar.events'],
//   });

//   res.redirect(authUrl);
// });

// router.get('/oauthcallback', async (req, res) => {
//   const { code } = req.query;

//   try {
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     res.redirect('/success.html'); // Redirect to success page
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving access token');
//   }
// });

// router.post('/events', async (req, res) => {
//   try {
//     // Extract event data from the request body
//     const eventData = req.body;

//     // Create a new event in the calendar
//     const event = await calendar.events.insert({
//       calendarId: process.env.CALENDAR_ID,
//       auth: oAuth2Client,
//       resource: eventData,
//     });

//     // Return the newly created event as the response
//     res.json(event.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error creating event in Google Calendar');
//   }
// });

// export default router;








// import { google } from 'googleapis';
// import express from 'express';
// const router = express.Router();

// const calendar = google.calendar('v3');
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// router.get('/auth', (req, res) => {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/calendar.events'],
//   });

//   res.redirect(authUrl);
// });

// router.get('/oauthcallback', async (req, res) => {
//   const { code } = req.query;

//   try {
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     res.redirect('/success.html'); // Redirect to success page
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving access token');
//   }
// });

// router.post('/events', async (req, res) => {
//   try {
//     // Extract event data from the request body
//     const eventData = req.body;

//     // Create a new event in the calendar
//     const event = await calendar.events.insert({
//       calendarId: process.env.CALENDAR_ID,
//       auth: oAuth2Client,
//       resource: eventData,
//     });

//     // Return the newly created event as the response
//     res.json(event.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error creating event in Google Calendar');
//   }
// });

// export default router;




































// import express from "express";
// import { google } from "googleapis";
// import Events from "../models/event.postgres.mjs";
// import { OAuth2Client } from "google-auth-library";

// const router = express.Router();

// // Create a new event in Google Calendar and in the database
// router.post("/events", async (req, res) => {
//   console.log("im event", "=====================================");
//   const eventDetails = req.body;

//   // Save event to database
//   try {
//     // const event = await Events.create(eventDetails);
//     //console.log('Event saved to database:', event.toJSON());
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//     return;
//   }

//   // Authenticate user and obtain access and refresh tokens
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
//   );

//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/calendar"],
//   });

//   console.log("Authorize this app by visiting this url:", authUrl);

//   const code = req.query.code;

//   if (code) {
//     try {
//       const { tokens } = await oauth2Client.getToken(code);
//       console.log("Access token:", tokens.access_token);
//       console.log("Refresh token:", tokens.refresh_token);

//       // Create a new event in the user's Google Calendar
//       const calendar = google.calendar({ version: "v3", auth: oauth2Client });
//       const event = {
//         summary: eventDetails.summary,
//         location: eventDetails.location,
//         description: eventDetails.description,
//         start: {
//           dateTime: eventDetails.start.dateTime,
//           timeZone: eventDetails.start.timeZone,
//         },
//         end: {
//           dateTime: eventDetails.end.dateTime,
//           timeZone: eventDetails.end.timeZone,
//         },
//         reminders: {
//           useDefault: true,
//         },
//       };

//       calendar.events.insert(
//         {
//           calendarId: "primary",
//           resource: event,
//         },
//         (err, event) => {
//           if (err) {
//             console.error(
//               "There was an error creating the event: " + err.message
//             );
//             res.status(500).send(err.message);
//             return;
//           }
//           console.log("Event created: %s", event.htmlLink);
//           res.status(200).send(event.htmlLink);
//         }
//       );
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error.message);
//     }
//   } else {
//     res.redirect(authUrl);
//   }
// });

// router.get("/oauthcallback", async (req, res) => {
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
//   );

//   const code = req.query.code;

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     console.log("Access token:", tokens.access_token);
//     console.log("Refresh token:", tokens.refresh_token);
//     oauth2Client.setCredentials(tokens);
//     // Store access and refresh tokens in the database or session
//     // ...

//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });


// export default router;
