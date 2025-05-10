
import React from 'react';
import { Calendar as CalendarIcon, Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { 
  sourceTypeOptions, 
  urgencyOptions, 
  teamOptions, 
  walletOptions 
} from '../../data/mockData';

interface FilterBarProps {
  filters: {
    search: string;
    sourceType: string;
    urgency: string;
    startDate: Date | null;
    endDate: Date | null;
    team: string;
    wallet: string;
  };
  onFilterChange: (name: string, value: any) => void;
  onResetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onResetFilters }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange('search', event.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search recommendations..."
            className="pl-10 w-full"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <Button 
          variant="outline" 
          onClick={onResetFilters}
          className="whitespace-nowrap"
        >
          <X className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Recommendation Type */}
        <Select
          value={filters.sourceType}
          onValueChange={(value) => onFilterChange('sourceType', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Source Type" />
          </SelectTrigger>
          <SelectContent>
            {sourceTypeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === 'All' ? 'All Source Types' : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Urgency */}
        <Select
          value={filters.urgency}
          onValueChange={(value) => onFilterChange('urgency', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            {urgencyOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === 'All' ? 'All Urgency Levels' : option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Team */}
        <Select
          value={filters.team}
          onValueChange={(value) => onFilterChange('team', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Team" />
          </SelectTrigger>
          <SelectContent>
            {teamOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === 'All' ? 'All Teams' : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Wallet */}
        <Select
          value={filters.wallet}
          onValueChange={(value) => onFilterChange('wallet', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wallet" />
          </SelectTrigger>
          <SelectContent>
            {walletOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option === 'All' ? 'All Wallets' : option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Start Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal text-gray-500 w-full"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.startDate ? format(filters.startDate, 'PPP') : 'Start Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.startDate || undefined}
              onSelect={(date) => onFilterChange('startDate', date)}
              initialFocus
              disabled={(date) => filters.endDate ? date > filters.endDate : false}
            />
          </PopoverContent>
        </Popover>

        {/* End Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal text-gray-500 w-full"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.endDate ? format(filters.endDate, 'PPP') : 'End Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.endDate || undefined}
              onSelect={(date) => onFilterChange('endDate', date)}
              initialFocus
              disabled={(date) => filters.startDate ? date < filters.startDate : false}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FilterBar;
