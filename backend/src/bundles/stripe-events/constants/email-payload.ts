const EmailPayload = {
    HTML: `
    <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f0f0f0;
                    text-align: center;
                    padding: 20px;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #3498db;
                }

                p {
                    color: #555;
                }

                .footer {
                    margin-top: 20px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Congratulations on successful subscription!</h1>
                <p>We're excited to have you on board.</p>
                <p>Thank you for choosing our service.</p>
                <div class="footer">
                    <p>Best regards,</p>
                    <p>Resumegemm</p>
                </div>
            </div>
        </body>
    </html>
`,
};

export { EmailPayload };
