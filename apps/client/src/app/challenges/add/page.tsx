import { Anchor, Box, Breadcrumbs, Divider, Title } from '@mantine/core';

import ChallengesForm from '@/components/form/ChallengesForm';

const items = [
  { title: 'Challenges', href: '/challenges' },
  { title: 'Add Challenge', href: '#' }
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const AddChallenge = () => {
  return (
    <>
      <Box component="section" p="2em" w={'100%'} mx="auto">
        <Breadcrumbs>{items}</Breadcrumbs>
        <Title style={{ margin: '1rem 0' }}>Add Challenges</Title>
        <Divider my="lg" />
        <ChallengesForm />
      </Box>
    </>
  );
};
export default AddChallenge;
