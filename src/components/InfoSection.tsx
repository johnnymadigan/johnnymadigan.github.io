import { useRef, useState } from "react";
import { useIsInView } from "~/hooks/useIsInView";
import Socials from "~/components/Socials";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
} from "~/components/ui/Drawer";

interface InfoSectionProps {
  isShowAboutCallback: (isShowAbout: boolean) => void;
}

const InfoSection: React.FC<InfoSectionProps> = (props) => {
  return (
    <div className="grid h-[80vh] w-screen items-end justify-center">
      <div className="flex w-[50vw] min-w-[fit-content] flex-col items-center justify-center justify-items-center space-y-1 justify-self-center">
        <InfoSectionContent isShowAboutCallback={props.isShowAboutCallback} />
      </div>
    </div>
  );
};

// ISSUE: R3F's custom render tree stops 'useIsInView' (intersection observer hook) from triggering ∴ component never intersects
// SOLUTION: Extract content (that relies on the hook) another level deeper into the tree...
const InfoSectionContent: React.FC<InfoSectionProps> = (props) => {
  const { isShowAboutCallback } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const infoSectionContentRef = useRef<HTMLHeadingElement>(null);
  const isInView = useIsInView(infoSectionContentRef);
  const BoldText = (text: string) => <span className="font-extrabold">{text}</span>;

  return (
    <div
      ref={infoSectionContentRef}
      className={`flex w-full select-text flex-col whitespace-nowrap pb-[10vh] text-center font-monument tracking-tight text-white
        ${isInView ? "animate-fadeIn" : "animate-fadeOut"}
        ${isDrawerOpen ? "pointer-events-none !opacity-25" : ""}
      `}
    >
      <p className="self-start text-[3.5vw] sm:text-[3vw]">Hey! I&rsquo;m…</p>

      <Drawer
        onOpenChange={(isOpen) => {
          console.log("here");
          setIsDrawerOpen(isOpen);
          isShowAboutCallback(isOpen);
        }}
      >
        <DrawerTrigger
          className={`text-white transition-all duration-100 ease-in-out 
            ${isInView ? "animate-fadeIn" : "animate-fadeOut"}  
          `}
        >
          <h2 className="relative self-end px-[2vw] text-[5.5vw] font-extrabold duration-150 hover:scale-105 sm:text-[4.75vw]">
            Johnny Madigan
            <div
              className="duration-200 hover:scale-125"
              style={{ width: "5vw", height: "5vw", position: "absolute", right: 0, bottom: 0 }}
            >
              {/* TODO: revise dynamic size (see current NextJS recommendation), then apply to social icons */}
              <Image
                src={"/images/click.gif"}
                alt="Click to learn more about me!"
                fill
                sizes="5vw"
                style={{ rotate: "-30deg", objectFit: "cover", height: "" }}
              />
            </div>
          </h2>
        </DrawerTrigger>
        <DrawerContent className="bottom-[-50px] z-50 px-2 pb-[50px] text-white">
          <DrawerHeader>
            <DrawerTitle className="font-monument text-2xl">WHO AM I ?</DrawerTitle>
            <DrawerDescription className="py-5 font-geistmono">
              I&apos;m a {BoldText("Full Stack Software Developer")} currently working for Queensland Government on a
              portfolio of enterprise apps.
              <br />
              <br />
              As someone who {BoldText("thrives")} on mastering their stack, finding solutions to complex problems, and
              sharing knowledge, I believe I can bring {BoldText("value")} to any team.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <p className="text-[3vw] sm:text-[2.5vw]">Full Stack Software Developer</p>
      <p className="self-end pr-4 text-[1.75vw] sm:text-[1.75vw]">
        <Link target="_blank" href="https://skfb.ly/MWtY">
          <i className="underline">MacBook</i>
        </Link>{" "}
        by chrisgreig <span className="text-[1.25vw] sm:text-[1vw]">(CC BY)</span>
      </p>
      <Socials />
    </div>
  );
};

export default InfoSection;