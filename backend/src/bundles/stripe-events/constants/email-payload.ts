const EmailPayload = {
    HTML: `
<html>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
        <style>
            body {
                font-family: 'Poppins', sans-serif;
                background-color: #768FBE;
                text-align: center;
                padding: 20px;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
            }

            .content {
                background-color: #FDF3D3;
                padding: 10px 40px;
                border-radius: 40px;
                text-align: justify;
            }

            img {
                margin-bottom: 20px;
            }

            h1 {
                color: #000;
                text-align: center;
            }

            p {
                color: #555;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://resumegemm.space/assets/logo-2c9d3d5a.svg" alt="Logo icon">
            <div class="content">
                <h1>You're now subscribed!</h1>
                <p><strong>Dear {name},</strong></p>
                <p>Welcome to ResumeGemm! We're delighted to have you on board as a subscriber.</p>
                <p>Your subscription is now active, <strong>starting from {startDate}</strong> and <strong>ending on {endDate}</strong>. During this time, you'll enjoy exclusive access to premium content, early updates, and special offers tailored just for you.</p>
                <p>If you have any questions or need assistance, feel free to contact our support team.</p>
                <p>Thank you for choosing ResumeGemm!</p>
            </div>
        </div>

    </body>
</html>
`,
};

export { EmailPayload };
