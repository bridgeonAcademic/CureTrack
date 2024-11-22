import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IVendors extends Document {
  vendorRole: string[];
  name: string;
  password: string;
  license: string;
  email: string;
  address: {
    buildingNumber: string | null;
    city: string | null;
    country: string[] | null;
    pincode: number | null;
    state: string[] | null;
    street: string | null;
  } | null;
  serviceOffered: mongoose.Schema.Types.Mixed[];
  licenseExpiry: Date | null;
  isApprovedByAdmin: boolean | null;
  vendorStatus: string[] | null;
  doctors: {
    availableTimings: string[] | null;
    consultationFee: number | null;
    createdAt: Date | null;
    doctorId: ObjectId | null;
    vendorId: ObjectId | null;
  }[];
  phoneNumber: number;
  createdAt: Date;
  operationalHours: string[] | null;
  labs: {
    _id: ObjectId | null;
    tests: {
      availableDays: Date | null;
      createdAt: Date | null;
      testDescription: string | null;
      testName: string | null;
      testPrice: string | null;
      turnAroundTime: string | null;
    }[];
    userReports: mongoose.Schema.Types.Mixed[];
  }[];
  pharmacies: {
    medicines: {
      createdAt: Date | null;
      manufacturer: string | null;
      medicineId: string | null;
      medicineName: string | null;
      medicineType: string | null;
      prescriptionRequired: boolean | null;
      price: number | null;
      stock: number | null;
    }[];
    orders: {
      createdAt: Date | null;
      deliveryDate: Date | null;
      isCancel: boolean | null;
      isReturn: boolean | null;
      orderItems: mongoose.Schema.Types.Mixed[];
      orderStatus: string | null;
      orderTotal: number | null;
      paymentStatus: string | null;
      reason: string | null;
    }[];
    userId: ObjectId | null;
  }[];
  appointments: ObjectId[] | null;
  hospital: {
    facilities: {
      ambulances: {
        contactName: string | null;
        contactNumber: number | null;
        vehicleNumber: string | null;
      }[];
      bloodGroup: {
        availability: number | null;
      }[];
      ICU: {
        available: number | null;
        total: number | null;
      };
      insurance: {
        insurancePolicy: string | null;
        insuranceType: string | null;
      }[];
      ventilators: {
        available: number | null;
        total: number | null;
      };
    }[];
  }[];
  payment: mongoose.Schema.Types.Mixed[];
  vendorId: string | null;
  notification: ObjectId[] | null;
  subscription: ObjectId | null;
  deletedBy: string | null;
  isDelete: boolean | null;
  createdBy: string | null;
  isActive: boolean | null;
}

const VendorsSchema: Schema = new Schema(
  {
    vendorRole: [
      { type: String, required: true, enum: ["hospital", "lab", "pharmacy"] },
    ],
    name: { type: String, required: true },
    password: { type: String, required: true },
    license: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      buildingNumber: { type: String },
      city: { type: String },
      country: [{ type: String }],
      pincode: { type: Number },
      state: [{ type: String }],
      street: { type: String },
    },
    serviceOffered: [{ type: mongoose.Schema.Types.Mixed }],
    licenseExpiry: { type: Date },
    isApprovedByAdmin: { type: Boolean },
    vendorStatus: [{ type: String }],
    doctors: [
      {
        availableTimings: [{ type: String }],
        consultationFee: { type: Number },
        createdAt: { type: Date },
        doctorId: { type: Schema.Types.ObjectId },
        vendorId: { type: Schema.Types.ObjectId },
      },
    ],
    phoneNumber: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    operationalHours: [{ type: String }],
    labs: [
      {
        _id: { type: Schema.Types.ObjectId },
        tests: [
          {
            availableDays: { type: Date },
            createdAt: { type: Date },
            testDescription: { type: String },
            testName: { type: String },
            testPrice: { type: String },
            turnAroundTime: { type: String },
          },
        ],
        userReports: [{ type: mongoose.Schema.Types.Mixed }],
      },
    ],
    pharmacies: [
      {
        medicines: [
          {
            createdAt: { type: Date },
            manufacturer: { type: String },
            medicineId: { type: String },
            medicineName: { type: String },
            medicineType: { type: String },
            prescriptionRequired: { type: Boolean },
            price: { type: Number },
            stock: { type: Number },
          },
        ],
        orders: [
          {
            createdAt: { type: Date },
            deliveryDate: { type: Date },
            isCancel: { type: Boolean },
            isReturn: { type: Boolean },
            orderItems: [{ type: mongoose.Schema.Types.Mixed }],
            orderStatus: { type: String },
            orderTotal: { type: Number },
            paymentStatus: { type: String },
            reason: { type: String },
          },
        ],
        userId: { type: Schema.Types.ObjectId },
      },
    ],
    appointments: [{ type: Schema.Types.ObjectId }],
    hospital: [
      {
        facilities: [
          {
            ambulances: [
              {
                contactName: { type: String },
                contactNumber: { type: Number },
                vehicleNumber: { type: String },
              },
            ],
            bloodGroup: [
              {
                availability: { type: Number },
              },
            ],
            ICU: {
              available: { type: Number },
              total: { type: Number },
            },
            insurance: [
              {
                insurancePolicy: { type: String },
                insuranceType: { type: String },
              },
            ],
            ventilators: {
              available: { type: Number },
              total: { type: Number },
            },
          },
        ],
      },
    ],
    payment: [{ type: mongoose.Schema.Types.Mixed }],
    vendorId: { type: String },
    notification: [{ type: Schema.Types.ObjectId }],
    subscription: { type: Schema.Types.ObjectId },
    deletedBy: { type: String },
    isDelete: { type: Boolean },
    createdBy: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

const Vendors = mongoose.model<IVendors>("Vendors", VendorsSchema);

export default Vendors;
