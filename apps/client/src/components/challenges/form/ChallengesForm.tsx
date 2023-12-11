'use client';

import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Flex, NumberInput, Paper, Textarea, TextInput } from '@mantine/core';
import { ChallengeFormValues } from '@/types/challenges';

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

type AddForm = {
  mode: 'add';
};

type EditForm = {
  mode: 'edit';
  initialValue: ChallengeFormValues;
};

type ChallengeFormProp = (AddForm | EditForm) & {
  handleSubmit: (values: ChallengeFormValues) => void;
};

const defaultInitialValues: ChallengeFormValues = {
  challengeScore: NaN,
  challengeTitle: '',
  description: ''
};

export const ChallengesForm = (props: ChallengeFormProp) => {
  const { mode, handleSubmit } = props;

  const form = useForm<ChallengeFormValues>({
    initialValues: mode === 'edit' ? props.initialValue : defaultInitialValues,
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    name: 'challenge'
  });
  
  const onSubmit = async (values: ChallengeFormValues) => {
    form.validate();

    // other checks if any
    handleSubmit(values);
    form.reset();
  };

  return (
    <Paper withBorder radius={'8px'} shadow="md" p="1.5rem">
      <form onSubmit={form.onSubmit(onSubmit)} onReset={form.reset}>
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
