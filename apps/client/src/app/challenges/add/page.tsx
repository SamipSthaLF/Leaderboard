'use client';
import { ChallengesForm } from '@/components/challenges/form';
import { ChallengeFormValues } from '@/types/challenges';
import { Anchor, Box, Breadcrumbs, Divider, Title } from '@mantine/core';

const items = [
  { title: 'Challenges', href: '/challenges' },
  { title: 'Add Challenge', href: '#' }
];

const AddChallenge = () => {
  const handleAddSubmit = async (values: ChallengeFormValues) => {
    console.log(values, 'add submit values');
    // TODO POST 
    // If success navigate to /challenge
  };

  return (
    <>
      <Box component="section" p="2em" w={'100%'} mx="auto">
        <Breadcrumbs>
          {items.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
        <Title style={{ margin: '1rem 0' }}>Add Challenges</Title>
        <Divider my="lg" />
        <ChallengesForm handleSubmit={handleAddSubmit} mode="add" />
      </Box>
    </>
  );
};
export default AddChallenge;
