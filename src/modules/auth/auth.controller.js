import { Router } from "express";
import { signup } from "./auth.service.js";
const router = Router();
router.post("/signup", async (req, res, next) => {
  try {
     const result = await signup(req.body);
  return res.status(201).json({ message: "Done signup", result });

  } catch (error) {
    return res.status(404).json({ message:error.message });

    
  }
 

});

export default router;
