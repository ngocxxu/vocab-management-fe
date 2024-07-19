import IconBook from '@/assets/svg/IconBook'
import IconChatGPT from '@/assets/svg/IconChatGPT'
import IconExam from '@/assets/svg/IconExam'
import IconGlobal from '@/assets/svg/IconGlobal'
import IconHome from '@/assets/svg/IconHome'
import IconPhone from '@/assets/svg/IconPhone'
import IconSetting from '@/assets/svg/IconSetting'

export const menuList = [
  {
    title: 'MENU',
    list: [
      {
        icon: IconHome,
        label: 'Dashboard',
        link: '/'
      },
      {
        icon: IconBook,
        label: 'Vocab List',
        link: '/vocab'
      },
      {
        icon: IconExam,
        label: 'Vocab Trainer',
        link: '/vocab-trainer'
      },
      {
        icon: IconChatGPT,
        label: 'Chatting with AI',
        link: '/ai-chat'
      },
      {
        icon: IconGlobal,
        label: 'Community',
        link: '/community'
      }
    ]
  },
  {
    title: 'SUPPORT',
    list: [
      {
        icon: IconSetting,
        label: 'Settings',
        link: '/settings'
      },
      {
        icon: IconPhone,
        label: 'Help & Support',
        link: '/help-support'
      }
    ]
  }
]
