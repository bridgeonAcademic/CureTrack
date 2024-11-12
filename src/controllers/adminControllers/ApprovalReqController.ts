import { Request, Response, NextFunction } from 'express';
import RequestModel from '../../models/adminModels/ApprovalReqSchema';

// Create a new approval request
export const createRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const newRequest = await RequestModel.create({
            requester: req.body.requester,
            role: req.body.role,
            name: req.body.name,
            url: req.body.url,
            status: req.body.status
        });
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: "Failed to create request", error });
    }
};

// Get all requests
export const getAllRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await RequestModel.find({status:"pending"});
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch requests", error });
    }
};

// Update request status
export const updateRequestStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id, status, role } = req.body;
    console.log(id, status)
    try {
        const request = await RequestModel.findByIdAndUpdate(
         id,
            { status },
            { new: true }
        );
        // note: need to impliment the logic to update  collection (doctor, lab, pharmecy, vendor etc) based on the role 
        if (!request) {
            res.status(404).json({ message: "Request not found" });
            return;
        }
        res.json(request);
    } catch (error) {
        next(error);
    }
};