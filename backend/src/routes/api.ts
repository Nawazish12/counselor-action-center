import { Request, Response, Router } from "express";
import { studentController } from "../controllers/studentController";

export const apiRoutes = Router();


apiRoutes.get("/students/:id/action-center", (req: Request, res: Response) => {
  void studentController.getActionCenter(req, res);
});

apiRoutes.patch("/tasks/:taskId/status", (req: Request, res: Response) => {
  void studentController.updateTaskStatus(req, res);
});
