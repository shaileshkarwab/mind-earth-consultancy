import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllSubCategoryLinks,
  getListedReportsBySubCategoryLink,
  getSubCategoryByLink,
} from '../../../data/reports';
import SubCategoryReportsListing from '../../../components/SubCategoryReportsListing';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// export async function generateStaticParams() {
//   return getAllSubCategoryLinks().map((slug) => ({ slug }));
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const subCategoryMatch = getSubCategoryByLink(slug);
//
//   if (!subCategoryMatch) {
//     return { title: 'Subcategory Not Found' };
//   }
//
//   return {
//     title: `${subCategoryMatch.subCategory.subCategoryName} Reports | ${subCategoryMatch.category.categoryName}`,
//     description: `Browse reports listed under ${subCategoryMatch.subCategory.subCategoryName}.`,
//     openGraph: {
//       title: `${subCategoryMatch.subCategory.subCategoryName} Reports`,
//       description: `Explore reports for ${subCategoryMatch.subCategory.subCategoryName}.`,
//       type: 'website',
//     },
//   };
// }

export default async function SubCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const subCategoryMatch = getSubCategoryByLink(slug);

  if (!subCategoryMatch) {
    notFound();
  }

  const reports = getListedReportsBySubCategoryLink(slug);

  return (
    <SubCategoryReportsListing
      categoryName={subCategoryMatch.category.categoryName}
      subCategoryName={subCategoryMatch.subCategory.subCategoryName}
      reports={reports}
    />
  );
}