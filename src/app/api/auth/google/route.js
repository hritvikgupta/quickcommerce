import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

// Helper function to format date for Airtable
function formatDateForAirtable(date) {
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('1. Received request body:', body);

    if (!body.credential) {
      return NextResponse.json(
        { message: 'No credential provided' },
        { status: 400 }
      );
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: body.credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    console.log('2. Google payload:', payload);

    try {
      // First check if user exists
      const checkUserResponse = await axios.get(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Users?filterByFormula={Email}='${payload.email}'`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          },
        }
      );

      let userId;
      let userRecord;

      if (checkUserResponse.data.records.length > 0) {
        // User exists, update their data
        userRecord = checkUserResponse.data.records[0];
        userId = userRecord.id;

        const currentDate = new Date();
        await axios.patch(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Users/${userId}`,
          {
            fields: {
              "Last Login": formatDateForAirtable(currentDate),
              "Name": payload.name,
              "Profile Picture": payload.picture,
              "Email Verified": payload.email_verified,
              "Google ID": payload.sub
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        // Create new user
        const currentDate = new Date();
        const createUserResponse = await axios.post(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Users`,
          {
            fields: {
              "Name": payload.name,
              "Email": payload.email,
              "Profile Picture": payload.picture,
              "Google ID": payload.sub,
              "Email Verified": payload.email_verified,
              "Auth Provider": "Google",
              "Sign Up Date": formatDateForAirtable(currentDate),
              "Last Login": formatDateForAirtable(currentDate)
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );
        userRecord = createUserResponse.data;
        userId = userRecord.id;
      }

      // If businessId is provided, link user to business
      if (body.businessId) {
        const businessResponse = await axios.get(
          `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table?filterByFormula={Business ID}='${body.businessId}'`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (businessResponse.data.records.length > 0) {
          const business = businessResponse.data.records[0];
          const currentDate = new Date();
          
          await axios.patch(
            `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/Business%20Table/${business.id}`,
            {
              fields: {
                "User ID": userId,
                "Status": "Active",
                "Last Updated": formatDateForAirtable(currentDate)
              }
            },
            {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_PAT}`,
                'Content-Type': 'application/json',
              },
            }
          );
        }
      }

      // Return success response
      return NextResponse.json({
        user: {
          id: userId,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          emailVerified: payload.email_verified
        },
        message: 'Authentication successful'
      });

    } catch (airtableError) {
      console.error('Airtable Error Details:', {
        message: airtableError.message,
        response: airtableError.response?.data,
        status: airtableError.response?.status,
        config: {
          url: airtableError.config?.url,
          method: airtableError.config?.method,
          data: airtableError.config?.data,
        }
      });
      
      return NextResponse.json(
        { 
          message: 'Database error occurred', 
          error: airtableError.message,
          details: airtableError.response?.data?.error || 'No additional details available'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Authentication Error:', error);
    return NextResponse.json(
      { message: 'Authentication failed', error: error.message },
      { status: 401 }
    );
  }
}