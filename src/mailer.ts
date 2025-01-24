import nodemailer from "nodemailer";

export interface MailOptions {
    to: string;
    subject: string;
    html: string;
    trackingUrl: string;
}

export class Mailer {
    private transporter;
    private fromName: string;
    private senderMail: string;
    constructor(host: string, port: string, user: string, password: string, fromName: string) {
        this.transporter = nodemailer.createTransport({
            host,
            port,
            auth: {
                user,
                password,
            },
        });

        this.fromName = fromName;
        this.senderMail = user;
    }

    async sendMail(options: MailOptions): Promise<void> {
        const trackingPixl = `<img src="${options.trackingUrl}" style="display:none;" />`;
        const mailOptions = {
            from: `"${this.fromName}" <${this.senderMail}>`,
            to: options.to,
            subject: options.subject,
            html: options.html + trackingPixl,
        };

        await this.transporter.sendMail(mailOptions);
    }
}