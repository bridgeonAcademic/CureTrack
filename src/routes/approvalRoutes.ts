// routes/requestRoutes.ts
import express from 'express';
import {
    createRequest,
    getAllRequests,
    updateRequestStatus
} from '../controller/ApprovalReqController';

const router = express.Router();

// Route to create a new approval request
router.post('/requests', createRequest);

// Route to get all requests
router.get('/requests', getAllRequests);

// Route to update request status
router.patch('/request', updateRequestStatus);

export default router;