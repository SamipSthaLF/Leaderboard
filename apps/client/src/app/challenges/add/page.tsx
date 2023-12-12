'use client';

import { ChallengeFormValues } from '@/types/challenges';
import { Container } from '@/components/common/Container';
import { ChallengesForm } from '@/components/challenges/form';
import { Anchor, Breadcrumbs, Divider, Title } from '@mantine/core';

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
      <Container maw="1800px" p="2xl" w={'100%'}>
        <Breadcrumbs>
          {items.map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
        <Title my="md">Add Challenges</Title>
        <Divider my="lg" />
        <ChallengesForm handleSubmit={handleAddSubmit} mode="add" />
      </Container>
    </>
  );
};
export default AddChallenge;
