import mongoose, { Document, Schema } from 'mongoose';

export interface IRequest extends Document {
    requester: mongoose.Schema.Types.ObjectId;
    name: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    url: string;
    createdAt: Date;
}

const requestSchema = new Schema<IRequest>({
    requester: { type: Schema.Types.ObjectId, refPath: 'role', required: true },
    name: {type:String, required: true},
    role: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    url:{type: String, default: "https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw"},
    createdAt: { type: Date, default: Date.now },

});

const Request = mongoose.model<IRequest>('Request', requestSchema);
export default Request;