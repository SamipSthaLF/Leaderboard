'use client';

import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Flex, NumberInput, Paper, Textarea, TextInput } from '@mantine/core';

const schema = z.object({
  challengeScore: z.number().min(1, {
    message: 'Please enter a valid score'
  }),
  challengeTitle: z.string().min(2, {
    message: 'Please enter a valid title'
  }),
  description: z.string().min(10, {
    message: 'Please enter a valid description that is clear'
  })
});

export interface Challenge {
  challengeScore: number;
  challengeTitle: string;
  description: string;
}

const ChallengesForm = () => {
  const form = useForm<Challenge>({
    initialValues: {
      challengeScore: NaN,
      challengeTitle: '',
      description: ''
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    name: 'challenge'
  });

  const handleSubmit = async (values: Challenge) => {
    form.validate();
    // TODO: handle submit
    try {
      console.log('submit', values);
      form.reset();
    } catch (error) {
      // Error handling
    }
  };

  return (
    <Paper withBorder radius={'8px'} shadow="md" p="1.5rem">
      <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.reset}>
        <Flex direction="column" gap={'1rem'}>
          <Flex direction="row" justify="space-between" gap="1em">
            <TextInput
              radius={'6px'}
              w={'100%'}
              label="Challenge Title"
              placeholder="Enter title"
              {...form.getInputProps('challengeTitle')}
            />
            <NumberInput
              radius={'6px'}
              hideControls
              w={'100%'}
              label="Challenge Score"
              placeholder="Enter challenge score"
              {...form.getInputProps('challengeScore')}
            />
          </Flex>
          <Textarea
            radius={'6px'}
            label="Description"
            placeholder="Type your description..."
            {...form.getInputProps('description')}
          />
          <Flex direction="row" gap={'1.5rem'} justify="flex-end" align="center">
            <Button type="reset" radius={'6px'} variant="outline" c="cascade-blue.9">
              Cancel
            </Button>
            <Button type="submit" radius={'6px'} variant="filled">
              Add Challenge
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
};

export default ChallengesForm;
