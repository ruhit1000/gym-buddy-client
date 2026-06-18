import HomeBanner from "@/Components/Homepage/HomeBanner";
import HomeCTA from "@/Components/Homepage/HomeCTA";
import ProjectFeatures from "@/Components/Homepage/ProjectFeatures";
import UserReviewsSection from "@/Components/Homepage/UserReviewsSection";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <ProjectFeatures />
      <UserReviewsSection />
      <HomeCTA />
    </div>
  );
}
