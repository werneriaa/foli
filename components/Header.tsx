import Link from "next/link";
import { FoliLogo } from "./FoliLogo";

export const Header: React.FC = () => {
  return (
    <header className="h-16 w-full flex px-4 py-2 items-center justify-center shadow">
      <div className="w-full h-full flex max-w-6xl items-center">
        <Link href="/">
          <FoliLogo />
        </Link>
      </div>
    </header>
  );
};
