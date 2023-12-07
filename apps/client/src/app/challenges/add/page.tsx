import ChallengesForm from '@/components/form/ChallengesForm';
import { Anchor, Box, Breadcrumbs, Divider, Title } from '@mantine/core';

const items = [
  { title: 'Challenges', href: '/challenges' },
  { title: 'Add Challenge', href: '#' }
].map((item, index) => (
  <Anchor
    href={item.href}
    key={index}
    style={{
      fontWeight: '600'
    }}
  >
    {item.title}
  </Anchor>
));

const AddChallenge = () => {
  return (
    <>
      <Box component="section" p="2em" w={'60%'} mx="auto">
        <Breadcrumbs>{items}</Breadcrumbs>
        <Title style={{ margin: '1rem 0' }}>Add Challenges</Title>
        <Divider my="lg" />
        <ChallengesForm />
      </Box>
    </>
  );
};
export default AddChallenge;
