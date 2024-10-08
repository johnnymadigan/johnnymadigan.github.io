import Image from "next/image";
import Link from "next/link";

const Socials = () => {
  return (
    <div className="flex select-none flex-row items-center justify-center space-x-4 py-3">
      <Link href={"https://github.com/jjawny"}>
        <Image
          src={"/images/github.svg"}
          alt="view johnny madigan's github"
          height={24}
          width={24}
          className="invert filter duration-200 hover:scale-105"
        />
      </Link>
      <Link href={"https://www.linkedin.com/in/jawny"}>
        <Image
          src={"/images/linkedin.svg"}
          alt="message johnny madigan on linkedin"
          height={24}
          width={24}
          className="invert filter duration-200 hover:scale-105"
        />
      </Link>
      <Link href={"https://x.com/jjjawny"}>
        <Image
          src={"/images/twitter.svg"}
          alt="message johnny madigan on x (twitter)"
          height={18}
          width={18}
          className="duration-200 hover:scale-105"
        />
      </Link>
    </div>
  );
};

export default Socials;
