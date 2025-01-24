import express, { Request, Response } from "express";
import { Mailer, MailOptions } from "./mailer"; 

export class Tracker {
  private app = express();
  private port: number;
  private mailer: Mailer;

  constructor(
    port: number,
    mailer: Mailer,
  ) {
    this.port = port;
    this.mailer = mailer;

    this.app.get("/track", this.handleTracking.bind(this));
  }

  private async handleTracking(req: Request, res: Response): Promise<void> {
    const email = req.query.email as string;

    if (email) {
      console.log(`E-mail opened by: ${email}`);

      const mailOptions: MailOptions = {
        to: this.mailer.senderMail, 
        subject: "Email Opened Notification",
        html: `<p>The email was opened by: ${email}</p>`,
        trackingUrl: "", 
      };

      try {
        await this.mailer.sendMail(mailOptions);
        console.log("Notification email sent to sender address.");
      } catch (err) {
        console.error("Failed to send notification email:", err);
      }
    }

    const pixel = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/ykLpQAAAABJRU5ErkJggg==",
      "base64"
    );

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": pixel.length,
    });
    res.end(pixel);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Tracker is running on port ${this.port}`);
    });
  }
}
