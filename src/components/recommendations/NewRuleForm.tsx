
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RuleDefinition } from '../../types/recommendation';
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
import { ruleConditions, timeWindows, actionTypes } from '../../data/mockData';

interface NewRuleFormProps {
  onSave: (rule: RuleDefinition) => void;
  onCancel: () => void;
}

// Create a schema for form validation
const ruleSchema = z.object({
  name: z.string().min(3, { message: 'Rule name must be at least 3 characters' }),
  condition: z.string({
    required_error: 'Please select a trigger condition',
  }),
  timeWindow: z.string({
    required_error: 'Please select a time window',
  }),
  suggestedAction: z.string({
    required_error: 'Please select a suggested action',
  }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  isActive: z.boolean().default(true),
});

const NewRuleForm: React.FC<NewRuleFormProps> = ({ onSave, onCancel }) => {
  const form = useForm<z.infer<typeof ruleSchema>>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: '',
      condition: '',
      timeWindow: '',
      suggestedAction: '',
      description: '',
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
