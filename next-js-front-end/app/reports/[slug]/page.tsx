import { notFound } from 'next/navigation';
import { getReportBySlug, getAllSlugs } from '../../data/reports';
import ReportCard from '../../components/ReportCard';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all reports
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata based on slug
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    return { title: 'Report Not Found' };
  }

  return {
    title: `${report.title} | ${report.category} Report`,
    description: report.description,
    openGraph: {
      title: `${report.title} - Market Research Report`,
      description: report.description,
      type: 'article',
    },
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getReportBySlug(slug);

  if (!report) {
    notFound();
  }

  return <ReportCard report={report} />;
}
