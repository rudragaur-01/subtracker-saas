import express from "express";
import {
  businessDetails,
  createNewCustomer,
  customer_list,
  DashboardSummary,
  renewal_notif,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/business-details", authMiddleware, businessDetails);
router.post("/send", authMiddleware, renewal_notif);
router.post("/create_new_customer", authMiddleware, createNewCustomer);
router.get("/all_customer_list", authMiddleware, customer_list);
router.get("/dashboardSummary", authMiddleware, DashboardSummary);

export default router;
