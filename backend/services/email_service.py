
import os
import smtplib
from email.message import EmailMessage


def send_enquiry_notification(enquiry_id, name, email, phone, message):
    smtp_email = os.getenv("SMTP_EMAIL")
    recipient = os.getenv("ENQUIRY_NOTIFICATION_EMAIL")
    app_password = os.getenv("SMTP_APP_PASSWORD", "").replace(" ", "")

    if not all([smtp_email, recipient, app_password]):
        raise RuntimeError("Email notification settings are incomplete")

    email_message = EmailMessage()
    email_message["Subject"] = f"New Salon Enquiry #{enquiry_id}"
    email_message["From"] = smtp_email
    email_message["To"] = recipient

    email_message.set_content(
        f"""
New customer enquiry received.

Enquiry ID: {enquiry_id}
Name: {name}
Email: {email}
Phone: {phone or "Not provided"}

Message:
{message}
"""
    )

    with smtplib.SMTP_SSL(
        os.getenv("SMTP_HOST", "smtp.gmail.com"),
        int(os.getenv("SMTP_PORT", "465")),
        timeout=15
    ) as server:
        server.login(smtp_email, app_password)
        server.send_message(email_message)
