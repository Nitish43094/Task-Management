exports.emailVarifaction = (otp) => {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Update Confirmation</title>
                <style>
                    body {
                        background-color: #ffffff;
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 16px;
                        line-height: 1.4;
                        color: #333333;
                        margin: 0;
                        padding: 0;
                    }

                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        text-align: center;
                    }

                    .logo {
                        max-width: 200px;
                        margin-bottom: 20px;
                    }

                    .message {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }

                    .body {
                        font-size: 16px;
                        margin-bottom: 20px;
                    }

                    .support {
                        font-size: 14px;
                        color: #999999;
                        margin-top: 20px;
                    }

                    .highlight {
                        font-weight: bold;
                    }
                </style>
            </head>

            <body>
                <div class="container">
                    <div class="message">OTP verafication Email</div>
                        <div class="body">
                            <p>Dear User,</p>
                            <h2 class="highlight">${otp}</h2>
                        </div>
                    </div>
                </div>
            </body>
            </html>`
}