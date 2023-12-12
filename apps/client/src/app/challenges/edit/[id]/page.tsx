'use client';

import { Anchor, Breadcrumbs, Divider, Title } from '@mantine/core';

import { ChallengeFormValues } from '@/types/challenges';

import { Container } from '@/components/common/Container';

import { ChallengesForm } from '@/components/challenges/form';
import { FormActionType } from '@/components/common/constants/formActionType.enum';

const items = [
  { title: 'Challenges', href: '/challenges' },
  { title: 'Edit Challenge', href: '#' }
];
const EditChallenge = () => {
  const handleEditSubmit = async (values: ChallengeFormValues) => {
    return;
  };

  return (
    <Container p="2xl" w={'100%'}>
      <Breadcrumbs>
        {items.map((item, index) => (
          <Anchor href={item.href} key={index}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Title my="md">Edit Challenges</Title>
      <Divider my="lg" />
      <ChallengesForm
        mode={FormActionType.EDIT}
        initialValue={{ challengeScore: 1, challengeTitle: 'Take interview', description: 'Please take interview' }}
        handleSubmit={handleEditSubmit}
      />
    </Container>
  );
};

export default EditChallenge;
