import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  baseURL: { 
    type: String, 
    required: true,
    // validate: {
    //   validator: function(v) {
    //     return /^http?:\/\/.+\..+/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid URL!`
    // }
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  monitoringConfig: {
    trackErrors: { 
      type: Boolean, 
      default: true 
    },
    trackLatency: { 
      type: Boolean, 
      default: true 
    },
    sampleRate: { 
      type: Number, 
      default: 1.0, 
      min: 0.1, 
      max: 1.0 
    },
    alertThresholds: {
      errorRate: { 
        type: Number, 
        default: 5 
      }, // percentage
      slowResponse: { 
        type: Number, 
        default: 1000 
      } // ms
    },
    excludeRoutes: {
      type: [String],
      default: [],
      set: function(routes) {
        // Convert string to array if needed
        return Array.isArray(routes) ? 
          routes : 
          routes.split(',').map(r => r.trim()).filter(r => r);
      }
    },
    excludePatterns: {
      type: [String],
      default: [],
      set: function(patterns) {
        // Convert string to array if needed
        return Array.isArray(patterns) ? 
          patterns : 
          patterns.split(',').map(p => p.trim()).filter(p => p);
      },
      validate: {
        validator: function(patterns) {
          // Validate each pattern is a valid regex
          return patterns.every(p => {
            try {
              new RegExp(p);
              return true;
            } catch (e) {
              return false;
            }
          });
        },
        message: props => `${props.value} contains invalid regex patterns!`
      }
    }
  }
});

// Index for faster queries
ProjectSchema.index({ user: 1, createdAt: -1 });
ProjectSchema.index({ baseURL: 1 });

export default mongoose.model('Project', ProjectSchema);