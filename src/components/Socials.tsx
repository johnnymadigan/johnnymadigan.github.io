import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Socials = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isLoaded) {
    return <div className="h-[52px] sm:h-[52px]"></div>;
  }

  return (
    <div className="flex w-full select-none flex-row justify-between space-x-4 px-[10vw] py-3 invert filter sm:px-[8vw]">
      <Link href={"https://github.com/johnnymadigan"}>
        <Image
          src={"/images/github.png"}
          alt="github"
          height={28}
          width={28}
          className="duration-200 hover:scale-110"
        />
      </Link>
      <Link href={"https://www.linkedin.com/in/johnnymadigan"}>
        <Image
          src={"/images/linkedin.png"}
          alt="linkedin"
          height={28}
          width={28}
          className="duration-200 hover:scale-110"
        />
      </Link>
      <Link href={"mailto:johnny.madigan@icloud.com"}>
        <Image
          src={"/images/email.png"}
          alt="email"
          height={28}
          width={28}
          className="duration-200 hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default Socials;
