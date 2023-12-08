'use client';

import { Button, Flex, NumberInput, Paper, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const ChallengesForm = () => {
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
  const form = useForm({
    initialValues: {
      challengeScore: '',
      challengeTitle: '',
      description: ''
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true
  });

  const handleSubmit = async (values: any) => {
    form.validate();
    console.log('submit', values);
    form.setInitialValues({
      challengeScore: '',
      challengeTitle: '',
      description: ''
    });
  };
  return (
    <Paper withBorder radius={'8px'} shadow="md" p="1.5rem">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap={'1rem'}>
          <Flex direction="row" justify="space-between" gap="1em">
            <NumberInput
              radius={'6px'}
              hideControls
              w={'100%'}
              label="Challenge Score"
              placeholder="Enter challenge score"
              {...form.getInputProps('challengeScore')}
            />
            <TextInput
              radius={'6px'}
              w={'100%'}
              label="Challenge Title"
              placeholder="Enter title"
              {...form.getInputProps('challengeTitle')}
            />
          </Flex>
          <Textarea
            radius={'6px'}
            label="Description"
            placeholder="Type your description..."
            {...form.getInputProps('description')}
          />
          <Flex direction="row" gap={'1.5rem'} justify="flex-end" align="center">
            <Button type="button" radius={'6px'} variant="outline" c="cascade-blue.9">
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
