
# Email Tracker and Notification

This package allows you to set up an email tracking system with the ability to send notifications to a designated email address whenever an email is opened.

---

## Features

- **Email Tracking**: Tracks when an email is opened via a tracking pixel.
- **Notification Emails**: Sends a notification to a specified email address when tracking events occur.

---

## Installation

Install the package via npm:

```bash
npm install email-tracker-ts
```
Install the package via yarn:

```bash
yarn add email-tracker-ts
```
---

## Usage

### 1. Initialize the `Mailer` Class

The `Mailer` class handles sending emails and appending a tracking pixel to the email content.

```typescript
import { Mailer } from "email-tracker-ts";

const mailer = new Mailer(
  "smtp.example.com", // SMTP host
  "587",              // SMTP port
  "your-email@example.com", // Sender email
  "your-password",          // SMTP password
  "Your App Name"           // Sender name
);
```

### 2. Set Up the `Tracker` Class

The `Tracker` class sets up an Express server to handle tracking pixel requests.

```typescript
import { Tracker } from "email-tracker-ts";


const tracker = new Tracker(
  3000,            // Port to run the tracker server
  mailer,          // Mailer instance
);

// Start the tracker server
tracker.start();
```

### 3. Send Emails with Tracking

Use the `sendMail` method of the `Mailer` class to send emails with a tracking pixel. The tracking URL should point to your tracker server.

```typescript
mailer.sendMail({
  to: "recipient@example.com",                     // Recipient's email
  subject: "Welcome to Our Service!",             // Email subject
  html: "<p>Hello, welcome to our service!</p>",  // Email content
  trackingUrl: "http://localhost:3000/track?email=recipient@example.com", // Tracking URL
});
```

---

## Example Workflow

1. Start the tracker server:
   ```bash
   node tracker.js
   ```
   The server will run on `http://localhost:3000`.

2. Send a tracked email:
   ```typescript
   mailer.sendMail({
     to: "user@example.com",
     subject: "Hello!",
     html: "<p>Check out our app.</p>",
     trackingUrl: "http://localhost:3000/track?email=user@example.com",
   });
   ```

3. When the recipient opens the email, a request will be sent to `http://localhost:3000/track?email=user@example.com`. The server will:
   - Log the email in the console.
   - Send a notification email to the sender.

---

## API Reference

### `Mailer` Class

| Method       | Parameters                                                                                                                                                         | Description                           |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| `sendMail`   | `{ to: string; subject: string; html: string; trackingUrl: string }`                                                                                             | Sends an email with a tracking pixel. |

#### MailOptions

| Parameter      | Type     | Description                            |
|----------------|----------|----------------------------------------|
| `to`           | `string` | Recipient email address.              |
| `subject`      | `string` | Email subject.                        |
| `html`         | `string` | Email body in HTML format.            |
| `trackingUrl`  | `string` | URL for the tracking pixel request.   |

---

### `Tracker` Class

| Method       | Parameters                                                                           | Description                                            |
|--------------|-------------------------------------------------------------------------------------|--------------------------------------------------------|
| `constructor`| `port: number, mailer: Mailer`   | Initializes the tracker server.                       |
| `start`      | None                                                                                | Starts the Express server on the specified port.      |

---

## Dependencies

- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)

---

## License

MIT
