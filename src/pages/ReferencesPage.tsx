import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/references/ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';

// Mock portfolio projects data
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'NexGen Brand Identity',
    client: 'NexGen Technologies',
    category: 'Branding',
    tags: ['Brand Identity', 'Logo Design', 'Visual System'],
    imageSrc: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Complete brand identity redesign for a leading tech company, aligning visual identity with their innovative products and forward-thinking vision.',
    results: [
      '230% increase in brand recognition',
      'Successful launch at industry conference',
      'Implementation across 12 product lines'
    ]
  },
  {
    id: '2',
    title: 'Eco Market Campaign',
    client: 'Sustainable Goods Co.',
    category: 'Advertising',
    tags: ['Digital Campaign', 'Social Media', 'Video Production'],
    imageSrc: 'https://images.pexels.com/photos/7310201/pexels-photo-7310201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Multi-channel advertising campaign promoting sustainable products and eco-friendly practices, leveraging authentic storytelling and impactful visuals.',
    results: [
      '185% ROI on advertising spend',
      '3.2M video views across platforms',
      '24% increase in direct sales'
    ]
  },
  {
    id: '3',
    title: 'Financial Services Website',
    client: 'AlphaBank',
    category: 'Digital Strategy',
    tags: ['Web Design', 'UX Research', 'Content Strategy'],
    imageSrc: 'https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Comprehensive website redesign for a financial institution, focusing on improved user experience, accessibility, and conversion optimization.',
    results: [
      '42% increase in loan applications',
      '35% reduction in bounce rate',
      'Improved customer satisfaction metrics'
    ]
  },
  {
    id: '4',
    title: 'Artisan Food Packaging',
    client: 'Gourmet Delights',
    category: 'Branding',
    tags: ['Packaging Design', 'Product Photography', 'Brand Positioning'],
    imageSrc: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Premium packaging design for an artisanal food brand, emphasizing quality ingredients and traditional craftsmanship through elegant visuals.',
    results: [
      'Successfully entered 3 new retail chains',
      '28% higher price point achieved',
      'Featured in industry design awards'
    ]
  },
  {
    id: '5',
    title: 'Urban Fashion Launch',
    client: 'Streetwear Collective',
    category: 'Advertising',
    tags: ['Launch Campaign', 'Influencer Marketing', 'Event Production'],
    imageSrc: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Integrated launch campaign for a new urban fashion brand, combining digital marketing, influencer partnerships, and experiential events.',
    results: [
      'Sold out initial collection in 48 hours',
      '75K new Instagram followers in first month',
      'Featured in Vogue and GQ'
    ]
  },
  {
    id: '6',
    title: 'Travel App UX Design',
    client: 'Wanderlust Journeys',
    category: 'Digital Strategy',
    tags: ['App Design', 'UX/UI', 'User Testing'],
    imageSrc: 'https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'User experience overhaul for a travel booking application, simplifying the booking process and improving personalization features.',
    results: [
      '62% increase in booking completion rate',
      '4.8/5 app store rating (up from 3.6)',
      'Featured as App Store "App of the Day"'
    ]
  },
  {
    id: '7',
    title: 'Healthcare Rebrand',
    client: 'Vitality Medical Group',
    category: 'Branding',
    tags: ['Brand Strategy', 'Visual Identity', 'Internal Communications'],
    imageSrc: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Complete rebranding for a healthcare provider, creating a more approachable and modern identity while maintaining trust and authority.',
    results: [
      '32% increase in new patient appointments',
      'Successful implementation across 14 locations',
      'Improved staff satisfaction and engagement'
    ]
  },
  {
    id: '8',
    title: 'Luxury Real Estate Marketing',
    client: 'Prestige Properties',
    category: 'Digital Strategy',
    tags: ['Content Marketing', 'Virtual Tours', 'Lead Generation'],
    imageSrc: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Digital marketing strategy for luxury real estate, utilizing immersive content, targeted advertising, and personalized lead nurturing.',
    results: [
      '145% increase in qualified leads',
      'Average 22 days reduction in property selling time',
      '$2.8M in commission from digital leads'
    ]
  },
];

const ReferencesPage: React.FC = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [filter, setFilter] = useState<string | null>(null);
  
  // All unique categories from projects
  const categories = Array.from(
    new Set(MOCK_PROJECTS.map(project => project.category))
  );

  // Filter projects based on selected category
  useEffect(() => {
    if (filter) {
      setProjects(MOCK_PROJECTS.filter(project => project.category === filter));
    } else {
      setProjects(MOCK_PROJECTS);
    }
  }, [filter]);

  return (
    <div>
      {/* Page Header */}
      <div className="bg-slate-gray py-32 md:py-40">
        <div className="container-custom text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {language === 'fr' ? 'Nos Références' : 'Our References'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            {language === 'fr' 
              ? 'Découvrez notre portfolio de projets réussis pour des clients de divers secteurs.'
              : 'Explore our portfolio of successful projects for clients across diverse industries.'
            }
          </motion.p>
        </div>
      </div>

      {/* Portfolio Section */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === null 
                  ? 'bg-teal text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setFilter(null)}
            >
              {language === 'fr' ? 'Tous' : 'All'}
            </button>
            
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category 
                    ? 'bg-teal text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                client={project.client}
                category={project.category}
                tags={project.tags}
                imageSrc={project.imageSrc}
                description={project.description}
                results={project.results}
                index={index}
              />
            ))}
          </div>
          
          {/* No Results Message */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl text-slate-gray mb-2">
                {language === 'fr' ? 'Aucun projet trouvé' : 'No projects found'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' 
                  ? 'Veuillez sélectionner une autre catégorie.' 
                  : 'Please select another category.'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReferencesPage;
