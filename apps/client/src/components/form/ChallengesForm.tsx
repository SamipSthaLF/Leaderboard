'use client';

import { Button, Flex, Paper, Select, Textarea, TextInput, ComboboxItem } from '@mantine/core';
import { useForm } from '@mantine/form';

const options: ComboboxItem[] = [
  {
    label: 'Public',
    value: 'public'
  },
  {
    label: 'Private',
    value: 'private'
  }
];

const handleSubmit = async (values: any) => {
  console.log('submit', values);
};
const ChallengesForm = () => {
  const form = useForm({});

  return (
    <Paper withBorder radius={'8px'} shadow="md" p="1.5rem">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap={'1rem'}>
          <Flex direction="row" justify="space-between" gap="1em">
            <TextInput
              radius={'6px'}
              w={'100%'}
              label="Challenge Score"
              placeholder="Enter challenge score"
              {...form.getInputProps('challengeScore')}
            />
            <Select
              // styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
              radius={'6px'}
              w={'100%'}
              label="Privacy"
              data={options}
              {...form.getInputProps('privacy')}
            />
          </Flex>
          <TextInput
            radius={'6px'}
            label="Challenge Title"
            placeholder="Enter title"
            {...form.getInputProps('challengeTitle')}
          />
          <Textarea
            radius={'6px'}
            label="Description"
            placeholder="Type your description..."
            {...form.getInputProps('description')}
          />
          <Flex direction="row" gap={'1.5rem'} justify="flex-end" align="center">
            {/* TODO add colors from theme */}
            <Button type="button" radius={'6px'} variant="outline" color={'#102B7B'}>
              Cancel
            </Button>
            <Button type="submit" radius={'6px'} variant="filled" color={'#102B7B'}>
              Add Challenge
            </Button>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
};

export default ChallengesForm;
