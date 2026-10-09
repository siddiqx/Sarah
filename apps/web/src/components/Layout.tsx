import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/ui/sidebar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  Terminal,
  ClipboardCheck,
  FolderKanban,
  GitBranch,
  RotateCcw,
  Settings,
  Search,
  ChevronRight,
  User,
  Calendar as CalendarIcon,
  Plus,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Curriculum', href: '/curriculum', icon: BookOpen },
  { name: 'Practice', href: '/practice', icon: Dumbbell },
  { name: 'Coding Lab', href: '/coding', icon: Terminal },
  { name: 'Assessments', href: '/assessments', icon: ClipboardCheck },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Knowledge Map', href: '/knowledge-map', icon: GitBranch },
  { name: 'Revision', href: '/revision', icon: RotateCcw },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className='min-h-screen bg-background flex'>
      {/* Left Sidebar */}
      <Sidebar variant='left' className='hidden lg:flex'>
        <div className='flex flex-col h-full p-4'>
          {/* Logo */}
          <div className='flex items-center gap-2 mb-8'>
            <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'>
              <span className='text-primary-foreground font-bold text-lg'>S</span>
            </div>
            <span className='font-semibold text-xl'>Sarah</span>
          </div>

          {/* Search */}
          <div className='relative mb-6'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
            <input
              type='text'
              placeholder='Search...'
              className='w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            />
          </div>

          {/* Navigation */}
          <nav className='flex-1 space-y-1'>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <item.icon className='w-5 h-5' />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Help section */}
          <div className='border-t border-border pt-4'>
            <p className='text-xs text-muted-foreground'>
              Need help? Check the documentation or contact support.
            </p>
          </div>
        </div>
      </Sidebar>

      {/* Central Workspace */}
      <main className='flex-1 flex flex-col min-w-0'>
        {/* Top Bar */}
        <header className='border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10'>
          <div className='flex items-center justify-between h-16 px-4 sm:px-6'>
            <div className='flex items-center gap-4'>
              <h1 className='text-lg font-semibold'>{getPageTitle(location.pathname)}</h1>
            </div>
            <div className='flex items-center gap-4'>
              <span className='text-sm text-muted-foreground hidden sm:block'>
                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className='flex-1 overflow-auto p-4 sm:p-6'>
          <Outlet />
        </div>
      </main>

      {/* Right Sidebar */}
      <Sidebar variant='right' className='hidden xl:flex'>
        <div className='flex flex-col h-full p-4 space-y-6'>
          {/* Profile */}
          <Card>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-base'>Profile</CardTitle>
                <Button variant='ghost' size='sm'>Settings</Button>
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>John Doe</p>
                  <p className='text-sm text-muted-foreground'>Phase 2 • Day 15</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Calendar />

          {/* Today's Tasks */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-base flex items-center gap-2'>
                <CalendarIcon className='w-4 h-4' />
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='space-y-3'>
                <TaskItem title='Complete Lesson: Variables & Types' type='lesson' />
                <TaskItem title='Practice: String Manipulation' type='practice' />
                <TaskItem title='Quiz: Data Types' type='quiz' />
              </div>
              <Button variant='ghost' size='sm' className='w-full mt-2'>
                <Plus className='w-4 h-4 mr-2' />
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          {/* Revision Queue */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-base flex items-center gap-2'>
                <RotateCcw className='w-4 h-4' />
                Revision Due
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
              <div className='space-y-3'>
                <RevisionItem topic='Loops' type='concept-recall' />
                <RevisionItem topic='Functions' type='output-prediction' />
              </div>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/curriculum': 'Curriculum',
    '/practice': 'Practice',
    '/coding': 'Coding Lab',
    '/assessments': 'Assessments',
    '/projects': 'Projects',
    '/knowledge-map': 'Knowledge Map',
    '/revision': 'Revision',
    '/settings': 'Settings',
  };
  for (const [path, title] of Object.entries(titles)) {
    if (pathname === path || pathname.startsWith(path + '/')) {
      return title;
    }
  }
  return 'Sarah';
}

function TaskItem({ title, type }: { title: string; type: string }) {
  const typeColors = {
    lesson: 'bg-blue-100 text-blue-800',
    practice: 'bg-green-100 text-green-800',
    quiz: 'bg-purple-100 text-purple-800',
    coding: 'bg-orange-100 text-orange-800',
  };
  return (
    <div className='flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer'>
      <div className={cn('w-2 h-2 rounded-full', typeColors[type as keyof typeof typeColors] || 'bg-gray-400')} />
      <span className='text-sm font-medium'>{title}</span>
    </div>
  );
}

function RevisionItem({ topic, type }: { topic: string; type: string }) {
  return (
    <div className='flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer'>
      <div>
        <p className='text-sm font-medium'>{topic}</p>
        <p className='text-xs text-muted-foreground capitalize'>{type.replace('-', ' ')}</p>
      </div>
      <Badge variant='outline' className='text-xs'>Due</Badge>
    </div>
  );
}
