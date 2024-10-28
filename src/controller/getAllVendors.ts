import { Request, Response } from "express";
import Vendors from "../model/vendorsSchema";

export const getAllVendors = async (req: Request, res: Response) => {
    try {
        // Fetching vendors
        const allVendors = await Vendors.find({});
        const hospitals = allVendors.filter(vendor => vendor.vendorRole.includes('hospital'));
        const clinics = allVendors.filter(vendor => vendor.vendorRole.includes('pharmacies'));
        const labs = allVendors.filter(vendor => vendor.vendorRole.includes('labs'));

        res.status(200).json({ status: 'success', data: { allVendors, hospitals, clinics, labs }, message: "Vendors fetched successfully" });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching data.', error: error.message });
    }
};  