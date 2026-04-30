const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Scan must belong to a user'],
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub URL is required'],
    },
    rawReport: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Raw report is required'],
      default: {},
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'scanning', 'completed', 'failed'],
      default: 'pending',
    },
    vulnerabilities: [
      {
        vulnerabilityType: String,
        severity: String,
        filePath: String,
        lineNumber: Number,
        description: String,
      },
    ],
    summary: {
      critical: Number,
      high: Number,
      medium: Number,
      low: Number,
      info: Number,
    },
    scanDuration: Number, // in milliseconds
    errorMessage: String,
  },
  { timestamps: true }
);

// Index for faster queries
scanSchema.index({ userId: 1, createdAt: -1 });
scanSchema.index({ status: 1 });

module.exports = mongoose.model('Scan', scanSchema);
