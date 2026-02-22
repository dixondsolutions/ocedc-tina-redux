'use client';

import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { IndustriesGrid } from "./industries-grid";
import { NewsFeed } from "./news-feed";
import { NewsArchive } from "./news-archive";
import { ContactForm } from "./contact-form";
import { Map } from "./map";
import { PropertyListing } from "./property-listing";
import { CommunityList } from "./community-list";
import { BoardDirectory } from "./board-directory";
import { ResourceLibrary } from "./resource-library";
import { PropertyExplorer } from "./property-explorer";
import { LoisWidget } from "./lois-widget";
import { FormBuilder } from "./form-builder";
import { useLayout } from "../layout/layout-context";

interface BlocksProps {
  blocks: any[];
}

export const Blocks = ({ blocks }: BlocksProps) => {
  if (!blocks) return null;
  return (
    <>
      {blocks.map(function (block, i) {
        return (
          <div key={block.id || i}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: any) => {
  const { globalSettings } = useLayout();
  const listings = globalSettings?.listings;
  const useLois =
    listings?.listingsSource === 'lois' &&
    listings?.lois?.baseUrl &&
    listings?.lois?.organizationId;

  switch (block.blockType) {
    case "video":
      return <Video data={block} />;
    case "hero":
      return <Hero data={block} />;
    case "callout":
      return <Callout data={block} />;
    case "stats":
      return <Stats data={block} />;
    case "content":
      return <Content data={block} />;
    case "features":
      return <Features data={block} />;
    case "testimonial":
      return <Testimonial data={block} />;
    case "cta":
      return <CallToAction data={block} />;
    case "industriesGrid":
      return <IndustriesGrid data={block} />;
    case "newsFeed":
      return <NewsFeed data={block} />;
    case "newsArchive":
      return <NewsArchive data={block} />;
    case "contactForm":
      return <ContactForm data={block} />;
    case "map":
      return <Map data={block} />;
    case "propertyListing":
      return useLois ? (
        <LoisWidget
          baseUrl={listings.lois!.baseUrl!}
          organizationId={listings.lois!.organizationId!}
          background={block.style?.background}
        />
      ) : (
        <PropertyListing data={block} />
      );
    case "communityList":
      return <CommunityList data={block} />;
    case "boardDirectory":
      return <BoardDirectory data={block} />;
    case "resourceLibrary":
      return <ResourceLibrary data={block} />;
    case "propertyExplorer":
      return useLois ? (
        <LoisWidget
          baseUrl={listings.lois!.baseUrl!}
          organizationId={listings.lois!.organizationId!}
          background={block.style?.background}
        />
      ) : (
        <PropertyExplorer data={block} />
      );
    case "formBuilder":
      return <FormBuilder data={block} />;
    default:
      return null;
  }
};
