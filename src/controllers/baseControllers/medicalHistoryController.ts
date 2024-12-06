import { Request, Response } from "express";
import MedicalHistory from "../../models/baseModels/medicalHistorySchema";

// Create a new medical history
export const createMedicalHistory = async (req: Request, res: Response) => {
  try {
    const medicalHistory = new MedicalHistory(req.body);
    const savedMedicalHistory = await medicalHistory.save();
    res.status(201).json(savedMedicalHistory);
  } catch (error) {
    res.status(500).json({ message: "Error creating medical history", error });
  }
};

// Get all medical histories
export const getMedicalHistories = async (req: Request, res: Response) => {
  try {
    const medicalHistories = await MedicalHistory.find();
    res.status(200).json(medicalHistories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medical histories", error });
  }
};

// Get a single medical history by ID
export const getMedicalHistoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory) {
       res.status(404).json({ message: "Medical history not found" });
       return;
    }
    res.status(200).json(medicalHistory);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medical history", error });
  }
};

// Update a medical history by ID
export const updateMedicalHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMedicalHistory = await MedicalHistory.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMedicalHistory) {
       res.status(404).json({ message: "Medical history not found" });
       return;
    }
    res.status(200).json(updatedMedicalHistory);
  } catch (error) {
    res.status(500).json({ message: "Error updating medical history", error });
  }
};

// Delete a medical history by ID
export const deleteMedicalHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMedicalHistory = await MedicalHistory.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true }
    );
    if (!deletedMedicalHistory) {
      res.status(404).json({ message: "Medical history not found" });
      return;
    }
    res.status(200).json({ message: "Medical history deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting medical history", error });
  }
};