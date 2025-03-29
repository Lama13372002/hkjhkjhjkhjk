import HeroSection from '@/components/sections/HeroSection'
import RoutesSection from '@/components/sections/RoutesSection'
import VehiclesSection from '@/components/sections/VehiclesSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import BlogSection from '@/components/sections/BlogSection'
import ContactsSection from '@/components/sections/ContactsSection'
import CTA from '@/components/sections/CTA'

// Force static generation
export const dynamic = 'force-static'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <RoutesSection />
      <VehiclesSection />
      <BenefitsSection />
      <ReviewsSection />
      <BlogSection />
      <ContactsSection />
      <CTA />
    </div>
  )
}
