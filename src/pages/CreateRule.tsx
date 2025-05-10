
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { RuleDefinition } from '../types/recommendation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewRuleForm from '../components/recommendations/NewRuleForm';

const CreateRule: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveRule = (rule: RuleDefinition) => {
    // In a real application, this would save the rule to the backend
    console.log('New rule:', rule);
    
    toast({
      title: "Rule Created",
      description: `Rule "${rule.name}" has been created successfully.`,
    });
    
    // Redirect back to dashboard
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-6">
            Define a new rule that will automatically generate recommendations when conditions are met.
          </p>
          <NewRuleForm
            onSave={handleSaveRule}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRule;
