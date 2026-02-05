const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a project name'],
      trim: true,
      maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    tools: {
      type: [String],
      required: [true, 'Please add at least one tool/technology'],
    },
    role: {
      type: String,
      required: [true, 'Please add your role in the project'],
    },
    code: {
      type: String,
      required: false,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\//.test(v);
        },
        message: 'Code URL must be a valid HTTP(S) URL',
      },
    },
    demo: {
      type: String,
      required: false,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\//.test(v);
        },
        message: 'Demo URL must be a valid HTTP(S) URL',
      },
    },
    image: {
      type: String,
      required: [true, 'Please add a project image'],
      validate: {
        validator: function(v) {
          return /^https?:\/\//.test(v);
        },
        message: 'Image URL must be a valid HTTP(S) URL',
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'draft'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Index for sorting and filtering
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ status: 1 });

module.exports = mongoose.model('Project', projectSchema);
