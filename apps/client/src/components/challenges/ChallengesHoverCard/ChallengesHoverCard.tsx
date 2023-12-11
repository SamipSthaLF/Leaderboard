import NextImage from 'next/image';
import { Box, Button, Flex, Image, List, ListItem, Text, Title } from '@mantine/core';

import { Challenge } from '@/types/challenges';

interface Props {
  challenge: Challenge;
}

export function ChallengesHoverCard({ challenge }: Readonly<Props>) {
  return (
    <Flex direction="column" gap="md" w="586" p="sm">
      <Title order={2} c="cascade-blue.9">
        {challenge.title}
      </Title>
      <Box component="figure">
        <Image
          src={challenge.coverImgSrc}
          alt="Hover Card Image"
          height="112"
          width="554"
          radius="md"
          component={NextImage}
        />
      </Box>
      <Box color="dark.9" fz="sm" lh="155%">
        <Box mb="2xl">
          <Text fw="bold">Background:</Text>
          <Text>
            In this task, your objective is to demonstrate your ability to effectively conduct an interview. As an
            interviewer, you play a critical role in identifying candidates with the right skills, aptitude, and
            cultural fit for our dynamic company.
          </Text>
        </Box>
        <List type="ordered" listStyleType="decimal" pr="lg" w="100%">
          <Text fw="bold">Requirements:</Text>
          <ListItem>
            <Text fw="600">Preparation:</Text>
            <Text>
              Prior to the interview, thoroughly review the candidate's resume and any other relevant materials.
              Familiarize yourself with the job description and the specific skills required for the software internship
              position.
            </Text>
          </ListItem>
          <ListItem>
            <Text fw="600">Technical Assessment:</Text>
            <Text>
              Design a set of technical questions that assess the candidate's programming knowledge, problem-solving
              skills, and understanding of relevant technologies. Be prepared to evaluate their approach to
              problem-solving and their ability to communicate their thought process.
            </Text>
          </ListItem>
          <ListItem>
            <Text fw="600">Behavioral Evaluation:</Text>
            <Text>
              Develop a series of behavioral questions to assess the candidate's interpersonal skills, teamwork, and
              adaptability. Explore their past experiences and accomplishments to gauge their potential contributions to
              our organization.
            </Text>
          </ListItem>
          <ListItem>
            <Text fw="600">Communication Skills:</Text>
            <Text>
              Pay attention to the candidate's communication skills, including their ability to articulate thoughts
              clearly and concisely. Assess how well they can explain technical concepts to a non-technical audience.
            </Text>
          </ListItem>
          <ListItem>
            <Text fw="600">Adaptability and Creativity:</Text>
            <Text>
              Include questions that assess the candidate's ability to adapt to new challenges and showcase their
              creativity in problem-solving. Look for candidates who demonstrate a willingness to learn and innovate.
            </Text>
          </ListItem>
          <ListItem>
            <Text fw="600">Evaluate Cultural Fit:</Text>
            <Text>
              Consider the values and culture of our company. Assess how well the candidate aligns with our mission,
              vision, and collaborative work environment.
            </Text>
          </ListItem>
        </List>
        <Button mt="xl" variant="filled" fullWidth>
          View More
        </Button>
      </Box>
    </Flex>
  );
}
