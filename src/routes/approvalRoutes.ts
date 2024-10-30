// routes/requestRoutes.ts
import express from 'express';
import {
    createRequest,
    getAllRequests,
    updateRequestStatus
} from '../controller/ApprovalReqController';

const router = express.Router();

// Route to create a new approval request
router.get('/', (req, res)=>{res.send('okay')})
router.post('/requests', createRequest);

// Route to get all requests
router.get('/requests', getAllRequests);

// Route to update request status
router.patch('/requests', updateRequestStatus);

export default router;