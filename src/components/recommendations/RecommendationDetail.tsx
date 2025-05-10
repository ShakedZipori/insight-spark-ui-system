
import React from 'react';
import { Recommendation } from '../../types/recommendation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Check, X } from 'lucide-react';

interface RecommendationDetailProps {
  recommendation: Recommendation | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (id: string) => void;
  onDismiss: (id: string) => void;
}

const RecommendationDetail: React.FC<RecommendationDetailProps> = ({
  recommendation,
  isOpen,
  onClose,
  onApply,
  onDismiss
}) => {
  if (!recommendation) return null;

  // Helper function to determine status badge color
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Ignored':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-semibold">{recommendation.title}</DialogTitle>
            <span className={`urgency-badge ${
              recommendation.urgency === 'critical' ? 'urgency-critical' :
              recommendation.urgency === 'medium' ? 'urgency-medium' :
              'urgency-low'
            }`}>
              {recommendation.urgency.charAt(0).toUpperCase() + recommendation.urgency.slice(1)}
            </span>
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
            <p className="text-gray-800">{recommendation.detailedDescription || recommendation.description}</p>
          </div>
          
          {/* Suggested Action */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Suggested Action</h3>
            <p className="text-gray-800 font-medium">{recommendation.suggestedAction}</p>
          </div>
          
          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Source */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Source</h3>
              <p className="text-gray-800">{recommendation.sourceDetails || recommendation.source}</p>
            </div>
            
            {/* Time Generated */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Time Generated</h3>
              <p className="text-gray-800">{recommendation.timestamp.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Tags Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Contextual Tags</h3>
            <div className="flex flex-wrap gap-2">
              {recommendation.region && (
                <Badge variant="outline" className="bg-gray-50">Region: {recommendation.region}</Badge>
              )}
              {recommendation.category && (
                <Badge variant="outline" className="bg-gray-50">Category: {recommendation.category}</Badge>
              )}
              {recommendation.team && (
                <Badge variant="outline" className="bg-gray-50">Team: {recommendation.team}</Badge>
              )}
              {recommendation.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">{tag}</Badge>
              ))}
            </div>
          </div>
          
          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium border ${getStatusClass(recommendation.status)}`}>
              {recommendation.status}
            </span>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onDismiss(recommendation.id)}>
            <X className="mr-2 h-4 w-4" /> Dismiss
          </Button>
          <Button onClick={() => onApply(recommendation.id)}>
            <Check className="mr-2 h-4 w-4" /> Apply Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDetail;
