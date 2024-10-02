export const generateHtmlResponseEmail = async (link: string) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Link e QR Code</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            h2 {
              color: #333;
              font-size: 24px;
              margin-bottom: 10px;
            }
            h3 {
              color: #666;
              font-size: 20px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #007BFF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-size: 18px;
              transition: background-color 0.3s;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .button:hover {
              background-color: #0056b3;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Esse email é para deixar salvo o link do seu site!</h2>
            <h3>Acesse aqui para obter o seu QR Code</h3>
            <a href="${link}" class="button">Ir para o Site</a>
          </div>
        </body>
      </html>
    `;

    return {
      html: htmlContent,
      text: link, // Se necessário, pode-se adicionar um texto plano aqui
    };
  } catch (error) {
    console.error("Erro ao gerar o QR Code:", error);
    return {
      html: "<p>Erro ao gerar o QR Code.</p>",
      text: link,
    };
  }
};
