import { Request, Response } from "express";
import Vendors from "../model/vendorsSchema";

export const getAllVendors = async (req: Request, res: Response) => {
    try {
        // Fetching vendors
        const vendorName = req.params.vendorName;

        const allVendors = await Vendors.find({});
        const hospitals = allVendors.filter(vendor => vendor.vendorRole.includes('hospital'));
        const clinics = allVendors.filter(vendor => vendor.vendorRole.includes('pharmacies'));
        const labs = allVendors.filter(vendor => vendor.vendorRole.includes('labs'));

        if (vendorName === "all") {
            res.status(200).json({ status: 'success', data: { allVendors }, message: "All Vendors fetched successfully" })
            return
        }

        if (vendorName === 'hospitals') {
            res.status(200).json({ status: 'success', data: { hospitals }, message: "Hospitals fetched successfully" })
            return
        }
        if (vendorName === 'clinics') {
            res.status(200).json({ status: 'success', data: { clinics }, message: "Clinics fetched successfully" })
            return
        }
        if (vendorName === 'labs') {
            res.status(200).json({ status: 'success', data: { labs }, message: "Labs fetched successfully" })
            return
        }

    } catch (error: any) {
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching data.', error: error.message });
    }
};  