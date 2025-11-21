import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
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

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks | any) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksIndustriesGrid":
      return <IndustriesGrid data={block} />;
    case "PageBlocksNewsFeed":
      return <NewsFeed data={block} />;
    case "PageBlocksNewsArchive":
      return <NewsArchive data={block} />;
    case "PageBlocksContactForm":
      return <ContactForm data={block} />;
    case "PageBlocksMap":
      return <Map data={block} />;
    case "PageBlocksPropertyListing":
      return <PropertyListing data={block} />;
    case "PageBlocksCommunityList":
      return <CommunityList data={block} />;
    case "PageBlocksBoardDirectory":
      return <BoardDirectory data={block} />;
    case "PageBlocksResourceLibrary":
      return <ResourceLibrary data={block} />;
    case "PageBlocksPropertyExplorer":
      return <PropertyExplorer data={block} />;
    default:
      return null;
  }
};
