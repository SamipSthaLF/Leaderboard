'use client';

import { Anchor, Breadcrumbs, Divider, Title } from '@mantine/core';

import { ChallengeFormValues } from '@/types/challenges';

import { Container } from '@/components/common/Container';

import { ChallengesForm } from '@/components/challenges/form';
import { FormActionType } from '@/components/common/constants/formActionType.enum';

const items = [
  { title: 'Challenges', href: '/challenges' },
  { title: 'Add Challenge', href: '#' }
];

const AddChallenge = () => {
  const handleAddSubmit = async (values: ChallengeFormValues) => {
    return;
  };

  return (
    <Container p="2xl">
      <Breadcrumbs>
        {items.map((item, index) => (
          <Anchor href={item.href} key={index}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Title my="md">Add Challenges</Title>
      <Divider my="lg" />
      <ChallengesForm handleSubmit={handleAddSubmit} mode={FormActionType.ADD} />
    </Container>
  );
};
export default AddChallenge;
