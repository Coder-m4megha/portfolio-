export interface CertificationData {
  id: string;
  title: string;
  platform: string;
  issueDate: string;
  rawDate: string;
  recipient: string;
  subtitle: string;
  logoType: 'fcc' | 'meta' | 'google' | 'mongodb' | 'udemy' | 'coursera' | 'hackerrank';
  image?: string;
  signatures?: string[];
}

export const ALL_CERTIFICATIONS: CertificationData[] = [
  {
    id: 'ai-skills-2024',
    title: 'AI Skills Challenge',
    platform: 'Microsoft',
    issueDate: 'November 2024',
    rawDate: '2024-11-01',
    recipient: 'Megha Yadav',
    subtitle: 'AI Skills Challenge',
    logoType: 'google',
    image: '/Ai skill.jpg',
  },
  {
    id: 'cloud-skills-2024',
    title: 'Microsoft Learn Cloud Skills Challenge',
    platform: 'Microsoft Learn',
    issueDate: 'Build 2024',
    rawDate: '2024-05-01',
    recipient: 'Megha Yadav',
    subtitle: 'Microsoft Learn Cloud Skills Challenge',
    logoType: 'google',
    image: '/cloud skils.jpg',
  },
  {
    id: 'student-ambassador',
    title: 'Microsoft Learn Student Ambassador',
    platform: 'Microsoft Learn',
    issueDate: 'Azure Fundamentals learning session',
    rawDate: '2024-01-01',
    recipient: 'Megha Yadav',
    subtitle: 'Azure Fundamentals learning session',
    logoType: 'google',
    image: '/Microsoft Ambassador.jpg',
  },
  {
    id: 'delta-full-stack',
    title: 'Delta Full Stack Development',
    platform: 'Apna College',
    issueDate: 'Certificate',
    rawDate: '2024-01-01',
    recipient: 'Megha Yadav',
    subtitle: 'Delta Full Stack Development',
    logoType: 'udemy',
    image: '/certificate-sigma.jpg',
  },
  {
    id: 'canva-design-milestone',
    title: 'Canva Design Milestone',
    platform: 'Canva',
    issueDate: '100 designs',
    rawDate: '2024-01-01',
    recipient: 'Megha Yadav',
    subtitle: '100 designs',
    logoType: 'google',
    image: '/canva achievement.png',
  },
  {
    id: 'cloud-junction-quiz',
    title: 'India’s Biggest Cloud Quiz',
    platform: 'Cloud Junction',
    issueDate: 'July 2026',
    rawDate: '2026-07-01',
    recipient: 'Megha Yadav',
    subtitle: 'India’s Biggest Cloud Quiz',
    logoType: 'google',
    image: '/cloudJunction.png',
  },
];
