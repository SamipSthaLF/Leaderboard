import { Box } from '@mantine/core';

type ContainerProps = React.ComponentProps<typeof Box>;

export function Container(props: Readonly<ContainerProps>) {
  return <Box maw="1056px" mx="auto" {...props} />;
}
