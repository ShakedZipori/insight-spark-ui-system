
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Recommendation } from '../types/recommendation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Check, X } from 'lucide-react';
import { mockRecommendations } from '../data/mockData';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  // Fetch recommendation data
  useEffect(() => {
    if (id) {
      const found = mockRecommendations.find(rec => rec.id === id);
      if (found) {
        setRecommendation(found);
      } else {
        // Recommendation not found, navigate back to dashboard
        toast({
          title: "Error",
          description: "Recommendation not found",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [id, navigate, toast]);

  if (!recommendation) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

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

  // Helper function to determine urgency class
  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Handle Apply action
  const handleApplyRecommendation = () => {
    toast({
      title: "Recommendation Applied",
      description: "The recommended action has been initiated.",
    });
    navigate('/');
  };

  // Handle Dismiss action
  const handleDismissRecommendation = () => {
    toast({
      title: "Recommendation Dismissed",
      description: "The recommendation has been ignored.",
    });
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <Card className="shadow-md border-0">
        <CardContent className="p-8">
          <div className="flex flex-wrap justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0 md:mr-4 flex-grow">
              {recommendation.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium border ${getUrgencyClass(recommendation.urgency)}`}>
                {recommendation.urgency.charAt(0).toUpperCase() + recommendation.urgency.slice(1)} Priority
              </span>
              
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium border ${getStatusClass(recommendation.status)}`}>
                Status: {recommendation.status}
              </span>
            </div>
          </div>
          
          {/* Description Section */}
          <section className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {recommendation.detailedDescription || recommendation.description}
            </p>
          </section>
          
          {/* Suggested Action Section */}
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Suggested Action</h2>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
              {recommendation.suggestedAction}
            </div>
          </section>
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Time Generated */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Time Generated</h3>
              <p className="text-gray-900">{recommendation.timestamp.toLocaleString()}</p>
            </div>
            
            {/* Source */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Recommendation Source</h3>
              <p className="text-gray-900">{recommendation.sourceDetails || recommendation.source}</p>
            </div>
            
            {/* Team */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Team</h3>
              <p className="text-gray-900">{recommendation.team || 'Unassigned'}</p>
            </div>
            
            {/* Wallet */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Wallet</h3>
              <p className="text-gray-900">{recommendation.wallet || 'Unspecified'}</p>
            </div>
          </div>
          
          {/* Contextual Tags */}
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Contextual Tags</h2>
            <div className="flex flex-wrap gap-2">
              {recommendation.region && (
                <Badge variant="outline" className="bg-gray-50">Region: {recommendation.region}</Badge>
              )}
              {recommendation.category && (
                <Badge variant="outline" className="bg-gray-50">Category: {recommendation.category}</Badge>
              )}
              {recommendation.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">{tag}</Badge>
              ))}
            </div>
          </section>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleDismissRecommendation}
              className="sm:order-1"
            >
              <X className="mr-2 h-4 w-4" /> Dismiss
            </Button>
            <Button 
              size="lg" 
              onClick={handleApplyRecommendation}
              className="sm:order-2"
            >
              <Check className="mr-2 h-4 w-4" /> Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailView;
