'use client';

import { ChallengesForm } from '@/components/challenges/form';
import { ChallengeFormValues } from '@/types/challenges';
import { Anchor, Box, Breadcrumbs, Divider, Title } from '@mantine/core';

const items = [
  { title: 'Challenges', href: '/challenges' },
  { title: 'Edit Challenge', href: '#' }
];
const EditChallenge = () => {
  const handleEditSubmit = async (values: ChallengeFormValues) => {
    console.log('values', values);
    // TODO PUT
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
        <Title style={{ margin: '1rem 0' }}>Edit Challenges</Title>
        <Divider my="lg" />
        <ChallengesForm
          mode="edit"
          initialValue={{ challengeScore: 1, challengeTitle: 'Take interview', description: 'Please take interview' }}
          handleSubmit={handleEditSubmit}
        />
      </Box>
    </>
  );
};
export default EditChallenge;
