// src/app/about/page.tsx
import { StorySection } from './section/StorySection';
import { PlatformSection } from './section/PlatformSection';
import { MileStoneSection } from './section/MileStoneSection';
import { MissionSection } from './section/MissionSection';
import { RiceSection } from './section/RiceSection';
import { CommunitySection } from './section/CommunitySection';
import { CustomerSection } from './section/CustomerSection';
export default function AboutPage() {
    return (
        <main className="flex-grow"> 
            <StorySection/>
            <PlatformSection/>
            <MileStoneSection/>
            <MissionSection/>
            <RiceSection/>
            <CommunitySection/>
            <CustomerSection/> 
        </main>
    );
}