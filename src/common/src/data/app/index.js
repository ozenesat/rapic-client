import serviceIcon1 from '../../assets/image/app/services/1.png';
import serviceIcon2 from '../../assets/image/app/services/2.png';
import serviceIcon3 from '../../assets/image/app/services/3.png';
import serviceIcon4 from '../../assets/image/app/services/4.png';
import serviceIcon5 from '../../assets/image/app/services/5.png';
import serviceIcon6 from '../../assets/image/app/services/6.png';
import support1 from '../../assets/image/app/support1.png';
import support2 from '../../assets/image/app/support2.png';
import news1 from '../../assets/image/app/news/1.png';
import news2 from '../../assets/image/app/news/2.png';
import news3 from '../../assets/image/app/news/3.png';
import news4 from '../../assets/image/app/news/4.png';

export const data = {
  navItems: [
    {
      label: 'Features',
      path: '#features',
      offset: '70',
    },
    {
      label: 'Products',
      path: '#products',
      offset: '70',
    },
    /*{
      label: 'Pricing',
      path: '#pricing',
      offset: '70',
    },
    {
      label: 'Docs',
      path: '#docs',
      offset: '70',
    },*/
  ],
  services: [
    {
      id: 1,
      icon: serviceIcon2,
      title: 'Serverless Database',
      desc:
        'File management that allows you to upload or download files. Manage your users, send emails, text messages, and more with auto-scaling database,',
      // link: '#',
    },
    {
      id: 2,
      icon: serviceIcon1,
      title: 'Integrated Parties',
      desc:
        'You can intgrate listed third-party tools that allows you to either charge your customers, email them, and more messaging features. The tools are Zapier and Stripe(soon). ',
      // link: '#',
    },
    {
      id: 3,
      icon: serviceIcon4,
      title: 'API Endpoints',
      desc:
        "Pre-configured connection to endpoints provide you enabling the user's data to browser. Queries happen client-side, and there is nothing to manage or worry about.",
      // link: '#',
    },
    {
      id: 4,
      icon: serviceIcon5,
      title: 'HTTP Functions',
      desc:
        'Send a HTTP request to an API and use data in your function. Conditions, filters & checks. You can process the data and act accordingly.',
      // link: '#',
    },
    // {
    //   id: 5,
    //   icon: serviceIcon5,
    //   title: 'Customer Support',
    //   desc:
    //     'We’re driven beyond just finishing projects. We want to find smart solutions.',
    //   link: '#',
    // },
    // {
    //   id: 6,
    //   icon: serviceIcon6,
    //   title: 'Integrated with Shopify',
    //   desc:
    //     'We’re driven beyond just finishing projects. We want to find smart solutions.',
    //   link: '#',
    // },
  ],
  // workHardList: [
  //   { id: 1, title: 'Medical and vision' },
  //   { id: 2, title: 'Life insurance' },
  //   { id: 3, title: '400(k) savings' },
  //   { id: 4, title: 'HSAs and FSAs' },
  // ],
  // pricing: [
  //   {
  //     id: 1,
  //     package_name: 'Starter Pack',
  //     price: '18.99',
  //     trial_day: 15,
  //     isRecommended: false,
  //     features: [
  //       {
  //         id: 1,
  //         name: 'Full Access Library',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 2,
  //         name: 'Multiple user',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 3,
  //         name: 'Refund Policy',
  //         isAvailable: false,
  //       },
  //       {
  //         id: 4,
  //         name: 'Google Analytics',
  //         isAvailable: false,
  //       },
  //       {
  //         id: 5,
  //         name: '24/7 support',
  //         isAvailable: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     package_name: 'Premium Pack',
  //     price: '29.99',
  //     trial_day: 30,
  //     isRecommended: true,
  //     features: [
  //       {
  //         id: 1,
  //         name: 'Full Access Library',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 2,
  //         name: 'Multiple user',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 3,
  //         name: 'Refund Policy',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 4,
  //         name: 'Google Analytics',
  //         isAvailable: false,
  //       },
  //       {
  //         id: 5,
  //         name: '24/7 support',
  //         isAvailable: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     package_name: 'Custom Pack',
  //     price: '23.99',
  //     trial_day: 30,
  //     isRecommended: false,
  //     features: [
  //       {
  //         id: 1,
  //         name: 'Full Access Library',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 2,
  //         name: 'Multiple user',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 3,
  //         name: 'Refund Policy',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 4,
  //         name: 'Google Analytics',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 5,
  //         name: '24/7 support',
  //         isAvailable: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     package_name: 'Ultimate Pack',
  //     price: '35.99',
  //     trial_day: 45,
  //     isRecommended: false,
  //     features: [
  //       {
  //         id: 1,
  //         name: 'Full Access Library',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 2,
  //         name: 'Multiple user',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 3,
  //         name: 'Refund Policy',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 4,
  //         name: 'Google Analytics',
  //         isAvailable: true,
  //       },
  //       {
  //         id: 5,
  //         name: '24/7 support',
  //         isAvailable: true,
  //       },
  //     ],
  //   },
  // ],
  // helps: [
  //   {
  //     id: 1,
  //     icon: support1,
  //     title: 'Email client support',
  //     desc:
  //       'Ultimate access to all credit popular exercises and assessments materials',
  //   },
  //   {
  //     id: 2,
  //     icon: support2,
  //     title: 'Live ticket support',
  //     desc:
  //       'Total assessment corrections with live support tickets download access system',
  //   },
  // ],
  // newsFeed: [
  //   {
  //     id: 1,
  //     image: news1,
  //     title: 'Introducing our newest team with great experience',
  //     desc:
  //       'Brian Halligan knows that you need more than a great product to have a great brand.',
  //     link: '#',
  //   },
  //   {
  //     id: 2,
  //     image: news2,
  //     title:
  //       'New banking application has  developed and we expecting good feedback',
  //     desc: '',
  //     link: '#',
  //   },
  //   {
  //     id: 3,
  //     image: news3,
  //     title: 'Ui/UX industry are doing great job in previous year history',
  //     desc: '',
  //     link: '',
  //   },
  //   {
  //     id: 4,
  //     image: news4,
  //     title: 'Develop you design experience with figma features.',
  //     desc: '',
  //     link: '',
  //   },
  // ],
};
