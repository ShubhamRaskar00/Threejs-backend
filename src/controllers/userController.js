const { google } = require('googleapis');

// Initialize the OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const userController = {
  addEventToGoogleCalendar: async (req, res) => {
    const { accessToken, event } = req.body;

    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: {
          summary: event.title,
          start: {
            dateTime: event.start,
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: event.end,
            timeZone: 'America/Los_Angeles',
          },
        },
      });

      res.json({ success: true, event: response.data });
    } catch (error) {
      console.error('Error adding event to Google Calendar', error);
      res.status(500).json({ success: false, error: 'Failed to add event to Google Calendar' });
    }
  },

};

module.exports = userController;
