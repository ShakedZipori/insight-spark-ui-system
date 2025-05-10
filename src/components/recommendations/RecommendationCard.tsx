
import React from 'react';
import { Recommendation } from '../../types/recommendation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Check } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick: (recommendation: Recommendation) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, onClick }) => {
  // Helper function to determine urgency class
  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'urgency-critical';
      case 'medium':
        return 'urgency-medium';
      default:
        return 'urgency-low';
    }
  };

  // Helper function to determine source class
  const getSourceClass = (source: string) => {
    return source.includes('AI') ? 'source-ai' : 'source-rule';
  };

  // Helper function to get tag class
  const getTagClass = (index: number) => {
    const classes = ['tag-blue', 'tag-green', 'tag-purple', 'tag-orange'];
    return classes[index % classes.length];
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300"
      onClick={() => onClick(recommendation)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
        <span className={`urgency-badge ${getUrgencyClass(recommendation.urgency)}`}>
          {recommendation.urgency.charAt(0).toUpperCase() + recommendation.urgency.slice(1)}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recommendation.description}</p>
      
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <Calendar className="mr-1 h-3 w-3" />
        <span>{recommendation.timestamp.toLocaleDateString()}</span>
        <span className={`source-badge ml-3 ${getSourceClass(recommendation.source)}`}>
          {recommendation.source}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {recommendation.tags.map((tag, index) => (
          <span key={index} className={`tag ${getTagClass(index)}`}>{tag}</span>
        ))}
      </div>
      
      <div className="flex space-x-2 mt-auto">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onClick(recommendation);
          }}
        >
          View Details
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Save for later:', recommendation.id);
          }}
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
