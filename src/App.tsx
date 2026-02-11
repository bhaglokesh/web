import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Mail, Github, Linkedin, MapPin, Download, ArrowLeft, Clock, Calendar, ChevronRight, RefreshCw, Copy, Check } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import FloatingActions from './components/FloatingActions';
import Section from './components/Section';
import InfoBox from './components/InfoBox';
import Tooltip from './components/Tooltip';
import { NAV_ITEMS, PROFILE, EXPERIENCE, EDUCATION, PROJECTS, SKILLS, GALLERY_ITEMS, BLOG_POSTS } from './constants';
import type { BlogPost } from './types';

// Sub-component for Blog View (Defined outside to prevent re-render issues)
const BlogView: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-wiki-darkbg text-gray-900 dark:text-wiki-darktext animate-fade-in">
      {/* Minimal Navigation Bar */}
      <nav className="max-w-3xl mx-auto px-4 py-8 flex items-center justify-between">
          <Tooltip text="Back to Home" position="right">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Back to home"
            >
              <ArrowLeft size={24} strokeWidth={1.5} />
            </button>
          </Tooltip>
          <ThemeToggle />
      </nav>

      <article className="max-w-3xl mx-auto px-4 pb-24">
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-sans font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-sans text-gray-500 dark:text-gray-400">
             <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
             <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>
             <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          </div>
        </header>

        <div className="prose dark:prose-invert prose-lg prose-gray max-w-none text-gray-800 dark:text-gray-300 leading-8 font-serif">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="mb-6 first:first-letter:text-5xl first:first-letter:font-bold first:first-letter:mr-3 first:first-letter:float-left first:first-letter:text-black dark:first:first-letter:text-white first:first-letter:leading-none">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Last Updated Section */}
        {post.lastUpdated && (
          <div className="mt-12 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700/50">
             <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-sans italic">
                <RefreshCw size={14} className="text-gray-400 dark:text-gray-500" />
                This article was last updated on <span className="font-semibold text-gray-800 dark:text-gray-200 not-italic">{post.lastUpdated}</span>.
             </p>
          </div>
        )}

        <hr className="my-12 border-gray-100 dark:border-gray-800" />

        <div className="flex items-center justify-between font-sans">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
               <img src={PROFILE.image} alt={PROFILE.name} className="w-full h-full object-cover grayscale" />
             </div>
             <div>
               <div className="font-bold text-sm text-gray-900 dark:text-white">{PROFILE.name}</div>
               <div className="text-xs text-gray-500 dark:text-gray-400">{PROFILE.role}</div>
             </div>
           </div>
        </div>
      </article>
    </div>
  );
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [view, setView] = useState<'home' | 'blog'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (view !== 'home') return;
      
      const scrollPosition = window.scrollY + 100;

      let current = '';
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = item.id;
          }
        }
      }
      if (current) {
         setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    
    if (view === 'blog') {
      setView('home');
      setSelectedPost(null);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleBlogClick = (post: BlogPost) => {
    setSelectedPost(post);
    setView('blog');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Main Render
  if (view === 'blog' && selectedPost) {
    return <BlogView post={selectedPost} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen font-sans text-base leading-relaxed bg-white dark:bg-wiki-darkbg text-gray-900 dark:text-wiki-darktext">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-wiki-darkbg/95 border-b border-wiki-border dark:border-gray-600 backdrop-blur-md shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className="w-9 h-9 flex items-center justify-center font-serif font-bold text-2xl border-2 border-gray-900 dark:border-white rounded-sm group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
               {PROFILE.name.charAt(0)}
             </div>
             <div className="flex flex-col justify-center">
               <span className="font-serif font-bold text-lg leading-none tracking-tight text-gray-900 dark:text-white">
                 {PROFILE.name}
               </span>
               <span className="font-sans font-medium text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 leading-none mt-1">
                 The Personal Portfolio
               </span>
             </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
             {/* Main navigation is in the sidebar for this wiki-style layout */}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3 md:gap-4">
            <a 
              href="/resume.pdf" 
              download
              className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 hover:text-wiki-blue dark:hover:text-wiki-linkdark border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 hover:border-wiki-blue dark:hover:border-wiki-linkdark transition-colors"
              aria-label="Download Resume"
            >
              <Download size={14} />
              <span>Resume</span>
            </a>

            <ThemeToggle />
            <Tooltip text={mobileMenuOpen ? "Close Menu" : "Open Menu"} position="bottom">
              <button 
                className="md:hidden p-2 text-gray-700 dark:text-gray-200"
                onClick={toggleMobileMenu}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 h-full w-[80%] max-w-[280px] bg-white dark:bg-wiki-darkpanel shadow-2xl flex flex-col border-r border-wiki-border dark:border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20">
              <h2 className="font-serif font-bold text-xl text-gray-900 dark:text-white">Contents</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto py-2">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`
                          w-full text-left py-3 px-5 flex items-center gap-3 transition-colors border-l-4
                          ${isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-wiki-blue dark:text-wiki-linkdark border-wiki-blue dark:border-wiki-linkdark font-medium' 
                            : 'text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50'}
                        `}
                      >
                        <span className={`text-xs font-mono font-bold w-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                          {idx + 1}.
                        </span>
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Sidebar Footer / Actions */}
            <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 space-y-4">
               <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </a>
                
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-medium">
                     {PROFILE.name}
                  </p>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:flex md:gap-12 lg:gap-16">
        
        {/* Left Sidebar (Desktop Table of Contents Style) */}
        <aside className="hidden md:block w-48 lg:w-56 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-4 custom-scrollbar">
          <div className="py-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 pl-3">
              Contents
            </h4>
            <ul className="space-y-1 relative border-l border-gray-200 dark:border-gray-700 ml-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative">
                    <button 
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        text-sm text-left w-full py-1.5 pl-4 pr-2 border-l-2 -ml-[1px] transition-all duration-200 block font-medium
                        ${isActive 
                          ? 'border-wiki-blue dark:border-wiki-linkdark text-wiki-blue dark:text-wiki-linkdark bg-blue-50/50 dark:bg-blue-900/10' 
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'}
                      `}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Page Title */}
          <div className="mb-8 border-b border-gray-300 dark:border-gray-600 pb-4">
             <h1 className="text-4xl md:text-5xl font-serif font-black mb-2 text-gray-900 dark:text-white tracking-tight">{PROFILE.name}</h1>
             <p className="text-sm text-gray-600 dark:text-gray-400 italic">Built By {PROFILE.name}, the personal portfolio.</p>
          </div>

          {/* About / Intro Section */}
          <section id="about" className="mb-12 scroll-mt-24 clearfix">
            <InfoBox />
            
            <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-200">
              <p className="mb-4 text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                <strong className="font-bold text-gray-900 dark:text-white">{PROFILE.name}</strong> is a {PROFILE.role} based in {PROFILE.location}. {PROFILE.about}
              </p>
              <p className="mb-4 leading-relaxed text-gray-800 dark:text-gray-300">
                Currently focusing on full-stack development, modern web standards, and user-centric design principles.
                This portfolio simulates a knowledge-base article style to emphasize content clarity and structure.
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <Section id="experience" title="Experience">
            <div className="relative border-l border-gray-300 dark:border-gray-600 ml-3 md:ml-4 my-4 space-y-10 py-2">
              {EXPERIENCE.map((job) => (
                <div key={job.id} className="relative pl-8 md:pl-10">
                  <span className="absolute -left-[6px] top-2.5 h-3 w-3 rounded-full bg-wiki-blue dark:bg-wiki-linkdark ring-4 ring-white dark:ring-wiki-darkbg z-10 shadow-sm"></span>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">{job.role}</h3>
                    <span className="hidden sm:inline text-gray-400 dark:text-gray-500 font-light">|</span>
                    <span className="text-gray-700 dark:text-gray-300 italic font-medium">{job.company}</span>
                  </div>
                  
                  <div className="mb-3">
                     <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700">
                      {job.period}
                    </span>
                  </div>

                  <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-800 dark:text-gray-300 marker:text-gray-400 text-base leading-relaxed">
                    {job.description.map((desc, i) => (
                      <li key={i} className="pl-1">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Education Section */}
          <Section id="education" title="Education">
            <div className="relative border-l border-gray-300 dark:border-gray-600 ml-3 md:ml-4 my-4 space-y-10 py-2">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="relative pl-8 md:pl-10">
                  <span className="absolute -left-[6px] top-2.5 h-3 w-3 rounded-full bg-wiki-blue dark:bg-wiki-linkdark ring-4 ring-white dark:ring-wiki-darkbg z-10 shadow-sm"></span>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">{edu.institution}</h3>
                    <span className="hidden sm:inline text-gray-400 dark:text-gray-500 font-light">|</span>
                    <span className="text-gray-700 dark:text-gray-300 italic font-medium">{edu.degree}</span>
                  </div>
                  
                  <div className="mb-3">
                     <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700">
                      {edu.period}
                    </span>
                  </div>

                  {edu.description && edu.description.length > 0 && (
                    <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-800 dark:text-gray-300 marker:text-gray-400 text-base leading-relaxed">
                      {edu.description.map((desc, i) => (
                        <li key={i} className="pl-1">{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Projects Section */}
          <Section id="projects" title="Selected Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group relative bg-white dark:bg-wiki-darkpanel border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-wiki-blue dark:hover:border-wiki-linkdark transition-all duration-300 flex flex-col h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-wiki-blue dark:bg-wiki-linkdark opacity-0 group-hover:opacity-100 rounded-t-lg transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-bold text-xl text-wiki-blue dark:text-wiki-linkdark group-hover:underline decoration-2 underline-offset-2 tracking-tight">
                      <a href={project.link} className="flex items-center gap-2 after:content-['_↗'] after:text-sm after:opacity-0 group-hover:after:opacity-100 after:transition-opacity">
                        {project.title}
                      </a>
                    </h3>
                    <span className="text-xs font-mono font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400">{project.year}</span>
                  </div>
                  
                  <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map(tech => (
                      <span key={tech} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 px-2 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills Section */}
          <Section id="skills" title="Skills & Competencies">
            <div className="space-y-4 md:space-y-5 my-4">
               {SKILLS.map((group) => (
                 <div key={group.category} className="md:flex md:items-baseline">
                    <h3 className="font-bold text-gray-900 dark:text-white md:w-40 shrink-0 mb-1 md:mb-0 text-base">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-x-1.5 gap-y-1 text-gray-800 dark:text-gray-300 leading-relaxed text-sm">
                      {group.items.map((skill, index) => (
                        <span key={skill} className="inline-flex items-center">
                          <span className="hover:text-wiki-blue dark:hover:text-wiki-linkdark cursor-default transition-colors font-medium">
                            {skill}
                          </span>
                          {index < group.items.length - 1 && (
                            <span className="text-gray-400 dark:text-gray-600 ml-1.5 select-none">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                 </div>
               ))}
            </div>
          </Section>

          {/* Gallery Section */}
          <Section id="gallery" title="Gallery">
             <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 snap-x snap-mandatory scroll-smooth">
               {GALLERY_ITEMS.map((item) => (
                 <div key={item.id} className="flex-shrink-0 w-[80vw] sm:w-auto snap-center">
                    <div className="overflow-hidden rounded-sm border border-gray-200 dark:border-gray-700 relative aspect-[4/3] group">
                       <img 
                         src={item.imageUrl} 
                         alt={item.caption} 
                         className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                       />
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic font-medium">
                      {item.caption}
                    </div>
                 </div>
               ))}
             </div>
          </Section>

          {/* Blog Section */}
          <Section id="blog" title="Writing & Thoughts">
            <ul className="space-y-8 my-4">
              {BLOG_POSTS.map((post) => (
                <li key={post.id} className="flex flex-col">
                   <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                      <h3 className="font-serif font-bold text-xl text-wiki-blue dark:text-wiki-linkdark tracking-tight">
                        <button onClick={() => handleBlogClick(post)} className="hover:underline text-left">
                          {post.title}
                        </button>
                      </h3>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{post.date}</span>
                        {post.lastUpdated && (
                          <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                            Upd: {post.lastUpdated}
                          </span>
                        )}
                      </div>
                   </div>
                   <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2 line-clamp-2">
                     {post.excerpt}
                   </p>
                   <button 
                     onClick={() => handleBlogClick(post)} 
                     className="text-xs font-semibold text-wiki-blue dark:text-wiki-linkdark hover:underline self-start flex items-center gap-0.5"
                   >
                     Read more <ChevronRight size={10} />
                   </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* Contact Section */}
          <Section id="contact" title="External Links">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                   <h4 className="font-bold text-gray-900 dark:text-white mb-4">Get in touch</h4>
                   <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                        <div className="flex items-center gap-2">
                           <a href={`mailto:${PROFILE.email}`} className="text-wiki-blue dark:text-wiki-linkdark hover:underline font-medium">
                              {PROFILE.email}
                           </a>
                           <Tooltip text={emailCopied ? "Copied!" : "Copy email"} position="top">
                            <button 
                              onClick={handleCopyEmail}
                              className="p-1 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              aria-label="Copy email address"
                            >
                              {emailCopied ? <Check size={14} className="text-green-600 dark:text-green-400" /> : <Copy size={14} />}
                            </button>
                           </Tooltip>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{PROFILE.location}</span>
                      </li>
                   </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Social Profiles</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="inline-flex items-center gap-2 text-wiki-blue dark:text-wiki-linkdark hover:underline font-medium">
                        <Github size={16} className="text-gray-500 dark:text-gray-400" />
                        <span>GitHub</span>
                        <ExternalLink size={12} className="opacity-50" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="inline-flex items-center gap-2 text-wiki-blue dark:text-wiki-linkdark hover:underline font-medium">
                         <Linkedin size={16} className="text-gray-500 dark:text-gray-400" />
                         <span>LinkedIn</span>
                         <ExternalLink size={12} className="opacity-50" />
                      </a>
                    </li>
                  </ul>
                </div>
             </div>
             <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 italic">
               This page was last modified on {new Date().toLocaleDateString()}, at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.
             </p>
          </Section>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-10 bg-gray-100 dark:bg-wiki-darkpanel border-t border-gray-300 dark:border-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center sm:text-left">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="max-w-2xl">
               <p className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                 Designed and developed by <strong className="text-gray-900 dark:text-white">{PROFILE.name}</strong>.
               </p>
               <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400 text-xs mt-3 uppercase tracking-wider font-medium">
                 {NAV_ITEMS.map((item) => (
                   <button 
                     key={item.id} 
                     onClick={() => handleNavClick(item.id)}
                     className="hover:text-wiki-blue dark:hover:text-wiki-linkdark hover:underline transition-colors"
                   >
                     {item.label}
                   </button>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </footer>

      <FloatingActions />
    </div>
  );
};

export default App;