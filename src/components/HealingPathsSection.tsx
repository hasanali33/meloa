// HealingPathsSection.tsx
import Link from 'next/link';
import Image from 'next/image';

const paths = [
  {
    title: 'Somatic & Body-Based Healing',
    desc: 'Reconnect with your body and regulate your nervous system through breath, movement, and awareness.',
    href: '/healing/somatic',
    icon: '/icons/somatic.png',
  },
  {
    title: 'Creative & Expressive Healing',
    desc: 'Heal through art, music, writing, and movement that unlocks your emotions and voice.',
    href: '/healing/creative-expression',
    icon: '/icons/creative.png',
  },
  {
    title: 'Inner Child & Parts Work',
    desc: 'Nurture your inner child and explore the different parts of you with compassion and curiosity.',
    href: '/healing/inner-child',
    icon: '/icons/innerchild.png',
  },
  {
    title: 'Spiritual & Ritual-Based Healing',
    desc: 'Reconnect with your spirit and ancestry through ritual, intention, and cultural wisdom.',
    href: '/healing/spiritual',
    icon: '/icons/spiritual.png',
  },
];

export default function HealingPathsSection() {
  return (
    <section className="bg-white py-24 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Explore Healing Paths</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {paths.map(({ title, desc, href, icon }) => (
          <Link key={title} href={href} className="block p-6 rounded-xl bg-[#f7f9fc] hover:shadow-xl transition border border-gray-100">
            <div className="flex flex-col items-start">
              <Image src={icon} alt={title} width={40} height={40} className="mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
