import httpStatus from "http-status";
import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { PaymentService } from "./payment.service";
import config from "../../config";
import axios from "axios";
import { prisma } from "../../lib/prisma";



const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PaymentService.getSinglePayment(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});


const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await PaymentService.initPayment(bookingId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initialized successfully",
    data: result,
  });
});

const paymentSuccess = async (req: Request, res: Response) => {
  const { val_id } = req.body;

  const validationUrl =
    config.ssl_is_live === "true"
      ? "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"
      : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";

  const { data } = await axios.get(validationUrl, {
    params: {
      val_id,
      store_id: config.ssl_store_id,
      store_passwd: config.ssl_password,
      v: 1,
      format: "json",
    },
  });

  if (data.status === "VALID") {
    await prisma.payment.update({
      where: {
        transactionId: data.tran_id,
      },
      data: {
        status: "COMPLETED",
      },
    });

    return res.redirect(
      `http://localhost:3000/payment/success?tran_id=${data.tran_id}`
    );
  }

  return res.redirect("http://localhost:3000/payment/cancel");
};

const paymentFail = async (req: Request, res: Response) => {
  const { tran_id } = req.body;

  await prisma.payment.update({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: "FAILED",
    },
  });

  return res.redirect("http://localhost:3000/payment/cancel");
};


const paymentCancel = async (req: Request, res: Response) => {
  return res.redirect("http://localhost:3000/payment/cancel");
};

export const PaymentController = {
  getAllPayments,
  getSinglePayment,
  initPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel

};