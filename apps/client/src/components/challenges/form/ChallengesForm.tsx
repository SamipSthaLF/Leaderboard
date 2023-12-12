'use client';

import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { useForm, zodResolver } from '@mantine/form';

import { Button, Flex, NumberInput, Paper, Textarea, TextInput } from '@mantine/core';

import { ChallengeFormProp } from '@/types/formTypes';
import { ChallengeFormValues } from '@/types/challenges';

import { FormActionType } from '@/components/common/constants/formActionType.enum';

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

const defaultInitialValues: ChallengeFormValues = {
  challengeScore: NaN,
  challengeTitle: '',
  description: ''
};

export const ChallengesForm = (props: ChallengeFormProp) => {
  const router = useRouter();

  const { mode, handleSubmit } = props;

  const form = useForm<ChallengeFormValues>({
    initialValues: mode === FormActionType.EDIT ? props.initialValue : defaultInitialValues,
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    name: 'challenge'
  });

  const onSubmit = async (values: ChallengeFormValues) => {
    form.validate();

    handleSubmit(values);

    router.push('/challenges');
  };

  return (
    <Paper withBorder radius="sm" shadow="md" p="lg">
      <form onSubmit={form.onSubmit(onSubmit)} onReset={form.reset}>
        <Flex direction="column" gap="lg">
          <Flex direction="row" justify="space-between" gap="lg">
            <TextInput
              radius="sm"
              w={'75%'}
              label="Challenge Title"
              placeholder="Enter title"
              {...form.getInputProps('challengeTitle')}
            />
            <NumberInput
              radius="sm"
              hideControls
              w={'25%'}
              label="Challenge Score"
              placeholder="Enter challenge score"
              {...form.getInputProps('challengeScore')}
            />
          </Flex>
          <Textarea
            radius="sm"
            label="Description"
            placeholder="Type your description..."
            {...form.getInputProps('description')}
          />
          <Flex direction="row" gap="lg" justify="flex-end" align="center">
            <Button
              type="reset"
              onClick={() => router.push('/challenges')}
              radius="sm"
              variant="outline"
              c="cascade-blue.9"
            >
              Cancel
            </Button>
            <Button type="submit" radius="sm" variant="filled">
              {mode === FormActionType.ADD ? 'Add' : 'Save'} Challenge
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
};
