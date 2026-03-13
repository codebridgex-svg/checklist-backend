// supabaseUpload.js (formerly s3Upload.js)
import multer from "multer";
import { supabase } from "../config/supabaseClient.js";
import dotenv from "dotenv";

dotenv.config();

// 1️⃣ Multer setup (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 2️⃣ Upload function to Supabase Storage
export const uploadToS3 = async (file) => {
  try {
    console.log("🚀 uploadToSupabase called with:", {
      name: file.originalname,
      type: file.mimetype,
      size: file.buffer?.length
    });

    const fileName = `uploads/${Date.now()}_${file.originalname}`;
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME || 'checklist')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) throw error;

    console.log("✅ Uploaded to Supabase:", data.path);

    // Construct the public URL
    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME || 'checklist')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("❌ Error uploading to Supabase:", err);
    throw err;
  }
};

export default upload;
