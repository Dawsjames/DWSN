import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" })
    return
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields" })
    return
  }

  // Transport using Gmail SMTP - requires app password or OAuth2
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // app password or OAuth2 token
    },
  })

  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.CONTACT_RECEIVER || process.env.GMAIL_USER,
    subject: `Website Contact: ${name}`,
    text: `${message}\n\nFrom: ${name} <${email}>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error("Email send error:", err)
    res.status(500).json({ error: "Failed to send email" })
  }
}
