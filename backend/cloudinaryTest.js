import cloudinary from "../backend/src/lib/cloudinary.js"

 (async () => {
  try {
    const result = await cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/a3/June_odd-eyed-cat.jpg");
    console.log("✅ Image uploaded successfully:", result.secure_url);
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);
  }
})();