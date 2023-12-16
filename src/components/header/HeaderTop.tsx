import { ActionIcon, Container, Flex, Indicator } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import UserButton from '../button/UserButton';
import './style.scss';
import classes from './header.module.css';

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
                classNames={{ root: classes.iconAction }}
                size='lg'
                variant='filled'
                radius='xl'
                aria-label='Settings'
              >
                <IconBell className={classes.icon} />
              </ActionIcon>
            </Indicator>

            <UserButton />
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default HeaderTop;
