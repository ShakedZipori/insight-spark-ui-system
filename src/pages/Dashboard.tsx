
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Recommendation, TeamType } from '../types/recommendation';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import FilterBar from '../components/recommendations/FilterBar';
import RecommendationDetail from '../components/recommendations/RecommendationDetail';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { mockRecommendations, getFilteredRecommendations } from '../data/mockData';

// Mock user data - in a real app this would come from an auth context
const currentUser = {
  id: 'user-1',
  name: 'John Doe',
  team: 'DevOps' as TeamType, // User's team
  isAdmin: true // Set to true so everyone can create rules
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    sourceType: 'All',
    urgency: 'All',
    startDate: null as Date | null,
    endDate: null as Date | null,
    team: 'All',
    wallet: 'All',
  });

  // Filter recommendations when filters change
  useEffect(() => {
    const filtered = getFilteredRecommendations(recommendations, filters);
    setFilteredRecommendations(filtered);
  }, [recommendations, filters]);

  // Handle filter changes
  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      sourceType: 'All',
      urgency: 'All',
      startDate: null,
      endDate: null,
      team: 'All',
      wallet: 'All',
    });
  };

  // Handle card click to show detail view
  const handleCardClick = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
    setIsDetailOpen(true);
  };

  // Close detail view
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  // Handle Apply action
  const handleApplyRecommendation = (id: string) => {
    toast({
      title: "Recommendation Applied",
      description: "The recommended action has been initiated.",
    });
    
    // Update recommendation status
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, status: 'Resolved' as const } : rec
      )
    );
    
    setIsDetailOpen(false);
  };

  // Handle Dismiss action
  const handleDismissRecommendation = (id: string) => {
    toast({
      title: "Recommendation Dismissed",
      description: "The recommendation has been ignored.",
    });
    
    // Update recommendation status
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, status: 'Ignored' as const } : rec
      )
    );
    
    setIsDetailOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your System Recommendations</h1>
        <Button onClick={() => navigate('/new-rule')}>
          <Plus className="mr-2 h-4 w-4" /> Create Rule
        </Button>
      </div>
      
      <FilterBar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onResetFilters={resetFilters} 
      />
      
      {filteredRecommendations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recommendations match your filters.</p>
          <Button variant="link" onClick={resetFilters} className="mt-2">
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
      
      {/* Recommendation Detail Modal */}
      <RecommendationDetail
        recommendation={selectedRecommendation}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onApply={handleApplyRecommendation}
        onDismiss={handleDismissRecommendation}
      />
    </div>
  );
};

export default Dashboard;
