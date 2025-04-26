import { Blog } from '../types/Blog';

// Имитация задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let blogs: Blog[] = [
    {
      id: 1,
      title: 'Золотой Ветер в Джоджо',
      text: 'Пятая часть "Невероятных приключений Джоджо" рассказывает о Джорно Джованне, стремящемся стать звездой мафии, используя свой стенд Golden Experience.',
      deleted: false
    },
    {
      id: 2,
      title: 'Мир Sword Art Online',
      text: 'SAO погружает игроков в виртуальную реальность MMORPG, где смерть в игре означает смерть в реальном мире. История Кирито вдохновляет!',
      deleted: false
    },
    {
      id: 3,
      title: 'Парадокс времени в Врата Штейна',
      text: 'Окабэ Ринтаро случайно изобретает устройство, способное отправлять сообщения в прошлое, что приводит к цепочке временных парадоксов.',
      deleted: false
    },
    {
      id: 4,
      title: 'Стенды в Джоджо: Бриллиант нерушимый',
      text: 'Четвертая часть Джоджо знакомит нас с Джоске Хигашикатой и его стендом Crazy Diamond, способным чинить почти всё.',
      deleted: false
    },
    {
      id: 5,
      title: 'Алисизация в SAO',
      text: 'Арка Алисизации исследует искусственный интеллект и виртуальный мир Underworld, где Кирито сталкивается с новыми вызовами.',
      deleted: false
    },
    {
      id: 6,
      title: 'Маюри и Врата Штейна',
      text: 'Маюри Шина — сердце команды, но её судьба становится ключевым фактором в борьбе за изменение временных линий.',
      deleted: false
    },
    {
      id: 7,
      title: 'Боевые сцены в Джоджо',
      text: 'Уникальный стиль боёв в Джоджо, где стенды сражаются с невероятной стратегией и креативностью, делает каждую битву эпичной.',
      deleted: false
    },
    {
      id: 8,
      title: 'Эволюция SAO',
      text: 'От оригинальной игры до Gun Gale Online и Alicization — SAO продолжает расширять границы виртуальных миров.',
      deleted: false
    },
    {
      id: 9,
      title: 'Эль Псай Конгру в Врата Штейна',
      text: 'Кодовое слово Окабэ, "Эль Псай Конгру", стало культовым среди фанатов, символизируя его решимость изменить судьбу.',
      deleted: false
    },
    {
      id: 10,
      title: 'Антагонисты Джоджо',
      text: 'От Дио Брандо до Кира Йошикаге — злодеи Джоджо всегда харизматичны и оставляют неизгладимый след.',
      deleted: false
    },
    {
      id: 11,
      title: 'Асуна и Кирито: Любовь в SAO',
      text: 'История любви Асуны и Кирито стала одной из самых трогательных в аниме, показывая силу связи в виртуальном мире.',
      deleted: false
    },
    {
      id: 12,
      title: 'Наука в Врата Штейна',
      text: 'Смесь научной фантастики и реальных концепций, таких как путешествия во времени, делает Врата Штейна уникальным аниме.',
      deleted: false
    }
  ];

export const blogApi = {
  getBlogs: async (page: number = 1, pageSize: number = 10): Promise<{ blogs: Blog[], total: number }> => {
    await delay(500); 
    
    const startIndex = (page - 1) * pageSize;
    const filteredBlogs = blogs.filter(blog => !blog.deleted);
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + pageSize);
    
    return {
      blogs: paginatedBlogs,
      total: filteredBlogs.length
    };
  },
  
  getBlogById: async (id: number): Promise<Blog | null> => {
    await delay(500);
    const blog = blogs.find(blog => blog.id === id && !blog.deleted);
    return blog || null;
  },
  
  createBlog: async (data: Omit<Blog, 'id' | 'deleted'>): Promise<Blog> => {
    await delay(500);
    const newId = Math.max(...blogs.map(blog => blog.id), 0) + 1;
    const newBlog: Blog = {
      id: newId,
      ...data,
      deleted: false
    };
    
    blogs = [...blogs, newBlog];
    return newBlog;
  },
  
  updateBlog: async (id: number, updatedData: Partial<Omit<Blog, 'id' | 'deleted'>>): Promise<Blog | null> => {
    await delay(500);
    
    const blogIndex = blogs.findIndex(blog => blog.id === id && !blog.deleted);
    if (blogIndex === -1) return null;
    
    const updatedBlog = {
      ...blogs[blogIndex],
      ...updatedData
    };
    
    blogs = [
      ...blogs.slice(0, blogIndex),
      updatedBlog,
      ...blogs.slice(blogIndex + 1)
    ];
    
    return updatedBlog;
  },
  

  deleteBlog: async (id: number): Promise<boolean> => {
    await delay(500);
    
    const blogIndex = blogs.findIndex(blog => blog.id === id && !blog.deleted);
    if (blogIndex === -1) return false;
    
    const updatedBlog = {
      ...blogs[blogIndex],
      deleted: true
    };
    
    blogs = [
      ...blogs.slice(0, blogIndex),
      updatedBlog,
      ...blogs.slice(blogIndex + 1)
    ];
    
    return true;
  }
};