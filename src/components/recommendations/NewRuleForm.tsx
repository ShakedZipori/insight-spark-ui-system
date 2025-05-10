
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RuleDefinition, TeamType, WalletType, RuleType } from '../../types/recommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { ruleConditions, timeWindows, actionTypes } from '../../data/mockData';

interface NewRuleFormProps {
  onSave: (rule: RuleDefinition) => void;
  onCancel: () => void;
}

// Teams and wallets arrays
const teams: TeamType[] = ['DevOps', 'Infrastructure', 'Security', 'Data', 'All Teams'];
const wallets: WalletType[] = ['Production', 'Development', 'Testing', 'Shared Services'];

// Create a schema for form validation
const ruleSchema = z.object({
  name: z.string().min(3, { message: 'Rule name must be at least 3 characters' }),
  ruleType: z.enum(['Rule-based', 'AI-based']),
  condition: z.string({
    required_error: 'Please select a trigger condition',
  }),
  conditionDetails: z.string().optional(),
  timeWindow: z.string({
    required_error: 'Please select a time window',
  }),
  suggestedAction: z.string({
    required_error: 'Please select a suggested action',
  }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  targetTeam: z.string().optional(),
  targetWallet: z.string().optional(),
  isActive: z.boolean().default(true),
});

const NewRuleForm: React.FC<NewRuleFormProps> = ({ onSave, onCancel }) => {
  const form = useForm<z.infer<typeof ruleSchema>>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: '',
      ruleType: 'Rule-based',
      condition: '',
      conditionDetails: '',
      timeWindow: '',
      suggestedAction: '',
      description: '',
      targetTeam: undefined,
      targetWallet: undefined,
      isActive: true,
    },
  });

  const onSubmit = (data: z.infer<typeof ruleSchema>) => {
    onSave(data as RuleDefinition);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Rule Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter rule name" {...field} />
              </FormControl>
              <FormDescription>
                Give your rule a descriptive name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rule Type Selection */}
        <FormField
          control={form.control}
          name="ruleType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Rule Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Rule-based" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Rule-based
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="AI-based" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      AI-based
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Select whether this rule is based on fixed conditions or AI analysis
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trigger Condition */}
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trigger Condition</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ruleConditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Condition that will trigger this recommendation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Condition Details */}
        <FormField
          control={form.control}
          name="conditionDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition Details</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 90% for threshold, instances to check, etc."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Additional parameters for the trigger condition (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time Window */}
        <FormField
          control={form.control}
          name="timeWindow"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Window</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time window" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeWindows.map((window) => (
                    <SelectItem key={window} value={window}>
                      {window}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Duration over which the condition must be true
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Team */}
        <FormField
          control={form.control}
          name="targetTeam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Team</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target team (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Team that will receive this recommendation (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Wallet */}
        <FormField
          control={form.control}
          name="targetWallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Wallet</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target wallet (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {wallets.map((wallet) => (
                    <SelectItem key={wallet} value={wallet}>
                      {wallet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Wallet that this recommendation applies to (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Suggested Action */}
        <FormField
          control={form.control}
          name="suggestedAction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suggested Action</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an action" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {actionTypes.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Action to recommend when this rule triggers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a detailed description of this rule"
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain what this rule detects and why it's important
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active/Inactive Toggle */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Rule Status</FormLabel>
                <FormDescription>
                  Enable or disable this rule
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Rule</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewRuleForm;
