import FeaturedClasses from "@/Components/Homepage/FeaturedClasses";
import HomeBanner from "@/Components/Homepage/HomeBanner";
import HomeCTA from "@/Components/Homepage/HomeCTA";
import LatestForumPosts from "@/Components/Homepage/LatestForumPosts";
import ProjectFeatures from "@/Components/Homepage/ProjectFeatures";
import UserReviewsSection from "@/Components/Homepage/UserReviewsSection";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <ProjectFeatures />
      <FeaturedClasses />
      <LatestForumPosts />
      <UserReviewsSection />
      <HomeCTA />
    </div>
  );
}
