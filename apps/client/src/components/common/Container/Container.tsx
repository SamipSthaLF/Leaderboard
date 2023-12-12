import { Box, BoxComponentProps } from '@mantine/core';

interface ContainerProps extends BoxComponentProps {
  children?: React.ReactNode;
}

export function Container(props: Readonly<ContainerProps>) {
  return <Box maw="1056px" mx="auto" {...props} />;
}
