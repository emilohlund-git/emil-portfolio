import { Button, Container, Group, Text, Title } from '@mantine/core';

type Props = {};

const index = (props: Props) => {
  return (
    <Container className={`py-40`}>
      <div className={`relative`}>
        <div className={`absolute top-0 right-0 left-0 z-0 opacity-75`}></div>
        <div className={`p-52 relative z-1`}>
          <Title className={`text-center font-bold text-4xl`}>Nothing to see here</Title>
          <Text
            color='dimmed'
            size='lg'
            align='center'
            className={`max-w-xl m-auto mt-8 mb-6`}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position='center'>
            <Button className="bg-blue-400" size='md'>Take me back to home page</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default index;
