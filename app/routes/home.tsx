import type { Route as RouteType } from './+types/home';
import routes from '../routes';
import { NavLink } from 'react-router';

export function meta({}: RouteType.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center pt-16 pb-4 gap-10'>
      <h1 className='text-4xl'>Fede&apos;s Blog</h1>

      <ul className='list-disc'>
        {routes.map((route) => {
          if (!route.path) {
            return null;
          }

          // FIXME: This won't work for more than one nesting
          const path = route.path.replaceAll('-', ' ').includes('/')
            ? `-> ${route.path.split('/')[1]}`
            : route.path;
          return (
            <li key={route.file}>
              <NavLink className={'capitalize hover:underline'} to={route.path}>
                {path}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
