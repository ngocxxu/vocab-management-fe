import { Box, Burger, Container, Flex, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHistory,
  IconHome,
  IconMedal2,
  IconVocabulary,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import classes from './header.module.css';

const links = [
  { link: '/dashboard', label: 'Dashboard', icon: IconHome },
  {
    link: '/vocab',
    label: 'Vocabulary',
    icon: IconVocabulary,
    // links: [
    //   { link: '/docs', label: 'Documentation' },
    //   { link: '/resources', label: 'Resources' },
    //   { link: '/community', label: 'Community' },
    //   { link: '/blog', label: 'Blog' },
    // ],
  },
  { link: '/vocab-trainer', label: 'Vocab Trainer', icon: IconMedal2 },
  { link: '/history', label: 'History', icon: IconHistory },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const items = links.map((link) => {
    // const menuItems = link.links?.map((item) => (
    //   <Menu.Item key={item.link}>{item.label}</Menu.Item>
    // ));

    // if (menuItems) {
    //   return (
    //     <Menu
    //       key={link.label}
    //       trigger='hover'
    //       transitionProps={{ exitDuration: 0 }}
    //       withinPortal
    //     >
    //       <Menu.Target>
    //         <a
    //           href={link.link}
    //           className={classes.link}
    //           onClick={(event) => event.preventDefault()}
    //         >
    //           <Center>
    //             <span className={classes.linkLabel}>{link.label}</span>
    //             <IconChevronDown size='0.9rem' stroke={1.5} />
    //           </Center>
    //         </a>
    //       </Menu.Target>
    //       <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    //     </Menu>
    //   );
    // }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => {
          event.preventDefault();
          navigate(`${link.link}`);
        }}
      >
        <Flex align='center' justify='center' gap='xs'>
          <link.icon size={18} />
          {link.label}
        </Flex>
      </a>
    );
  });

  return (
    <Box mr='xl'>
      <Container size='xl'>
        <div className={classes.inner}>
          <Group gap={15} visibleFrom='sm'>
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
        </div>
      </Container>
    </Box>
  );
}
