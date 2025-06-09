import mongoose, { Schema, Document } from "mongoose";

export interface IAddTask extends Document {
  duedate: Date;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

const AllTaskSchema: Schema<IAddTask> = new Schema(
  {
    duedate: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models["AllTask"] || mongoose.model<IAddTask>("AllTask", AllTaskSchema);
