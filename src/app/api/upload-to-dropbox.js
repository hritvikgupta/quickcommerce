// pages/api/upload-to-dropbox.js
import { Dropbox } from 'dropbox';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const form = new formidable.IncomingForm();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.file;

    // Initialize Dropbox
    const dbx = new Dropbox({ 
      accessToken: process.env.DROPBOX_ACCESS_TOKEN 
    });

    // Read the file
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Upload to Dropbox
    const response = await dbx.filesUpload({
      path: `/menus/${file.originalFilename}`,
      contents: fileBuffer
    });

    // Create a shared link
    const sharedLinkResponse = await dbx.sharingCreateSharedLink({
      path: response.result.path_display,
      settings: {
        requested_visibility: 'public',
        audience: 'public',
        access: 'viewer'
      }
    });

    // Clean up the temporary file
    fs.unlinkSync(file.filepath);

    // Return the shared link
    return res.status(200).json({
      shareLink: sharedLinkResponse.result.url.replace('?dl=0', '?dl=1') // Force download link
    });

  } catch (error) {
    console.error('Error uploading to Dropbox:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
}