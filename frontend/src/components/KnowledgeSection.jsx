import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Lightbulb, Users, Building, TreePine, Droplets } from 'lucide-react';

const KnowledgeSection = () => {
  const knowledgeCards = [
    {
      icon: '🌡️',
      title: 'Understanding Urban Heat',
      color: 'from-red-500 to-orange-500',
      content: [
        {
          q: 'What is the Urban Heat Island Effect?',
          a: 'Cities are hotter than surrounding countryside because buildings and pavement absorb heat during the day and release it at night. Think of it like a giant heat battery that never fully cools down.'
        },
        {
          q: 'Why do we measure it?',
          a: 'By knowing exactly where and how much hotter cities are, we can target cooling efforts where they\'re needed most. It\'s like having a heat map that guides us where to plant trees or build shade.'
        },
        {
          q: 'What does +4°C really mean?',
          a: 'A spot that\'s 4°C hotter than rural areas can feel 8-10°C hotter to humans due to humidity and lack of breeze. It\'s the difference between uncomfortable and dangerous.'
        }
      ]
    },
    {
      icon: '🛰️',
      title: 'How We Get This Data',
      color: 'from-blue-500 to-cyan-500',
      content: [
        {
          q: 'Where does this data come from?',
          a: 'Satellites orbiting Earth measure temperature and vegetation every few days. We use NASA Landsat (for temperature) and Sentinel-2 (for greenness). This gives us an unbiased, complete picture.'
        },
        {
          q: 'How accurate is satellite data?',
          a: 'Very accurate for surface temperature (within 1°C). However, it measures ground/roof temperature, not air temperature. Ground can be 10-15°C hotter than the air you feel.'
        },
        {
          q: 'How often is it updated?',
          a: 'Our current data is updated monthly using satellite passes. With Google Earth Engine integration (coming soon), we\'ll have near-real-time updates within days of satellite collection.'
        }
      ]
    },
    {
      icon: '🌳',
      title: 'The Power of Trees & Green Space',
      color: 'from-green-500 to-emerald-500',
      content: [
        {
          q: 'How much do trees actually cool?',
          a: 'A single mature tree can cool the area around it by 1-2°C through shade and water evaporation. A neighborhood with 30% tree cover can be 4-5°C cooler than one with no trees.'
        },
        {
          q: 'What about grass vs. pavement?',
          a: 'Grass stays around 25-30°C on a hot day. Pavement can reach 50-60°C. That\'s why parking lots and roads are heat traps. Even small green spaces make a big difference.'
        },
        {
          q: 'How long before trees make a difference?',
          a: 'Young trees provide some cooling immediately through shade. Full cooling effect comes in 5-10 years as the canopy grows. But we can\'t wait - we need to start planting NOW and see benefits grow over time.'
        }
      ]
    },
    {
      icon: '🏗️',
      title: 'Cooling Solutions Explained',
      color: 'from-purple-500 to-pink-500',
      content: [
        {
          q: 'What are Cool Roofs and how do they work?',
          a: 'Cool roofs are painted white or use reflective materials that bounce sunlight away instead of absorbing it. Regular dark roofs can reach 80°C, while white roofs stay around 50°C. This reduces building heat by 30% and lowers AC costs by 20-40%. Cost: $3-8 per square foot.'
        },
        {
          q: 'What is Cool Pavement?',
          a: 'Cool pavement uses special light-colored materials or coatings that reflect more sunlight than traditional dark asphalt. Regular pavement: 60°C on hot days. Cool pavement: 45-50°C (10-15°C cooler!). Benefits: Lower air temperature, less heat absorbed by buildings nearby, safer for pedestrians. Cities like Los Angeles have tested this successfully.'
        },
        {
          q: 'What are Green Roofs?',
          a: 'Green roofs are covered with living plants and soil. They cool through shade and evapotranspiration (plants releasing water). Benefits: Reduce roof temperature by 30-40°C, absorb rainwater, improve air quality, provide habitat for birds/insects. Cost: $15-25 per square foot, but saves energy long-term.'
        },
        {
          q: 'What are Permeable Pavements?',
          a: 'Instead of solid concrete, permeable pavements have tiny holes that let rainwater soak through into the ground below. Benefits: Reduces flooding, keeps water cooler (reducing runoff temperature), allows tree roots to breathe. Used for parking lots, driveways, and sidewalks.'
        },
        {
          q: 'What are Urban Green Corridors?',
          a: 'Green corridors are connected strips of trees, parks, and green spaces that create "cooling highways" through cities. Cool air flows through these corridors, spreading relief to nearby neighborhoods. Example: River valleys, linear parks along old railway lines, tree-lined streets that connect parks.'
        },
        {
          q: 'What are Bioswales and Rain Gardens?',
          a: 'Shallow landscaped channels filled with plants that collect and filter rainwater. Benefits: Natural cooling through evaporation, reduce flooding, filter pollutants, create beautiful green spaces. Perfect for street medians and parking lot borders. Cost-effective alternative to traditional drainage.'
        }
      ]
    },
    {
      icon: '🏙️',
      title: 'Heat & City Planning',
      color: 'from-amber-500 to-yellow-500',
      content: [
        {
          q: 'Why are some neighborhoods hotter than others?',
          a: 'Industrial areas, parking lots, and densely-built zones with little greenery trap the most heat. Low-income neighborhoods often have fewer trees and more pavement, creating environmental injustice.'
        },
        {
          q: 'What can cities do right now?',
          a: 'Paint roofs white (reduces heat by 30%), install shade structures, plant trees on every street, and require new developments to include green space. These aren\'t expensive and work immediately.'
        },
        {
          q: 'How do we prioritize where to cool first?',
          a: 'Target areas with: (1) high temperatures, (2) vulnerable populations (elderly, children), and (3) low tree cover. Use this dashboard to identify those zones and advocate for action.'
        }
      ]
    },
    {
      icon: '💡',
      title: 'Take Action in Your Community',
      color: 'from-cyan-500 to-blue-500',
      content: [
        {
          q: 'What can I do as an individual?',
          a: 'Plant trees in your yard, advocate for street trees, join community tree-planting events, paint your roof a light color, and share this data with neighbors and local politicians.'
        },
        {
          q: 'How do I advocate to my city?',
          a: 'Show them this dashboard! Request: (1) tree planting programs, (2) cool roof rebates, (3) green space in new developments, (4) shade at bus stops. Data makes your voice stronger.'
        },
        {
          q: 'Can one person really make a difference?',
          a: 'YES! One tree planted cools your neighborhood. One person speaking at city council can change policy. One shared dashboard can educate hundreds. Small actions multiply.'
        }
      ]
    }
  ];

  const resources = [
    {
      title: 'Scientific Papers',
      items: [
        'NASA Earth Observatory - Urban Heat Islands',
        'Journal of Environmental Research - Cooling Strategies',
        'WHO Guidelines - Heat Health Action Plans'
      ]
    },
    {
      title: 'Practical Guides',
      items: [
        'How to Plant Trees for Maximum Cooling',
        'Cool Roof Installation Guide',
        'Community Heat Action Planning Toolkit'
      ]
    },
    {
      title: 'Local Resources',
      items: [
        'Brampton Tree Planting Programs',
        'Peel Region Heat Alert System',
        'City Cooling Incentive Programs'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Knowledge Hub</h2>
        </div>
        <p className="text-lg text-slate-300">
          Everything you need to understand urban heat and become an advocate for cooling solutions.
        </p>
      </div>

      {/* Knowledge Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {knowledgeCards.map((section, idx) => (
          <Card key={idx} className="glass border-cyan-500/20">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} opacity-20 flex items-center justify-center mb-3`}>
                <span className="text-3xl">{section.icon}</span>
              </div>
              <CardTitle className="text-lg text-white">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {section.content.map((item, itemIdx) => (
                  <AccordionItem key={itemIdx} value={`item-${idx}-${itemIdx}`}>
                    <AccordionTrigger className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-300 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Facts */}
      <Card className="glass border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            Quick Facts That Matter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">30%</div>
              <p className="text-sm text-slate-300">Increase in heat-related illness on days over 30°C</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">1.5°C</div>
              <p className="text-sm text-slate-300">Cooling effect from adding just 10% more greenery</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">42%</div>
              <p className="text-sm text-slate-300">Of Peel Region exceeds +4°C dangerous heat threshold</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="glass border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-xl text-white">Further Reading & Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold text-cyan-400 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">→</span>
                      <span className="text-sm text-slate-300 hover:text-white cursor-pointer transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Section */}
      <Card className="glass border-cyan-500/20">
        <CardContent className="p-8">
          <div className="text-center">
            <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Join the Cooling Movement</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Connect with others fighting urban heat in Brampton & Peel. Share ideas, organize tree plantings, 
              and advocate together for cooler, healthier neighborhoods.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors">
                Join Community Forum
              </button>
              <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors border border-cyan-500/30">
                Find Local Groups
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeSection;