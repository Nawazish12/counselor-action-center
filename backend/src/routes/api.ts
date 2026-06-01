import { Router } from "express";
import { studentController } from "../controllers/studentController";

export const apiRoutes = Router();

apiRoutes.get("/students/:id/action-center", (req, res, next) => {
  void studentController.getActionCenter(req, res, next);
});

apiRoutes.patch("/tasks/:taskId/status", (req, res, next) => {
  void studentController.updateTaskStatus(req, res, next);
});
