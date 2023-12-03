import { ActionIcon, Avatar, Container, Flex, Indicator } from '@mantine/core';
import { IconBell, IconSettings } from '@tabler/icons-react';
import './style.scss';

const HeaderTop = () => {
  return (
    <div className='header-top'>
      <Container size='xl'>
        <Flex
          className='header-top-inner'
          justify='space-between'
          align='center'
        >
          <p className='header-top-inner-title'>VOCAB</p>
          <Flex gap={20} justify='center' align='center'>
            <Indicator label='5' size={15} offset={7} color='red'>
              <ActionIcon
                size='lg'
                variant='filled'
                radius='xl'
                aria-label='Settings'
              >
                <IconBell
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Indicator>

            <Avatar color='grape' radius='xl'>
              MK
            </Avatar>

            <ActionIcon
              size='lg'
              variant='filled'
              radius='xl'
              aria-label='Settings'
            >
              <IconSettings
                style={{ width: '70%', height: '70%' }}
                stroke={1.5}
              />
            </ActionIcon>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default HeaderTop;
