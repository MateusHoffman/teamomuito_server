// import dotenv from "dotenv";
// import express, { Request, Response } from "express";
// import Stripe from "stripe";
// import { generateId, removeAccents } from "./utils/helpers";
// import PurchaseModel from "./models";
// import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

// dotenv.config();

// const router = express.Router();

// const client = new MercadoPagoConfig({
//   accessToken: process.env.MERCADO_PAGO_SECRET_KEY || "",
//   // options: { timeout: 5000, idempotencyKey: "abc" },
// });
// const payment = new Payment(client);
// const preference = new Preference(client);

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2024-06-20",
// });

// router.post("/checkout", async (req: Request, res: Response) => {
//   try {
//     const body = {
//       transaction_amount: 0.01,
//       description: "Te Amo Muito",
//       payment_method_id: "pix",
//       payer: {
//         email: "mateushoffmandev@gmail.com",
//       },
//     };

//     // Step 6: Make the request
//     payment.create({ body }).then(console.log).catch(console.log);

//     // preference
//     //   .create({
//     //     body: {
//     //       items: [
//     //         {
//     //           id: "1",
//     //           title: "Te Amo Muito - Presente",
//     //           description: "Presente para o seu amor",
//     //           picture_url: "",
//     //           currency_id: "BRL",
//     //           quantity: 1,
//     //           unit_price: 0.01,
//     //         },
//     //       ],

//     //       payer: {
//     //         name: "mateus",
//     //         email: "mateus@gmail.com",
//     //       },
//     //       // payment_methods: {
//     //       //   default_payment_method_id: "pix", // Pode ser 'pix' ou qualquer outro método padrão
//     //       //   excluded_payment_types: [], // Remove as exclusões para permitir crédito e débito
//     //       //   // Adiciona outras opções de métodos de pagamento conforme necessário
//     //       // },
//     //       back_urls: {
//     //         success: "https://www.exemplo.com/sucesso",
//     //         pending: "https://www.exemplo.com/pendente",
//     //         failure: "https://www.exemplo.com/falha",
//     //       },
//     //       redirect_urls: {
//     //         success: "https://www.exemplo.com/redirecionamento_sucesso",
//     //         failure: "https://www.exemplo.com/redirecionamento_falha",
//     //         pending: "https://www.exemplo.com/redirecionamento_pendente",
//     //       },
//     //       coupon_code: "CUPOM10",
//     //       coupon_labels: ["desconto_amor"],
//     //       operation_type: "regular_payment",
//     //       auto_return: "approved",
//     //       notification_url: "https://www.exemplo.com/notificacao",
//     //     },
//     //   })
//     //   .then((data) => console.log(JSON.stringify(data, null, 2)))
//     //   .catch(console.log);

//     res.json({ url: "http://localhost:3000/" });
//   } catch (error) {
//     console.error("Erro:", error);
//     res.status(500);
//   }
// });

// // router.post("/checkout", async (req: Request, res: Response) => {
// //   const body = req.body;
// //   const slug = encodeURIComponent(
//     // `${generateId()}-${removeAccents(body?.manName)}-e-${removeAccents(
//     //   body?.womanName
//     // )}`
// //   );

// //   try {
// //     const successUrl = `${process.env.CLIENT_URL}/${slug}/QRCode`;
// //     const cancelUrl = `${process.env.CLIENT_URL}`;

// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ["card"],
// //       line_items: [
// //         {
// //           price: "price_1Q0a76P17dwzDq34rjE0nJtZ",
// //           quantity: 1,
// //         },
// //       ],
// //       mode: "payment",
// //       success_url: successUrl,
// //       cancel_url: cancelUrl,
// //       metadata: {
// //         slug,
// //       },
// //     });

// //     const purchase = new PurchaseModel({
// //       slug: slug || "",
// //       email: "",
// //       name: "",
// //       created: "",
// //       paid: false,
// //       data: {
// //         manName: body?.manName || "",
// //         womanName: body?.womanName || "",
// //         startDate: body?.startDate || "",
// //         startTime: body?.startTime || "",
// //         message: body?.message || "",
// //         youtubeLink: body?.youtubeLink || "",
// //         photos: body?.photos || [],
// //       },
// //     });

// //     await purchase.save();

// //     res.json({ url: session.url });
// //   } catch (error) {
// //     console.error("Erro:", error);
// //     res.status(500).json({ error: "Failed to create checkout session" });
// //   }
// // });

// router.post("/webhook", async (req: Request, res: Response) => {
//   const event = req.body;
//   if (event?.type === "checkout.session.completed") {
//     const updateData = {
//       email: event?.data?.object?.customer_details?.email || "",
//       name: event?.data?.object?.customer_details?.name || "",
//       created: event?.created || "",
//       paid: true,
//     };
//     const updatedPurchase = await PurchaseModel.findOneAndUpdate(
//       { slug: event?.data?.object?.metadata?.slug },
//       updateData,
//       { new: true }
//     );
//     return updatedPurchase;
//   }
//   res.json({ received: true });
// });

// router.get("/getPurchaseBySlug", async (req: Request, res: Response) => {
//   const { slug } = req.query;

//   const purchase = await PurchaseModel.findOne({ slug });

//   return res.status(200).json(purchase);
// });

// export default router;

// // curl -X POST \
// //     'https://api.mercadopago.com/checkout/preferences'\
// //     -H 'Content-Type: application/json' \
// //        -H 'Authorization: Bearer APP_USR-524008420608597-093014-86ae2aec3d7d75b7e0cb26f34e621de2-2014593674' \
// //     -d '{
// //   "items": [
// //     {
// //       "id": "Sound system",
// //       "title": "Dummy Title",
// //       "description": "Dummy description",
// //       "picture_url": "http://www.myapp.com/myimage.jpg",
// //       "category_id": "car_electronics",
// //       "quantity": 1,
// //       "currency_id": "BRL",
// //       "unit_price": 0.01
// //     }
// //   ],
// //   "payer": {
// //     "name": "John",
// //     "surname": "Doe",
// //     "email": "john@doe.com",
// //     "phone": {
// //       "area_code": "11",
// //       "number": 988888888
// //     },
// //     "identification": {
// //       "type": "CPF",
// //       "number": "19119119100"
// //     },
// //     "address": {
// //       "zip_code": "06233200",
// //       "street_name": "Example Street",
// //       "street_number": 123
// //     },
// //     "date_created": "2024-04-01T00:00:00Z"
// //   },
// //   "payment_methods": {
// //     "excluded_payment_methods": [
// //       {}
// //     ],
// //     "excluded_payment_types": [
// //       {
// //         "id": "ticket"
// //       }
// //     ],
// //     "default_payment_method_id": "pix",
// //     "installments": 10,
// //     "default_installments": 5
// //   },
// //   "back_urls": {
// //     "success": "http://test.com/success",
// //     "pending": "http://test.com/pending",
// //     "failure": "http://test.com/failure"
// //   },
// //   "notification_url": "http://notificationurl.com",
// //   "additional_info": "Discount 12.00",
// //   "auto_return": "approved",
// //   "external_reference": "1643827245",
// //   "expires": false,
// //   "marketplace": "NONE",
// //   "marketplace_fee": 0,
// //   "differential_pricing": {
// //     "id": 1
// //   },
// //   "metadata": null
// // }'

// // import { MercadoPagoConfig, Payment } from 'mercadopago';

// // const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });
// // const payment = new Payment(client);

// // payment.capture({
// // id: '<PAYMENT_ID>',
// // transaction_amount: 12.34,
// // requestOptions: {
// // idempotencyKey: '<IDEMPOTENCY_KEY>'
// // }
// // }).then(console.log).catch(console.log);

// // STATUS: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/response-handling/query-results