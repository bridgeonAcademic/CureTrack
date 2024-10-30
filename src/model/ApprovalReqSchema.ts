import mongoose, { Document, Schema } from 'mongoose';

export interface IRequest extends Document {
    requester: mongoose.Schema.Types.ObjectId;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}

const requestSchema = new Schema<IRequest>({
    requester: { type: Schema.Types.ObjectId, refPath: 'role', required: true },
    role: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model<IRequest>('Request', requestSchema);
export default Request;