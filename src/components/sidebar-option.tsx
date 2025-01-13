import Link from "next/link";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {db} from "../../firebase";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export const SidebarOption = ({href, id}: {
    href: string,
    id: string
}) => {
    const [data] = useDocumentData(doc(db, "documents", id))
    const pathName = usePathname()
    const isActive = href.includes(pathName) && pathName !== "/"

    if (!data) {
        return null
    }

    return (
        <Link href={href} className={cn("w-full px-3 py-1 bg-transparent transition-colors rounded-md hover:bg-gray-100", isActive && "bg-gray-100")}>
            <p className={"truncate text-md flex gap-x-2 font-medium text-gray-700"}>
                {data.title}
            </p>
        </Link>
    )
}