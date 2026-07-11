import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/apperror";
import config from "../../config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import qs from "qs"
import { response } from "express";




const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: {
      booking: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSinglePayment = async (id: string) => {
  const result = await prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      booking: true,
    },
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment not found"
    );
  }

  return result;
};




const initPayment = async (bookingId: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      bookingId,
    },
    include: {
      booking: true,
    },
  });

  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }

  const transactionId = uuidv4();

  await prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      transactionId,
    },
  });

  const data = {
    store_id: config.ssl_store_id,
    store_passwd: config.ssl_password,

    total_amount: payment.amount,
    currency: "BDT",

    tran_id: transactionId,

    success_url:  "https://www.google.com/search?q=success+payment+page&oq=su&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg5MgYIARBFGDsyBggCEEUYOzIGCAMQRRg7MgcIBBAAGI8CMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMzY5MGowajeoAgiwAgHxBXfy3fli6Fw7&sourceid=chrome&source=chrome.ob&ie=UTF-8",
    fail_url: `${"https://www.google.com/search?sca_esv=8d865a5c8f1695d2&sxsrf=APpeQnsVi-L5p77ef00YrQjkcNGcRKla2g:1783702444666&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VTJOOCxW_fyN-Q_ezyf8gKjm3rhh_G8jdZ2Q6tji4z8Mva6cfvBj5rpPch2IC955IbzrbwHf6tkbFbd-nuFdbKhrseJTFnzh02vht9CegkmV-mFvyPtXZJ5h0HUGPPEZhDmPmi_Ip6VWJCRCrgMr1HgshIBkLdS90gHhcr1_AM8y79unQ&q=failed+payments&sa=X&ved=2ahUKEwigouW0yciVAxXaY_UHHZzQBI0QtKgLegQIGBAB&biw=1280&bih=551&dpr=1.5"}/api/payments/fail`,
    cancel_url: `${"https://drive.google.com/file/d/1DXqcvawboA5ZasK6cYAYYolnczXy6Xhm/view?usp=sharing"}/api/payments/cancel`,
    ipn_url: `${config.backend_url}/api/payments/ipn`,

    shipping_method: "NO",

    product_name: "FixItNow Service",
    product_category: "Home Service",
    product_profile: "general",

    cus_name: "Customer",
    cus_email: "customer@gmail.com",
    cus_add1: payment.booking.address,
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1207",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",

    ship_name: "Customer",
    ship_add1: payment.booking.address,
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: "1207",
    ship_country: "Bangladesh",
  };

  console.log("SSL Payload:", data);
 

  const sslUrl = config.ssl_is_live === "true"
      ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
      : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";



  const response = await axios.post(
    sslUrl,
    qs.stringify(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log(response.data);
 

  console.log("SSL Response:", response.data);

  if (response.data.status !== "SUCCESS") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      response.data.failedreason || "Payment initialization failed"
    );
  }

  return {
    paymentUrl: response.data.GatewayPageURL,
  };

};





export const PaymentService = {
  getAllPayments,
  getSinglePayment,
  initPayment,

};