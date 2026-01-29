import { Router } from "express";
import { profile, updateProfile } from "./user.service.js";
const router = Router();

router.get("/", async (req, res, next) => {
  const result = await profile(req.query.id);

  return res.status(200).json({ message: "Profile", result });
});
router.patch('/:userId',async(req,res,next)=>{
    
    try {
        const result =await updateProfile(req.params.userId,req.body)
        return res.status(200).json({ message: "Profile", result });
    } catch (error) {
          return res.status(404).json({ message: error.message});
        
    }
})
router.get('/user/by-email',async(req,res,next)=>{
    try {
        const result=await findingEmail(req.query.email)
        res.status(200).json({ message: "Profile", result });
    } catch (error) {
          return res.status(404).json({ message: error.message});
    }
})
router.get('/:id',async(req,res,next)=>{
    try {
        const result=await exclusion (req.params.id)
         res.status(200).json({ message: "Profile", result });
    } catch (error) {
         return res.status(404).json({ message: error.message});
    }
    
});

export default router;


